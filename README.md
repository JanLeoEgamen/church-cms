# Graceful CMS

# Build the UI First — Church Website + CMS Prototype

Build the **complete UI/UX prototype first** for a modern church website and its private Content Management System.

### Important

For this first phase:

* **UI/UX ONLY**
* Use **dummy/static data**
* No backend
* No database
* No authentication implementation
* No real CMS functionality
* No API integrations
* No payment system
* No email system
* No deployment configuration

The goal is to create and polish the **entire frontend experience first**.

Use dummy data everywhere so every screen looks complete and realistic.

---

# TECHNOLOGY

Use:

* React
* Tailwind CSS
* React Router
* Lucide React icons
* Reusable React components
* Responsive design

Keep the code organized and component-based so the backend/CMS functionality can be added later.

---

# PROJECT CONCEPT

Create a website for a church called:

**Grace Community Church**

The project has two separate UI experiences:

## 1. Public Church Website

This is what normal visitors see.

## 2. Private Church CMS

This is an administration interface for church staff to manage the content of the public website.

For now, BOTH are only UI prototypes using dummy data.

---

# IMPORTANT: PUBLIC WEBSITE AND CMS ARE SEPARATE

The public website should look like a normal professional church website.

The CMS should look like a separate modern administration dashboard.

Do NOT show any CMS or admin link in the public website.

Do NOT show "Admin Login" in the public navigation.

Do NOT show "CMS" in the public footer.

The private CMS will eventually have its own route, but for this UI phase simply create the screens.

---

# DESIGN STYLE

Create a modern, premium church website.

The visual style should feel:

* Warm
* Welcoming
* Peaceful
* Faith-centered
* Professional
* Modern
* Community-oriented
* Trustworthy

Avoid making it look like:

* A generic corporate website
* A SaaS landing page
* A dashboard
* A template with excessive gradients

Use:

* Large photography
* Strong typography
* Plenty of whitespace
* Elegant sections
* Subtle animations
* Soft shadows
* Rounded cards
* Clean layouts
* Strong visual hierarchy

Use a sophisticated church-inspired color palette with:

* Warm neutrals
* Off-white
* Deep navy/charcoal
* Warm accent color
* Subtle green or gold accents where appropriate

Do not overuse colors.

---

# PART 1 — PUBLIC CHURCH WEBSITE

Create the following public pages.

Routes:

```text
/
 /about
 /ministries
 /ministries/:id
 /events
 /events/:id
 /sermons
 /sermons/:id
 /announcements
 /contact
```

---

# PUBLIC NAVIGATION

Create a responsive navbar.

Logo:

**Grace Community Church**

Navigation:

* Home
* About
* Ministries
* Events
* Sermons
* Announcements
* Contact

Primary CTA:

**Plan Your Visit**

On mobile:

* Hamburger menu
* Slide-out navigation
* Clean mobile menu

Do NOT include an Admin/CMS login link.

---

# HOME PAGE

Create a complete, polished church homepage.

The homepage should contain the following sections.

---

## 1. Hero Section

Large, beautiful church/community photography.

Content:

Small label:

**WELCOME TO GRACE COMMUNITY CHURCH**

Headline:

**A Place to Belong. A Faith to Live. A Community to Share.**

Description:

**We are a Christ-centered community committed to growing in faith, serving others, and sharing God's love with our community.**

Buttons:

**Plan Your Visit**

**Learn More**

Make this the strongest visual section on the website.

---

## 2. Welcome Section

Title:

**You Are Welcome Here**

Text:

**Whether you are exploring faith, returning to church, or looking for a community to call home, there is a place for you here.**

Include a large image and:

**Discover Our Church**

button.

---

## 3. Service Times

Create a visually attractive section.

Title:

**Join Us This Sunday**

Dummy data:

### Sunday Worship

9:00 AM

### Sunday Worship

10:30 AM

### Midweek Prayer

Wednesday · 7:00 PM

Include:

**Plan Your Visit**

button.

---

## 4. About Section

Title:

**Growing Together. Serving Together.**

Short church introduction.

Include:

* Image
* Text
* Learn More button

---

## 5. Mission / Values

Create 3–4 cards.

### Faith

Growing deeper in our relationship with God.

### Community

Building meaningful relationships and walking through life together.

### Service

Serving our community with compassion and purpose.

### Hope

Sharing the hope of Christ with everyone.

---

## 6. Upcoming Events

Title:

**What's Happening**

Create event cards.

Dummy events:

### Sunday Worship Service

August 16, 2026

9:00 AM

Main Sanctuary

### Youth Fellowship Night

August 21, 2026

6:00 PM

Youth Hall

### Community Outreach

August 29, 2026

8:00 AM

Community Center

Each card includes:

* Image
* Date
* Title
* Time
* Location
* Short description
* View Event button

Add:

**View All Events**

---

## 7. Latest Sermons

Title:

**Latest Sermons**

Create sermon cards.

Dummy data:

### Walking by Faith

Pastor John Smith

August 9, 2026

Hebrews 11:1

### Grace That Changes Everything

Pastor Sarah Williams

August 2, 2026

Ephesians 2:8–9

### Finding Peace in the Storm

Pastor John Smith

July 26, 2026

Mark 4:35–41

Each card should have:

* Thumbnail
* Play button
* Title
* Speaker
* Date
* Scripture

Button:

**Watch Sermon**

---

## 8. Ministries Preview

Title:

**Find Your Community**

Create cards for:

* Kids Ministry
* Youth Ministry
* Young Adults
* Women's Ministry
* Men's Ministry
* Outreach

Each card:

* Image
* Title
* Short description
* Learn More

---

## 9. Leadership

Title:

**Meet Our Leadership**

Create 3 leadership cards.

Dummy data:

### Pastor John Smith

Senior Pastor

### Sarah Williams

Worship & Creative Director

### Michael Johnson

Community Outreach Director

Each includes:

* Professional portrait
* Name
* Position
* Short biography

---

## 10. Testimonial Section

Title:

**Stories From Our Community**

Create 3 testimonial cards.

Use realistic dummy testimonials.

Example:

> "Grace Community Church has become a place where our family feels welcomed, supported, and encouraged."

Include:

* Quote
* Name
* Optional photo

---

## 11. Call To Action

Large final section.

Title:

**There Is a Place for You Here**

Description:

**Come worship with us, meet our community, and discover what it means to grow together.**

Buttons:

**Plan Your Visit**

**Contact Us**

---

## 12. Footer

Create a professional footer.

Include:

* Church logo
* Short description
* Navigation
* Service times
* Address
* Phone
* Email
* Social media icons

Social media:

* Facebook
* Instagram
* YouTube

Copyright:

**© 2026 Grace Community Church. All rights reserved.**

Do NOT include an Admin/CMS link.

---

# ABOUT PAGE

Route:

```text
/about
```

Create a complete About page.

Sections:

## Hero

**Who We Are**

## Our Story

Use realistic dummy church history.

## Our Mission

## Our Vision

## Our Values

Create value cards.

## Leadership

Show church leadership.

## Call To Action

**Come Be Part of Our Story**

---

# MINISTRIES PAGE

Route:

```text
/ministries
```

Title:

**Find Your Community**

Display a grid of ministry cards.

Dummy ministries:

* Kids Ministry
* Youth Ministry
* Young Adults
* Women's Ministry
* Men's Ministry
* Worship Ministry
* Prayer Ministry
* Community Outreach

Each card:

* Image
* Ministry name
* Description
* Schedule
* Learn More

---

# MINISTRY DETAILS

Route:

```text
/ministries/:id
```

Create a detailed ministry page.

Include:

* Hero image
* Ministry name
* Description
* Mission
* Schedule
* Who it's for
* Contact information
* CTA

Button:

**Get Involved**

---

# EVENTS PAGE

Route:

```text
/events
```

Create a complete events listing.

Include:

* Featured event
* Event cards
* Date
* Time
* Location
* Description

Filters:

* All
* Worship
* Youth
* Community
* Outreach
* Other

Use dummy event data.

---

# EVENT DETAILS

Route:

```text
/events/:id
```

Show:

* Large event image
* Event title
* Date
* Time
* Location
* Description
* Event information
* Contact information

CTA:

**I'm Interested**

---

# SERMONS PAGE

Route:

```text
/sermons
```

Create a sermon library.

Include:

* Featured sermon
* Sermon cards
* Search
* Speaker filter
* Date information

Each sermon card:

* Thumbnail
* Play button
* Title
* Speaker
* Date
* Scripture

---

# SERMON DETAILS

Route:

```text
/sermons/:id
```

Create:

* Large sermon title
* Video player placeholder
* Speaker
* Date
* Scripture
* Description
* Related sermons

---

# ANNOUNCEMENTS PAGE

Route:

```text
/announcements
```

Create a church news/announcement page.

Dummy announcements:

* Sunday Service Update
* Youth Ministry Registration
* Community Outreach Program
* New Bible Study Group

Each card:

* Image
* Title
* Date
* Summary
* Read More

---

# CONTACT PAGE

Route:

```text
/contact
```

Create a welcoming contact page.

Include:

## Contact Information

Dummy information:

**Grace Community Church**

123 Main Street

Springfield, CA 90000

(555) 123-4567

[hello@gracecommunity.org](mailto:hello@gracecommunity.org)

## Office Hours

Monday–Friday

9:00 AM–5:00 PM

## Contact Form

Fields:

* Name
* Email
* Phone
* Message

Button:

**Send Message**

## Map

Create a map placeholder section.

## Social Media

Facebook

Instagram

YouTube

---

# PART 2 — PRIVATE CMS UI

Now create the UI for a private Church Content Management System.

IMPORTANT:

This is ONLY the UI for now.

Use dummy data.

Do not implement a real database.

Do not implement real authentication.

Do not implement backend functionality.

---

# CMS ROUTES

Create:

```text
/admin/login
/admin
/admin/content/home
/admin/content/about
/admin/ministries
/admin/events
/admin/sermons
/admin/announcements
/admin/testimonials
/admin/leadership
/admin/content/contact
/admin/media
/admin/settings
```

---

# CMS DESIGN

The CMS should look like a modern professional administration dashboard.

Use:

* Clean sidebar
* Top header
* Cards
* Tables
* Forms
* Status badges
* Modals
* Toasts
* Search
* Filters
* Responsive layouts

The CMS should NOT look like the public church website.

It should be optimized for church staff who need to manage content quickly.

---

# CMS LOGIN

Route:

```text
/admin/login
```

Create a clean login page.

Title:

**Church CMS**

Subtitle:

**Manage your church website content.**

Fields:

* Email
* Password

Button:

**Sign In**

Links:

**Forgot Password?**

Use dummy credentials visually.

Example:

```text
admin@gracechurch.org
••••••••
```

---

# CMS DASHBOARD

Route:

```text
/admin
```

Header:

**Good morning, Admin**

Subtitle:

**Here's what's happening with your website.**

Stats:

### Events

12

### Sermons

34

### Announcements

8

### Ministries

8

### Testimonials

16

### Media Files

124

---

# CMS SIDEBAR

Create:

```text
Dashboard

Website Content

Home Page
About Page
Contact Page

Content

Ministries
Events
Sermons
Announcements
Testimonials
Leadership

Media Library

Settings
```

Bottom:

* Admin profile
* Logout

---

# RECENT ACTIVITY

Create a table/list:

```text
Updated homepage hero
5 minutes ago

Added new sermon
1 hour ago

Published youth event
Yesterday

Updated church contact information
2 days ago

Added new ministry
3 days ago
```

---

# HOME PAGE EDITOR

Route:

```text
/admin/content/home
```

Create a CMS editor UI.

Sections:

### Hero

Fields:

* Eyebrow
* Heading
* Description
* Primary Button
* Secondary Button
* Hero Image

### Welcome Section

Fields:

* Heading
* Description
* Image
* Button

### Service Times

Editable service cards.

### Mission / Values

Editable cards.

### Featured Events

Select featured events.

### Latest Sermons

Select featured sermons.

### Testimonials

Select featured testimonials.

### CTA

Fields:

* Heading
* Description
* Button

Add:

**Save Changes**

**Preview Website**

---

# ABOUT PAGE EDITOR

Route:

```text
/admin/content/about
```

Fields:

* Page title
* Introduction
* Church story
* Mission
* Vision
* Values
* Main image
* Leadership section

Buttons:

**Save Changes**

**Preview**

---

# MINISTRIES CMS

Route:

```text
/admin/ministries
```

Create a management table.

Columns:

* Image
* Ministry
* Status
* Last Updated
* Actions

Dummy records:

```text
Kids Ministry
Youth Ministry
Young Adults
Women's Ministry
Men's Ministry
Worship Ministry
Prayer Ministry
Community Outreach
```

Actions:

* Edit
* Preview
* Delete

Button:

**+ Add Ministry**

---

# MINISTRY EDITOR

Create form:

* Ministry Name
* Description
* Image
* Mission
* Schedule
* Contact
* Status

Status:

* Draft
* Published

Buttons:

**Save Draft**

**Publish**

**Cancel**

---

# EVENTS CMS

Route:

```text
/admin/events
```

Create a management interface.

Columns:

* Event
* Date
* Location
* Status
* Actions

Button:

**+ Add Event**

Include:

* Search
* Filter
* Status filter

---

# EVENT EDITOR

Fields:

* Event Title
* Description
* Image
* Date
* Start Time
* End Time
* Location
* Contact Information
* Registration URL
* Status

Buttons:

**Save Draft**

**Publish Event**

---

# SERMONS CMS

Route:

```text
/admin/sermons
```

Create a sermon management table.

Columns:

* Thumbnail
* Sermon
* Speaker
* Date
* Status
* Actions

Button:

**+ Add Sermon**

---

# SERMON EDITOR

Fields:

* Sermon Title
* Speaker
* Date
* Scripture
* Description
* Thumbnail
* Video URL
* Status

Buttons:

**Save Draft**

**Publish Sermon**

---

# ANNOUNCEMENTS CMS

Route:

```text
/admin/announcements
```

Management table.

Fields:

* Title
* Date
* Status
* Actions

Editor:

* Title
* Content
* Featured Image
* Publish Date
* Status

---

# TESTIMONIAL CMS

Route:

```text
/admin/testimonials
```

Table:

* Person
* Quote
* Status
* Actions

Editor:

* Name
* Photo
* Quote
* Status

---

# LEADERSHIP CMS

Route:

```text
/admin/leadership
```

Management screen.

Fields:

* Name
* Position
* Photo
* Biography
* Display Order
* Status

Allow visual drag/reordering in the UI if practical.

---

# CONTACT INFORMATION CMS

Route:

```text
/admin/content/contact
```

Fields:

* Church Name
* Address
* Phone
* Email
* Office Hours
* Map URL
* Facebook
* Instagram
* YouTube

Button:

**Save Changes**

---

# MEDIA LIBRARY

Route:

```text
/admin/media
```

Create a visual media library.

Display image thumbnails in a grid.

Each item:

* Image
* Filename
* Upload date
* File type

UI actions:

* Upload
* Select
* Delete

For now, use dummy images.

---

# SETTINGS

Route:

```text
/admin/settings
```

Sections:

## Church Information

* Church name
* Logo
* Favicon

## Website Settings

* Website title
* Website description

## Admin Profile

* Name
* Email
* Password

## Social Media

* Facebook
* Instagram
* YouTube

---

# CMS UI STATES

Create realistic states for:

### Loading

Skeleton loaders.

### Empty

Example:

**No events yet**

**Create your first event to get started.**

### Success

Toast:

**Changes saved successfully**

### Error

**Something went wrong. Please try again.**

### Delete Confirmation

**Are you sure you want to delete this item?**

Buttons:

**Cancel**

**Delete**

---

# DUMMY DATA REQUIREMENT

Populate every page with realistic dummy content.

Do NOT use:

```text
Lorem ipsum
Test
Example
Item 1
Item 2
```

Use realistic church content.

The website should look complete immediately after launching.

---

# RESPONSIVE DESIGN

Support:

* 375px mobile
* 768px tablet
* 1024px laptop
* 1440px desktop

Public website:

* Responsive navbar
* Responsive hero
* Responsive sections
* Responsive cards
* Mobile menu

CMS:

* Desktop sidebar
* Mobile drawer
* Responsive tables
* Mobile cards
* Responsive forms

Do not allow unnecessary horizontal scrolling.

---

# COMPONENT ARCHITECTURE

Use reusable components.

Public components:

```text
Navbar
Footer
Hero
SectionHeading
ServiceTimes
MinistryCard
EventCard
SermonCard
AnnouncementCard
TestimonialCard
LeadershipCard
CTASection
```

CMS components:

```text
AdminLayout
AdminSidebar
AdminHeader
StatCard
DataTable
StatusBadge
ContentEditor
MediaUploader
SearchBar
FilterBar
ConfirmDialog
Toast
```

Shared UI:

```text
Button
Input
Textarea
Select
Modal
Dropdown
Tabs
Card
Badge
EmptyState
LoadingState
```

---

# FINAL INSTRUCTION

For this first phase, focus ONLY on building the **complete UI/UX prototype**.

Do not spend time building:

* Backend
* Database
* API
* Authentication logic
* CMS persistence
* Email functionality
* Real media uploads
* Real publishing logic

Use dummy data.

The goal is to first review and approve the design.

Build:

**1. Complete public church website**

AND

**2. Complete private church CMS interface**

Make all pages accessible through React Router.

Make the UI polished, responsive, consistent, and production-quality.

The CMS should visually demonstrate how church staff will eventually manage the public website.

After the UI is approved, the next development phase will be connecting the CMS to a database, authentication, and real content management functionality.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fcc-bagumbayan.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eeb3e72d-7d71-4c40-ad12-519602327b06).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
