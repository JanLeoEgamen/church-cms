-- ============ ENUM + HELPERS ============
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid());
$$;

CREATE POLICY "profiles readable by staff" ON public.profiles
  FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_staff());
CREATE POLICY "profiles insert own" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles update own" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "roles readable by self or admin" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)), NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ SINGLETON CONTENT ============
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  eyebrow TEXT, hero_title TEXT, hero_description TEXT, hero_image_url TEXT,
  primary_button_text TEXT, primary_button_url TEXT,
  secondary_button_text TEXT, secondary_button_url TEXT,
  welcome_title TEXT, welcome_description TEXT, welcome_image_url TEXT,
  welcome_button_text TEXT, welcome_button_url TEXT,
  about_title TEXT, about_description TEXT, about_image_url TEXT,
  about_button_text TEXT, about_button_url TEXT,
  cta_title TEXT, cta_description TEXT, cta_button_text TEXT, cta_button_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_title TEXT, introduction TEXT, church_story TEXT, mission TEXT, vision TEXT,
  about_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.church_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  church_name TEXT, logo_url TEXT, favicon_url TEXT,
  address TEXT, phone TEXT, email TEXT, office_hours TEXT, google_maps_url TEXT,
  facebook_url TEXT, instagram_url TEXT, youtube_url TEXT,
  website_title TEXT, website_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============ ORDERED LISTS ============
CREATE TABLE public.service_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, day_of_week TEXT, start_time TIME, end_time TIME,
  description TEXT, display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.core_values (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, description TEXT, icon TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============ CONTENT ============
CREATE TABLE public.ministries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  short_description TEXT, description TEXT, image_url TEXT,
  mission TEXT, schedule TEXT, audience TEXT, leader_name TEXT,
  contact_email TEXT, contact_phone TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  summary TEXT, description TEXT, image_url TEXT,
  event_date DATE, start_time TIME, end_time TIME,
  location TEXT, contact_name TEXT, contact_email TEXT, contact_phone TEXT,
  registration_url TEXT,
  category TEXT NOT NULL DEFAULT 'other' CHECK (category IN ('worship','youth','community','outreach','other')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.sermons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  speaker TEXT, sermon_date DATE, scripture_reference TEXT, series TEXT, duration TEXT,
  summary TEXT, description TEXT, thumbnail_url TEXT, video_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
  summary TEXT, content TEXT, image_url TEXT,
  publish_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, role TEXT, photo_url TEXT, quote TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.leaders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, position TEXT, photo_url TEXT, biography TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL, storage_path TEXT NOT NULL, public_url TEXT NOT NULL,
  mime_type TEXT, file_size BIGINT, folder TEXT NOT NULL DEFAULT 'homepage',
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_status_date ON public.events (status, event_date DESC);
CREATE INDEX idx_sermons_status_date ON public.sermons (status, sermon_date DESC);
CREATE INDEX idx_announcements_status_date ON public.announcements (status, publish_date DESC);
CREATE INDEX idx_ministries_status ON public.ministries (status, display_order);
CREATE INDEX idx_leaders_status ON public.leaders (status, display_order);
CREATE INDEX idx_testimonials_status ON public.testimonials (status, display_order);
CREATE INDEX idx_media_folder ON public.media (folder, created_at DESC);

CREATE TRIGGER t1 BEFORE UPDATE ON public.homepage_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t2 BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t3 BEFORE UPDATE ON public.church_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t4 BEFORE UPDATE ON public.service_times FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t5 BEFORE UPDATE ON public.core_values FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t6 BEFORE UPDATE ON public.ministries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t7 BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t8 BEFORE UPDATE ON public.sermons FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t9 BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t10 BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER t11 BEFORE UPDATE ON public.leaders FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ GRANTS + RLS ============
GRANT SELECT ON public.homepage_content, public.about_content, public.church_settings,
  public.service_times, public.core_values, public.ministries, public.events,
  public.sermons, public.announcements, public.testimonials, public.leaders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.homepage_content, public.about_content,
  public.church_settings, public.service_times, public.core_values, public.ministries,
  public.events, public.sermons, public.announcements, public.testimonials,
  public.leaders, public.media TO authenticated;
GRANT ALL ON public.homepage_content, public.about_content, public.church_settings,
  public.service_times, public.core_values, public.ministries, public.events,
  public.sermons, public.announcements, public.testimonials, public.leaders,
  public.media TO service_role;

ALTER TABLE public.homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.church_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.core_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read homepage" ON public.homepage_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read about" ON public.about_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read settings" ON public.church_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "public read service times" ON public.service_times FOR SELECT TO anon USING (is_active);
CREATE POLICY "public read core values" ON public.core_values FOR SELECT TO anon USING (is_active);
CREATE POLICY "public read ministries" ON public.ministries FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "public read events" ON public.events FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "public read sermons" ON public.sermons FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "public read announcements" ON public.announcements FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT TO anon USING (status = 'published');
CREATE POLICY "public read leaders" ON public.leaders FOR SELECT TO anon USING (status = 'published');

CREATE POLICY "staff read service times" ON public.service_times FOR SELECT TO authenticated USING (is_active OR public.is_staff());
CREATE POLICY "staff read core values" ON public.core_values FOR SELECT TO authenticated USING (is_active OR public.is_staff());
CREATE POLICY "staff read ministries" ON public.ministries FOR SELECT TO authenticated USING (status = 'published' OR public.is_staff());
CREATE POLICY "staff read events" ON public.events FOR SELECT TO authenticated USING (status = 'published' OR public.is_staff());
CREATE POLICY "staff read sermons" ON public.sermons FOR SELECT TO authenticated USING (status = 'published' OR public.is_staff());
CREATE POLICY "staff read announcements" ON public.announcements FOR SELECT TO authenticated USING (status = 'published' OR public.is_staff());
CREATE POLICY "staff read testimonials" ON public.testimonials FOR SELECT TO authenticated USING (status = 'published' OR public.is_staff());
CREATE POLICY "staff read leaders" ON public.leaders FOR SELECT TO authenticated USING (status = 'published' OR public.is_staff());
CREATE POLICY "staff read media" ON public.media FOR SELECT TO authenticated USING (public.is_staff());

CREATE POLICY "staff write homepage" ON public.homepage_content FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write about" ON public.about_content FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write service times" ON public.service_times FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write core values" ON public.core_values FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write ministries" ON public.ministries FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write events" ON public.events FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write sermons" ON public.sermons FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write announcements" ON public.announcements FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write leaders" ON public.leaders FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "staff write media" ON public.media FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "admin write settings" ON public.church_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "staff read church media" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'church-media' AND public.is_staff());
CREATE POLICY "staff upload church media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'church-media' AND public.is_staff());
CREATE POLICY "staff update church media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'church-media' AND public.is_staff());
CREATE POLICY "staff delete church media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'church-media' AND public.is_staff());