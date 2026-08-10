import heroWorship from "@/assets/hero-worship.jpg";
import welcomeCommunity from "@/assets/welcome-community.jpg";
import ministryKids from "@/assets/ministry-kids.jpg";
import ministryYouth from "@/assets/ministry-youth.jpg";
import ministryWomen from "@/assets/ministry-women.jpg";
import ministryOutreach from "@/assets/ministry-outreach.jpg";
import ministryWorship from "@/assets/ministry-worship.jpg";
import ministryPrayer from "@/assets/ministry-prayer.jpg";
import sermonBackdrop from "@/assets/sermon-backdrop.jpg";
import leaderJohn from "@/assets/leader-john.jpg";
import leaderSarah from "@/assets/leader-sarah.jpg";
import leaderMichael from "@/assets/leader-michael.jpg";

export const images = {
  heroWorship,
  welcomeCommunity,
  ministryKids,
  ministryYouth,
  ministryWomen,
  ministryOutreach,
  ministryWorship,
  ministryPrayer,
  sermonBackdrop,
  leaderJohn,
  leaderSarah,
  leaderMichael,
};

export const church = {
  name: "First Chirstian Church - Bagumbayan",
  shortName: "Grace Community",
  tagline: "A Christ-centered community in Springfield.",
  address: "123 Main Street, Springfield, CA 90000",
  addressLines: ["123 Main Street", "Springfield, CA 90000"],
  phone: "(555) 123-4567",
  email: "hello@gracecommunity.org",
  officeHours: "Monday–Friday · 9:00 AM–5:00 PM",
  social: {
    facebook: "https://facebook.com/gracecommunity",
    instagram: "https://instagram.com/gracecommunity",
    youtube: "https://youtube.com/@gracecommunity",
  },
};

export const serviceTimes = [
  {
    id: "first-service",
    name: "Sunday Worship",
    time: "9:00 AM",
    detail: "Main Sanctuary · Kids Ministry available",
  },
  {
    id: "second-service",
    name: "Sunday Worship",
    time: "10:30 AM",
    detail: "Main Sanctuary · Coffee from 10:00 AM",
  },
  {
    id: "midweek",
    name: "Midweek Prayer",
    time: "Wednesday · 7:00 PM",
    detail: "Fellowship Hall · All are welcome",
  },
];

export const values = [
  {
    id: "faith",
    title: "Faith",
    description: "Growing deeper in our relationship with God through scripture, prayer, and worship.",
  },
  {
    id: "community",
    title: "Community",
    description: "Building meaningful relationships and walking through life together.",
  },
  {
    id: "service",
    title: "Service",
    description: "Serving our neighbors and our city with compassion and purpose.",
  },
  {
    id: "hope",
    title: "Hope",
    description: "Sharing the hope of Christ with everyone who walks through our doors.",
  },
];

export type Ministry = {
  id: string;
  name: string;
  short: string;
  description: string;
  mission: string;
  schedule: string;
  audience: string;
  leader: string;
  email: string;
  image: string;
  status: "Published" | "Draft";
  updated: string;
};

export const ministries: Ministry[] = [
  {
    id: "kids-ministry",
    name: "Kids Ministry",
    short: "Safe, joyful spaces where children ages 3–11 discover the love of Jesus.",
    description:
      "Grace Kids is a bright, secure environment where children learn Bible stories through play, music, crafts, and small-group conversation. Every volunteer is background-checked and trained, and our check-in system keeps families connected during the service.",
    mission: "To help children build a lasting, joyful foundation of faith that they carry into every season of life.",
    schedule: "Sundays · 9:00 AM & 10:30 AM · Kids Wing",
    audience: "Children ages 3–11 and their families",
    leader: "Emily Carter",
    email: "kids@gracecommunity.org",
    image: ministryKids,
    status: "Published",
    updated: "Aug 6, 2026",
  },
  {
    id: "youth-ministry",
    name: "Youth Ministry",
    short: "A place for students in grades 6–12 to belong, ask honest questions, and grow.",
    description:
      "Friday nights in the Youth Hall are loud, fun, and honest. Students share a meal, play games, hear a short message, and break into small groups led by adults who genuinely care about their week.",
    mission: "To walk with students through the middle and high school years with truth, laughter, and consistent presence.",
    schedule: "Fridays · 6:00 PM–8:30 PM · Youth Hall",
    audience: "Students in grades 6 through 12",
    leader: "Daniel Reyes",
    email: "youth@gracecommunity.org",
    image: ministryYouth,
    status: "Published",
    updated: "Aug 4, 2026",
  },
  {
    id: "young-adults",
    name: "Young Adults",
    short: "Community for students and professionals in their twenties and thirties.",
    description:
      "Whether you just moved to Springfield or grew up here, our young adults gather midweek for study, conversation, and a lot of shared meals. Expect real friendship rather than a program.",
    mission: "To help young adults build faith and friendship during the most transitional decade of life.",
    schedule: "Tuesdays · 7:00 PM · The Loft",
    audience: "Ages 18–35, single or married",
    leader: "Priya Nair",
    email: "youngadults@gracecommunity.org",
    image: ministryPrayer,
    status: "Published",
    updated: "Jul 30, 2026",
  },
  {
    id: "womens-ministry",
    name: "Women's Ministry",
    short: "Bible study, mentorship, and friendship for women in every season.",
    description:
      "Our women gather for study and conversation on Thursday mornings, with childcare provided. Twice a year we host retreats and service projects that connect newcomers with long-time members.",
    mission: "To encourage women to know God deeply and to care well for one another.",
    schedule: "Thursdays · 9:30 AM · Fellowship Hall",
    audience: "Women of all ages, childcare provided",
    leader: "Sarah Williams",
    email: "women@gracecommunity.org",
    image: ministryWomen,
    status: "Published",
    updated: "Jul 28, 2026",
  },
  {
    id: "mens-ministry",
    name: "Men's Ministry",
    short: "Early-morning study, honest accountability, and practical service.",
    description:
      "Men meet Saturday mornings over coffee for a short study and unvarnished conversation. Through the year the group takes on repair projects for widows and single parents in the neighborhood.",
    mission: "To build men of integrity who lead well at home, at work, and in the church.",
    schedule: "Saturdays · 7:00 AM · Fellowship Hall",
    audience: "Men of all ages",
    leader: "Michael Johnson",
    email: "men@gracecommunity.org",
    image: ministryOutreach,
    status: "Published",
    updated: "Jul 22, 2026",
  },
  {
    id: "worship-ministry",
    name: "Worship Ministry",
    short: "Musicians, vocalists, and production volunteers who serve Sunday gatherings.",
    description:
      "Our worship team leads two Sunday services with a blend of hymns and modern songs. Auditions are informal, and the production team trains new volunteers on sound, lighting, and livestream.",
    mission: "To lead the congregation into worship that is honest, singable, and centered on Christ.",
    schedule: "Rehearsal Thursdays · 7:00 PM · Sanctuary",
    audience: "Musicians, vocalists, and tech volunteers age 15+",
    leader: "Sarah Williams",
    email: "worship@gracecommunity.org",
    image: ministryWorship,
    status: "Published",
    updated: "Aug 2, 2026",
  },
  {
    id: "prayer-ministry",
    name: "Prayer Ministry",
    short: "A dedicated team that prays for our church family week by week.",
    description:
      "Requests submitted through the website and Sunday cards are prayed over by our team every Wednesday evening. Team members also stay after services to pray with anyone who asks.",
    mission: "To surround our church and city with faithful, ongoing prayer.",
    schedule: "Wednesdays · 7:00 PM · Prayer Chapel",
    audience: "Anyone who wants to pray with others",
    leader: "Grace Okafor",
    email: "prayer@gracecommunity.org",
    image: ministryPrayer,
    status: "Published",
    updated: "Jul 18, 2026",
  },
  {
    id: "community-outreach",
    name: "Community Outreach",
    short: "Food pantry, tutoring, and neighborhood partnerships across Springfield.",
    description:
      "Every month our volunteers pack and distribute groceries, tutor students at Lincoln Elementary, and partner with the Springfield shelter. No experience needed — just a willingness to show up.",
    mission: "To love our neighbors in practical, consistent ways that build long-term trust.",
    schedule: "Last Saturday monthly · 8:00 AM · Community Center",
    audience: "Volunteers of all ages, families welcome",
    leader: "Michael Johnson",
    email: "outreach@gracecommunity.org",
    image: ministryOutreach,
    status: "Draft",
    updated: "Aug 8, 2026",
  },
];

export type ChurchEvent = {
  id: string;
  title: string;
  category: "Worship" | "Youth" | "Community" | "Outreach" | "Other";
  date: string;
  dateLabel: string;
  time: string;
  endTime: string;
  location: string;
  summary: string;
  description: string;
  contact: string;
  email: string;
  image: string;
  status: "Published" | "Draft";
  featured?: boolean;
};

export const events: ChurchEvent[] = [
  {
    id: "sunday-worship-service",
    title: "Sunday Worship Service",
    category: "Worship",
    date: "2026-08-16",
    dateLabel: "August 16, 2026",
    time: "9:00 AM",
    endTime: "10:15 AM",
    location: "Main Sanctuary",
    summary: "Gather with the whole church family for singing, scripture, and teaching from the book of Hebrews.",
    description:
      "Our Sunday gathering opens with worship led by the Grace band, followed by a message from Pastor John Smith continuing our summer series in Hebrews. Kids Ministry runs during the full service, and coffee is served in the lobby beforehand. Come as you are — there is no dress code and no pressure.",
    contact: "Church Office",
    email: "hello@gracecommunity.org",
    image: heroWorship,
    status: "Published",
    featured: true,
  },
  {
    id: "youth-fellowship-night",
    title: "Youth Fellowship Night",
    category: "Youth",
    date: "2026-08-21",
    dateLabel: "August 21, 2026",
    time: "6:00 PM",
    endTime: "8:30 PM",
    location: "Youth Hall",
    summary: "Pizza, games, worship, and small groups for students in grades 6 through 12.",
    description:
      "Students are invited for a night of pizza, outdoor games, and a short talk on finding identity beyond social media. Small groups follow, led by our trained volunteer leaders. Friends are always welcome — bring one.",
    contact: "Daniel Reyes",
    email: "youth@gracecommunity.org",
    image: ministryYouth,
    status: "Published",
  },
  {
    id: "community-outreach-day",
    title: "Community Outreach",
    category: "Outreach",
    date: "2026-08-29",
    dateLabel: "August 29, 2026",
    time: "8:00 AM",
    endTime: "12:00 PM",
    location: "Community Center",
    summary: "Pack and deliver grocery boxes to families across the Springfield neighborhood.",
    description:
      "Join us for our monthly outreach morning. We start with coffee and a short briefing, then pack grocery boxes and deliver them to families in the Springfield neighborhood. Families with children are welcome, and every task has a role for all ages.",
    contact: "Michael Johnson",
    email: "outreach@gracecommunity.org",
    image: ministryOutreach,
    status: "Published",
  },
  {
    id: "womens-summer-brunch",
    title: "Women's Summer Brunch",
    category: "Community",
    date: "2026-09-05",
    dateLabel: "September 5, 2026",
    time: "10:00 AM",
    endTime: "12:30 PM",
    location: "Fellowship Hall",
    summary: "A relaxed morning of brunch, testimony, and connection before the fall study begins.",
    description:
      "Our women gather to launch the fall study season with brunch, live music, and a short testimony from a member of our congregation. Tables are hosted so newcomers always have somewhere to sit.",
    contact: "Sarah Williams",
    email: "women@gracecommunity.org",
    image: ministryWomen,
    status: "Published",
  },
  {
    id: "fall-baptism-sunday",
    title: "Fall Baptism Sunday",
    category: "Worship",
    date: "2026-09-13",
    dateLabel: "September 13, 2026",
    time: "10:30 AM",
    endTime: "12:00 PM",
    location: "Main Sanctuary",
    summary: "Celebrate with those taking the next step of faith through baptism.",
    description:
      "Baptism Sunday is one of the most joyful days on our calendar. If you are considering baptism, our pastors host a short class the week before to answer questions and walk you through what to expect.",
    contact: "Church Office",
    email: "hello@gracecommunity.org",
    image: sermonBackdrop,
    status: "Draft",
  },
  {
    id: "worship-night",
    title: "Night of Worship & Prayer",
    category: "Other",
    date: "2026-09-19",
    dateLabel: "September 19, 2026",
    time: "7:00 PM",
    endTime: "8:30 PM",
    location: "Main Sanctuary",
    summary: "An unhurried evening of singing, scripture reading, and open prayer.",
    description:
      "No sermon, no program — just an hour and a half of songs, quiet, and prayer led by our worship and prayer teams. Childcare is available for children under 10 with advance registration.",
    contact: "Sarah Williams",
    email: "worship@gracecommunity.org",
    image: ministryWorship,
    status: "Published",
  },
];

export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  dateLabel: string;
  scripture: string;
  series: string;
  duration: string;
  summary: string;
  description: string;
  image: string;
  status: "Published" | "Draft";
  featured?: boolean;
};

export const sermons: Sermon[] = [
  {
    id: "walking-by-faith",
    title: "Walking by Faith",
    speaker: "Pastor John Smith",
    date: "2026-08-09",
    dateLabel: "August 9, 2026",
    scripture: "Hebrews 11:1",
    series: "Summer in Hebrews",
    duration: "38 min",
    summary: "What it looks like to trust God when the next step is unclear.",
    description:
      "Faith is not the absence of questions — it is confidence in the character of God while the questions remain. In this message, Pastor John walks through the opening of Hebrews 11 and looks at what the people listed there had in common: they moved before they could see the whole road.",
    image: sermonBackdrop,
    status: "Published",
    featured: true,
  },
  {
    id: "grace-that-changes-everything",
    title: "Grace That Changes Everything",
    speaker: "Pastor Sarah Williams",
    date: "2026-08-02",
    dateLabel: "August 2, 2026",
    scripture: "Ephesians 2:8–9",
    series: "Summer in Hebrews",
    duration: "34 min",
    summary: "Grace is not a reward for the tidy life — it is the beginning of a new one.",
    description:
      "Pastor Sarah unpacks the two verses that reshaped the early church, and asks a practical question: if grace really is a gift, how does that change the way we treat ourselves and the people around us on a Tuesday afternoon?",
    image: ministryWorship,
    status: "Published",
  },
  {
    id: "finding-peace-in-the-storm",
    title: "Finding Peace in the Storm",
    speaker: "Pastor John Smith",
    date: "2026-07-26",
    dateLabel: "July 26, 2026",
    scripture: "Mark 4:35–41",
    series: "Encounters with Jesus",
    duration: "41 min",
    summary: "A message for anyone in a season where the water keeps rising.",
    description:
      "The disciples were experienced sailors, and they were still terrified. Pastor John looks at the storm on the Sea of Galilee and what Jesus' question — 'Why are you so afraid?' — offers those of us weathering something hard right now.",
    image: heroWorship,
    status: "Published",
  },
  {
    id: "the-generous-life",
    title: "The Generous Life",
    speaker: "Pastor Sarah Williams",
    date: "2026-07-19",
    dateLabel: "July 19, 2026",
    scripture: "2 Corinthians 9:6–8",
    series: "Encounters with Jesus",
    duration: "31 min",
    summary: "Generosity as a rhythm rather than an occasional gesture.",
    description:
      "A look at what Paul taught the Corinthian church about giving, and why generosity is less about the size of the gift than the posture of the heart behind it.",
    image: ministryOutreach,
    status: "Published",
  },
  {
    id: "rooted-in-community",
    title: "Rooted in Community",
    speaker: "Michael Johnson",
    date: "2026-07-12",
    dateLabel: "July 12, 2026",
    scripture: "Acts 2:42–47",
    series: "Encounters with Jesus",
    duration: "29 min",
    summary: "Why the early church shared meals before it shared doctrine.",
    description:
      "Michael Johnson looks at the practices of the first church in Jerusalem and how their ordinary habits — eating together, meeting in homes, giving as needs arose — built something that outlasted them.",
    image: welcomeCommunity,
    status: "Draft",
  },
];

export type Announcement = {
  id: string;
  title: string;
  dateLabel: string;
  summary: string;
  body: string;
  image: string;
  status: "Published" | "Draft";
};

export const announcements: Announcement[] = [
  {
    id: "sunday-service-update",
    title: "Sunday Service Update",
    dateLabel: "August 7, 2026",
    summary: "Beginning September 6, our second Sunday service moves to 10:30 AM to make room for expanded Kids Ministry.",
    body: "Beginning September 6, our second Sunday service will begin at 10:30 AM instead of 11:00 AM. The change gives our Kids Ministry room to add a second preschool classroom and gives families more time in the lobby between services. The 9:00 AM service time is unchanged. If you serve on a Sunday team, your team lead will follow up with an updated schedule this month.",
    image: heroWorship,
    status: "Published",
  },
  {
    id: "youth-ministry-registration",
    title: "Youth Ministry Registration Is Open",
    dateLabel: "August 5, 2026",
    summary: "Registration for the fall youth semester, including the October retreat, is now open for grades 6–12.",
    body: "Fall registration for Youth Ministry is now open for students entering grades 6 through 12. Registration covers the weekly Friday gathering, small groups, and the October retreat at Pine Ridge. Scholarships are available — talk to Daniel Reyes or email youth@gracecommunity.org and we will quietly take care of it.",
    image: ministryYouth,
    status: "Published",
  },
  {
    id: "community-outreach-program",
    title: "Community Outreach Program Expands",
    dateLabel: "July 30, 2026",
    summary: "Our monthly food distribution is growing to serve 120 families, and we need 20 more volunteers.",
    body: "Thanks to a partnership with the Springfield Food Bank, our monthly distribution is expanding from 80 to 120 family boxes. To make that work we need about twenty additional volunteers on the last Saturday of each month, from 8:00 AM to noon. Tasks range from packing and lifting to greeting families and driving deliveries.",
    image: ministryOutreach,
    status: "Published",
  },
  {
    id: "new-bible-study-group",
    title: "New Wednesday Bible Study Group",
    dateLabel: "July 24, 2026",
    summary: "A new evening study through the Gospel of Luke begins September 2 in the Fellowship Hall.",
    body: "A new midweek study through the Gospel of Luke begins Wednesday, September 2 at 7:00 PM in the Fellowship Hall, led by Pastor John Smith. The study runs for twelve weeks and no prior background is assumed — bring a Bible or borrow one at the door. Childcare is available with registration.",
    image: ministryPrayer,
    status: "Draft",
  },
];

export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  status: "Published" | "Draft";
};

export const leadership: Leader[] = [
  {
    id: "john-smith",
    name: "Pastor John Smith",
    role: "Senior Pastor",
    bio: "John has served Grace Community for eighteen years. He preaches most Sundays, teaches the Wednesday study, and can usually be found in the lobby long after everyone else has gone home. He and his wife Anne have three grown children.",
    image: leaderJohn,
    order: 1,
    status: "Published",
  },
  {
    id: "sarah-williams",
    name: "Sarah Williams",
    role: "Worship & Creative Director",
    bio: "Sarah leads our worship and creative teams and occasionally teaches on Sundays. A classically trained pianist, she is passionate about congregational singing that everyone can actually join in on.",
    image: leaderSarah,
    order: 2,
    status: "Published",
  },
  {
    id: "michael-johnson",
    name: "Michael Johnson",
    role: "Community Outreach Director",
    bio: "Michael oversees our outreach partnerships across Springfield, from the food pantry to the tutoring program at Lincoln Elementary. He has lived in the neighborhood his entire life and knows nearly everyone in it.",
    image: leaderMichael,
    order: 3,
    status: "Published",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  status: "Published" | "Draft";
};

export const testimonials: Testimonial[] = [
  {
    id: "the-alvarez-family",
    name: "Maria Alvarez",
    role: "Member since 2019",
    quote:
      "First Chirstian Church - Bagumbayan has become a place where our family feels welcomed, supported, and encouraged. Our kids ask on Saturday night whether tomorrow is a church day.",
    image: leaderSarah,
    status: "Published",
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "Young Adults group",
    quote:
      "I moved to Springfield without knowing a single person. Six months later I was sharing meals every week with people who now feel like family.",
    image: leaderMichael,
    status: "Published",
  },
  {
    id: "ruth-bennett",
    name: "Ruth Bennett",
    role: "Volunteer, Community Outreach",
    quote:
      "After my husband passed, this church showed up with meals and quiet company for months. I've never felt cared for like that anywhere else.",
    image: leaderJohn,
    status: "Published",
  },
];

export const storyParagraphs = [
  "First Chirstian Church - Bagumbayan began in 1978 with twelve families meeting in a rented school gymnasium on Third Street. There was no building, no staff, and no budget — only a conviction that Springfield needed a church where honest questions were welcome.",
  "Over the next two decades the congregation grew, built its first sanctuary on Main Street, and started the food pantry that still runs today. Through changes in leadership and neighborhood, the commitments stayed the same: teach the scriptures plainly, care for people personally, and serve the city faithfully.",
  "Today more than nine hundred people call Grace Community home across two Sunday services. We remain a church of families and students, longtime members and first-time visitors, all learning together what it means to follow Jesus in ordinary life.",
];

export const mediaFiles = [
  { id: "m1", name: "hero-sunday-worship.jpg", date: "Aug 8, 2026", type: "JPG", size: "1.8 MB", src: heroWorship },
  { id: "m2", name: "lobby-welcome.jpg", date: "Aug 7, 2026", type: "JPG", size: "1.2 MB", src: welcomeCommunity },
  { id: "m3", name: "kids-ministry-craft.jpg", date: "Aug 6, 2026", type: "JPG", size: "980 KB", src: ministryKids },
  { id: "m4", name: "youth-night-2026.jpg", date: "Aug 4, 2026", type: "JPG", size: "1.1 MB", src: ministryYouth },
  { id: "m5", name: "womens-brunch.jpg", date: "Aug 2, 2026", type: "JPG", size: "1.4 MB", src: ministryWomen },
  { id: "m6", name: "outreach-food-boxes.jpg", date: "Jul 30, 2026", type: "JPG", size: "1.6 MB", src: ministryOutreach },
  { id: "m7", name: "worship-band-stage.jpg", date: "Jul 28, 2026", type: "JPG", size: "1.3 MB", src: ministryWorship },
  { id: "m8", name: "prayer-small-group.jpg", date: "Jul 26, 2026", type: "JPG", size: "1.1 MB", src: ministryPrayer },
  { id: "m9", name: "pastor-john-portrait.jpg", date: "Jul 20, 2026", type: "JPG", size: "640 KB", src: leaderJohn },
  { id: "m10", name: "sarah-williams-portrait.jpg", date: "Jul 20, 2026", type: "JPG", size: "620 KB", src: leaderSarah },
  { id: "m11", name: "michael-johnson-portrait.jpg", date: "Jul 20, 2026", type: "JPG", size: "610 KB", src: leaderMichael },
  { id: "m12", name: "sermon-hebrews-thumb.jpg", date: "Jul 18, 2026", type: "JPG", size: "890 KB", src: sermonBackdrop },
];

export const recentActivity = [
  { id: "a1", action: "Updated homepage hero", user: "Admin", time: "5 minutes ago" },
  { id: "a2", action: "Added new sermon — Walking by Faith", user: "Sarah Williams", time: "1 hour ago" },
  { id: "a3", action: "Published Youth Fellowship Night", user: "Daniel Reyes", time: "Yesterday" },
  { id: "a4", action: "Updated church contact information", user: "Admin", time: "2 days ago" },
  { id: "a5", action: "Added new ministry — Community Outreach", user: "Michael Johnson", time: "3 days ago" },
];
