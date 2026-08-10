export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          about_image_url: string | null
          church_story: string | null
          created_at: string
          id: string
          introduction: string | null
          mission: string | null
          page_title: string | null
          updated_at: string
          vision: string | null
        }
        Insert: {
          about_image_url?: string | null
          church_story?: string | null
          created_at?: string
          id?: string
          introduction?: string | null
          mission?: string | null
          page_title?: string | null
          updated_at?: string
          vision?: string | null
        }
        Update: {
          about_image_url?: string | null
          church_story?: string | null
          created_at?: string
          id?: string
          introduction?: string | null
          mission?: string | null
          page_title?: string | null
          updated_at?: string
          vision?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string | null
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          publish_date: string
          slug: string
          status: string
          summary: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          publish_date?: string
          slug: string
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          publish_date?: string
          slug?: string
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "announcements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      church_settings: {
        Row: {
          address: string | null
          church_name: string | null
          created_at: string
          email: string | null
          facebook_url: string | null
          favicon_url: string | null
          google_maps_url: string | null
          id: string
          instagram_url: string | null
          logo_url: string | null
          office_hours: string | null
          phone: string | null
          updated_at: string
          website_description: string | null
          website_title: string | null
          youtube_url: string | null
        }
        Insert: {
          address?: string | null
          church_name?: string | null
          created_at?: string
          email?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          google_maps_url?: string | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          office_hours?: string | null
          phone?: string | null
          updated_at?: string
          website_description?: string | null
          website_title?: string | null
          youtube_url?: string | null
        }
        Update: {
          address?: string | null
          church_name?: string | null
          created_at?: string
          email?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          google_maps_url?: string | null
          id?: string
          instagram_url?: string | null
          logo_url?: string | null
          office_hours?: string | null
          phone?: string | null
          updated_at?: string
          website_description?: string | null
          website_title?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      core_values: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          is_active: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string | null
          event_date: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          location: string | null
          registration_url: string | null
          slug: string
          start_time: string | null
          status: string
          summary: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: string | null
          registration_url?: string | null
          slug: string
          start_time?: string | null
          status?: string
          summary?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          location?: string | null
          registration_url?: string | null
          slug?: string
          start_time?: string | null
          status?: string
          summary?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_content: {
        Row: {
          about_button_text: string | null
          about_button_url: string | null
          about_description: string | null
          about_image_url: string | null
          about_title: string | null
          created_at: string
          cta_button_text: string | null
          cta_button_url: string | null
          cta_description: string | null
          cta_title: string | null
          eyebrow: string | null
          hero_description: string | null
          hero_image_url: string | null
          hero_title: string | null
          id: string
          primary_button_text: string | null
          primary_button_url: string | null
          secondary_button_text: string | null
          secondary_button_url: string | null
          updated_at: string
          welcome_button_text: string | null
          welcome_button_url: string | null
          welcome_description: string | null
          welcome_image_url: string | null
          welcome_title: string | null
        }
        Insert: {
          about_button_text?: string | null
          about_button_url?: string | null
          about_description?: string | null
          about_image_url?: string | null
          about_title?: string | null
          created_at?: string
          cta_button_text?: string | null
          cta_button_url?: string | null
          cta_description?: string | null
          cta_title?: string | null
          eyebrow?: string | null
          hero_description?: string | null
          hero_image_url?: string | null
          hero_title?: string | null
          id?: string
          primary_button_text?: string | null
          primary_button_url?: string | null
          secondary_button_text?: string | null
          secondary_button_url?: string | null
          updated_at?: string
          welcome_button_text?: string | null
          welcome_button_url?: string | null
          welcome_description?: string | null
          welcome_image_url?: string | null
          welcome_title?: string | null
        }
        Update: {
          about_button_text?: string | null
          about_button_url?: string | null
          about_description?: string | null
          about_image_url?: string | null
          about_title?: string | null
          created_at?: string
          cta_button_text?: string | null
          cta_button_url?: string | null
          cta_description?: string | null
          cta_title?: string | null
          eyebrow?: string | null
          hero_description?: string | null
          hero_image_url?: string | null
          hero_title?: string | null
          id?: string
          primary_button_text?: string | null
          primary_button_url?: string | null
          secondary_button_text?: string | null
          secondary_button_url?: string | null
          updated_at?: string
          welcome_button_text?: string | null
          welcome_button_url?: string | null
          welcome_description?: string | null
          welcome_image_url?: string | null
          welcome_title?: string | null
        }
        Relationships: []
      }
      leaders: {
        Row: {
          biography: string | null
          created_at: string
          created_by: string | null
          display_order: number
          id: string
          name: string
          photo_url: string | null
          position: string | null
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          biography?: string | null
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          name: string
          photo_url?: string | null
          position?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          biography?: string | null
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          name?: string
          photo_url?: string | null
          position?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leaders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaders_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          folder: string
          id: string
          mime_type: string | null
          public_url: string
          storage_path: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          folder?: string
          id?: string
          mime_type?: string | null
          public_url: string
          storage_path: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          folder?: string
          id?: string
          mime_type?: string | null
          public_url?: string
          storage_path?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ministries: {
        Row: {
          audience: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          created_by: string | null
          description: string | null
          display_order: number
          id: string
          image_url: string | null
          leader_name: string | null
          mission: string | null
          name: string
          schedule: string | null
          short_description: string | null
          slug: string
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          audience?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          leader_name?: string | null
          mission?: string | null
          name: string
          schedule?: string | null
          short_description?: string | null
          slug: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          audience?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          display_order?: number
          id?: string
          image_url?: string | null
          leader_name?: string | null
          mission?: string | null
          name?: string
          schedule?: string | null
          short_description?: string | null
          slug?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ministries_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ministries_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      sermons: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          duration: string | null
          id: string
          is_featured: boolean
          scripture_reference: string | null
          series: string | null
          sermon_date: string | null
          slug: string
          speaker: string | null
          status: string
          summary: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          updated_by: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_featured?: boolean
          scripture_reference?: string | null
          series?: string | null
          sermon_date?: string | null
          slug: string
          speaker?: string | null
          status?: string
          summary?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          is_featured?: boolean
          scripture_reference?: string | null
          series?: string | null
          sermon_date?: string | null
          slug?: string
          speaker?: string | null
          status?: string
          summary?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sermons_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sermons_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_times: {
        Row: {
          created_at: string
          day_of_week: string | null
          description: string | null
          display_order: number
          end_time: string | null
          id: string
          is_active: boolean
          name: string
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week?: string | null
          description?: string | null
          display_order?: number
          end_time?: string | null
          id?: string
          is_active?: boolean
          name: string
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: string | null
          description?: string | null
          display_order?: number
          end_time?: string | null
          id?: string
          is_active?: boolean
          name?: string
          start_time?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string
          created_by: string | null
          display_order: number
          id: string
          name: string
          photo_url: string | null
          quote: string | null
          role: string | null
          status: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          name: string
          photo_url?: string | null
          quote?: string | null
          role?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          display_order?: number
          id?: string
          name?: string
          photo_url?: string | null
          quote?: string | null
          role?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonials_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
