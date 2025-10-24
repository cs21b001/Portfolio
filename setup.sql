-- Portfolio Website Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- About section
CREATE TABLE about (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  profile_image_url TEXT,
  resume_url TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
  icon_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[] NOT NULL,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  project_pdf_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Work experiences
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  location TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Social media links
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true
);

-- Contact form messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for About
CREATE POLICY "Public can read about" ON about FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update about" ON about FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert about" ON about FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for Skills
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Projects
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Experiences
CREATE POLICY "Public can read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Social Links
CREATE POLICY "Public can read visible social links" ON social_links FOR SELECT USING (is_visible = true);
CREATE POLICY "Authenticated users can read all social links" ON social_links FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert social links" ON social_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update social links" ON social_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete social links" ON social_links FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Contact Messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read contact messages" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update contact messages" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete contact messages" ON contact_messages FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for Site Settings
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update site settings" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can insert site settings" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default about record
INSERT INTO about (title, description) VALUES 
('Welcome to My Portfolio', 'This is a placeholder description. Please update this from the admin dashboard.');

-- Insert some default site settings
INSERT INTO site_settings (setting_key, setting_value) VALUES 
('site_name', 'My Portfolio'),
('site_tagline', 'Full Stack Developer'),
('theme', 'dark');
