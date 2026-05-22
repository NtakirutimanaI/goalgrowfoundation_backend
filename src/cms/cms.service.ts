import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmsContent } from './entities/cms-content.entity';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(CmsContent)
    private cmsRepository: Repository<CmsContent>,
  ) {}

  async findByPage(page: string): Promise<CmsContent[]> {
    return this.cmsRepository.find({ where: { page } });
  }

  async findAll(): Promise<CmsContent[]> {
    return this.cmsRepository.find();
  }

  async update(id: string, value: string): Promise<CmsContent | null> {
    const content = await this.cmsRepository.findOne({ where: { id } });
    if (!content) return null;
    content.value = value;
    return this.cmsRepository.save(content);
  }

  async upsert(data: Partial<CmsContent>): Promise<CmsContent> {
    let content = await this.cmsRepository.findOne({ 
      where: { page: data.page, section: data.section, key: data.key } 
    });
    
    if (content) {
      if (data.value !== undefined) content.value = data.value;
      if (data.type) content.type = data.type;
      return this.cmsRepository.save(content);
    } else {
      content = this.cmsRepository.create(data as CmsContent);
      return this.cmsRepository.save(content);
    }
  }

  async seed() {
    const data = [
      // Home
      { page: 'home', section: 'header', key: 'edition', value: 'Edition 2026 // No. 04' },
      { page: 'home', section: 'header', key: 'site_name', value: 'GoalGrow Times' },
      { page: 'home', section: 'header', key: 'location', value: 'Sport City, Global' },
      { page: 'home', section: 'hero', key: 'badge', value: 'HEADLINE STORY' },
      { page: 'home', section: 'hero', key: 'title_line1', value: 'THE FUTURE' },
      { page: 'home', section: 'hero', key: 'title_line2', value: 'IS' },
      { page: 'home', section: 'hero', key: 'title_highlight', value: 'FEMALE' },
      { page: 'home', section: 'hero', key: 'slide1', value: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600' },
      { page: 'home', section: 'hero', key: 'slide2', value: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1600' },
      { page: 'home', section: 'hero', key: 'slide3', value: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600' },
      { page: 'home', section: 'trending', key: 'title', value: 'Elite Academy' },
      { page: 'home', section: 'trending', key: 'subtitle', value: 'Intake Open' },
      { page: 'home', section: 'trending', key: 'img1', value: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400' },
      { page: 'home', section: 'trending', key: 'img2', value: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=400' },
      { page: 'home', section: 'trending', key: 'img3', value: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400' },
      { page: 'home', section: 'welcome', key: 'badge', value: 'WELCOME TO THE CLUB' },
      { page: 'home', section: 'welcome', key: 'title', value: 'EMPOWERING THE ATHLETE, THE LEADER.' },
      { page: 'home', section: 'welcome', key: 'desc', value: 'GoalGrow Foundation provides an elite-level environment where world-class coaching meets rigorous academic support and leadership development.' },
      { page: 'home', section: 'stats', key: 's1_label', value: 'Elite Standards' },
      { page: 'home', section: 'stats', key: 's1_desc', value: 'UEFA-pro methodologies to build technical mastery from age 8.' },
      { page: 'home', section: 'stats', key: 's2_label', value: 'Global Reach' },
      { page: 'home', section: 'stats', key: 's2_desc', value: 'Worldwide network of scouts and professional clubs monitoring talent.' },
      { page: 'home', section: 'founders', key: 'title', value: 'Action ON THE PITCH' },
      { page: 'home', section: 'founders', key: 'subtitle', value: 'Founders\' Note' },
      { page: 'home', section: 'founders', key: 'quote', value: '"They are the ones leading the way."' },
      { page: 'home', section: 'profiles', key: 'title', value: 'PLAYER PROFILES' },
      { page: 'home', section: 'profiles', key: 'p1_name', value: 'Anita B.' },
      { page: 'home', section: 'profiles', key: 'p1_tag', value: 'U16' },
      { page: 'home', section: 'profiles', key: 'p1_role', value: 'Forward // SCHOLAR' },
      { page: 'home', section: 'news', key: 'title', value: 'THE LATEST UPDATES' },
      { page: 'home', section: 'news', key: 'btn', value: 'VIEW ALL STORIES' },
      { page: 'home', section: 'news', key: 'item1_title', value: 'League Finals 2026' },
      { page: 'home', section: 'news', key: 'item1_tag', value: 'ACADEMY' },
      { page: 'home', section: 'news', key: 'item1_desc', value: 'Selection trials begin June 15th.' },
      { page: 'home', section: 'voices', key: 'title', value: 'OF OUR CHAMPIONS' },
      { page: 'home', section: 'voices', key: 't1_name', value: 'Kelia M.' },
      { page: 'home', section: 'voices', key: 't1_quote', value: '"GoalGrow taught me that my voice matters on and off the pitch. I am a leader now."' },
      { page: 'home', section: 'voices', key: 't1_role', value: 'U16 Captain' },
      { page: 'home', section: 'events', key: 'title', value: 'UPCOMING EVENTS' },
      { page: 'home', section: 'events', key: 'btn', value: 'VIEW CALENDAR' },
      { page: 'home', section: 'events', key: 'e1_date', value: 'JUNE 15' },
      { page: 'home', section: 'events', key: 'e1_title', value: 'National Selection Trials' },
      { page: 'home', section: 'events', key: 'e1_loc', value: 'Main Stadium' },
      { page: 'home', section: 'events', key: 'e1_tag', value: 'TRIALS' },
      { page: 'home', section: 'impact', key: 'c1_val', value: '12,000+' },
      { page: 'home', section: 'impact', key: 'c1_label', value: 'GIRLS EMPOWERED' },
      { page: 'home', section: 'impact', key: 'c2_val', value: '85%' },
      { page: 'home', section: 'impact', key: 'c2_label', value: 'ACADEMIC SUCCESS' },
      { page: 'home', section: 'impact', key: 'c3_val', value: '20+' },
      { page: 'home', section: 'impact', key: 'c3_label', value: 'REGIONAL HUBS' },
      { page: 'home', section: 'drill', key: 'badge', value: 'VIDEO SESSION' },
      { page: 'home', section: 'drill', key: 'title', value: 'Masterclass' },
      { page: 'home', section: 'drill', key: 'subtitle', value: 'WEEKLY TRAINING DRILL.' },
      { page: 'home', section: 'drill', key: 'desc', value: 'Academy Director Marcus Chen breaks down the "High-Intensity Transition" drill.' },
      { page: 'home', section: 'drill', key: 'btn', value: 'WATCH NOW' },
      { page: 'home', section: 'pillars', key: 'badge', value: 'ELITE COACHING.' },
      { page: 'home', section: 'pillars', key: 'title', value: 'Bridging the gap to professional performance.' },
      { page: 'home', section: 'pillars', key: 'f1_title', value: 'Elite Development' },
      { page: 'home', section: 'pillars', key: 'f1_desc', value: 'Technical development led by UEFA-certified specialists.' },
      { page: 'home', section: 'subscription', key: 'title', value: 'JOIN THE MOVEMENT.' },
      { page: 'home', section: 'subscription', key: 'desc', value: 'Receive bi-weekly updates on our progress and impact.' },
      { page: 'home', section: 'subscription', key: 'btn', value: 'SUBSCRIBE' },

      // Story
      { page: 'story', section: 'hero', key: 'title', value: 'Our Story' },
      { page: 'story', section: 'hero', key: 'subtitle', value: 'A Legacy of Empowerment since 2020' },
      { page: 'story', section: 'hero', key: 'img', value: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1600' },
      { page: 'story', section: 'chapter1', key: 'badge', value: 'Chapter I: The Spark (2020)' },
      { page: 'story', section: 'chapter1', key: 'title', value: 'Where It All Began' },
      { page: 'story', section: 'chapter1', key: 'desc1', value: 'In a world of rapidly changing sports landscapes, a critical gap remained: the professional-level development of young female athletes.' },
      { page: 'story', section: 'chapter1', key: 'desc2', value: 'We started with nothing but a dozen footballs, two sets of bibs, and a relentless belief that girls deserved the same pathway to excellence.' },
      { page: 'story', section: 'chapter2', key: 'badge', value: 'Chapter II: The Growth (2021-2022)' },
      { page: 'story', section: 'chapter2', key: 'title', value: 'Building The Infrastructure' },
      { page: 'story', section: 'chapter2', key: 'desc1', value: 'As word spread, we realized we needed more than just pitches. We needed a system.' },
      { page: 'story', section: 'chapter2', key: 'desc2', value: 'By the end of 2022, GoalGrow had successfully expanded to 5 regional hubs, supporting over 1,500 active players.' },

      { page: 'story', section: 'chapter2', key: 'desc2', value: 'By the end of 2022, GoalGrow had successfully expanded to 5 regional hubs, supporting over 1,500 active players.' },
      { page: 'story', section: 'timeline', key: 'item1_title', value: 'Founding' },
      { page: 'story', section: 'timeline', key: 'item1_desc', value: 'Official incorporation of GoalGrow Foundation.' },
      { page: 'story', section: 'philosophy', key: 'pillar1_title', value: 'Discipline' },
      { page: 'story', section: 'philosophy', key: 'pillar1_desc', value: 'We believe that character is built through consistency.' },

      // Mission
      { page: 'mission', section: 'header', key: 'title', value: 'Mission & Vision' },
      { page: 'mission', section: 'header', key: 'subtitle', value: 'Our Roadmap to 2030' },
      { page: 'mission', section: 'mission', key: 'title_start', value: 'To build champions who' },
      { page: 'mission', section: 'mission', key: 'title_highlight', value: 'lead' },
      { page: 'mission', section: 'mission', key: 'title_end', value: 'on and off the pitch.' },
      { page: 'mission', section: 'mission', key: 'desc', value: 'Our mission is to provide an elite-level environment where every young female athlete has access to world-class coaching.' },
      { page: 'mission', section: 'pillars', key: 'pillar1_title', value: 'I. Performance' },
      { page: 'mission', section: 'pillars', key: 'pillar1_desc', value: 'Developing technical mastery and tactical intelligence through our proprietary methodology.' },
      { page: 'mission', section: 'pillars', key: 'pillar2_title', value: 'II. Education' },
      { page: 'mission', section: 'pillars', key: 'pillar2_desc', value: 'Ensuring that athletic pursuits never compromise academic excellence.' },
      { page: 'mission', section: 'vision', key: 'badge', value: 'Vision 2030' },
      { page: 'mission', section: 'vision', key: 'title_line1', value: 'Global Expansion &' },
      { page: 'mission', section: 'vision', key: 'title_line2', value: 'Impact Leadership' },
      { page: 'mission', section: 'vision', key: 'goal1', value: '50 Self-Sustaining Training Hubs' },
      { page: 'mission', section: 'vision', key: 'goal2', value: '1,000+ Full-Ride Scholarships Secured' },
      { page: 'mission', section: 'cta', key: 'title', value: 'Be Part Of The Journey' },
      { page: 'mission', section: 'cta', key: 'btn1', value: 'Become a Partner' },

      // Mentorship
      { page: 'mentorship', section: 'header', key: 'title', value: 'Mentorship Program' },
      { page: 'mentorship', section: 'header', key: 'subtitle', value: 'Guiding the Leaders of Tomorrow' },
      { page: 'mentorship', section: 'program', key: 'p1_title', value: '1-on-1 Mentorship' },
      { page: 'mentorship', section: 'program', key: 'p1_desc', value: 'Personalized guidance from established female leaders.' },

      // Scholarships
      { page: 'scholarships', section: 'header', key: 'title', value: 'Scholarships' },
      { page: 'scholarships', section: 'header', key: 'subtitle', value: 'Removing Financial Barriers' },
      { page: 'scholarships', section: 'intent', key: 'i1_title', value: 'Elite Academic Award' },
      { page: 'scholarships', section: 'intent', key: 'i1_desc', value: 'Full tuition coverage for high-performing student-athletes.' },

      // Facilities
      { page: 'facilities', section: 'header', key: 'title', value: 'Our Facilities' },
      { page: 'facilities', section: 'header', key: 'subtitle', value: 'World-Class Development Infrastructure' },
      { page: 'facilities', section: 'list', key: 'f1_title', value: 'Elite Training Pitch A' },
      { page: 'facilities', section: 'list', key: 'f1_desc', value: 'Stadium-grade hybrid turf with advanced floodlighting.' },

      // News
      { page: 'news', section: 'header', key: 'title', value: 'Latest Updates' },
      { page: 'news', section: 'header', key: 'subtitle', value: 'The GoalGrow Chronicles' },
      { page: 'news', section: 'featured', key: 'img1', value: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800' },

      // Community Projects
      { page: 'community-projects', section: 'header', key: 'title', value: 'Community Impact' },
      { page: 'community-projects', section: 'header', key: 'subtitle', value: 'Impact Beyond the Pitch' },
      { page: 'community-projects', section: 'projects', key: 'p1_title', value: 'Rural Pitch Initiative' },
      { page: 'community-projects', section: 'projects', key: 'p1_desc', value: 'Building safe playing surfaces in remote communities.' },

      // Gallery
      { page: 'gallery', section: 'header', key: 'title', value: 'Gallery' },
      { page: 'gallery', section: 'header', key: 'subtitle', value: 'A Visual Journey of Empowerment' },
      { page: 'gallery', section: 'video', key: 'title', value: 'Season Highlights' },

      // Team
      { page: 'team', section: 'header', key: 'title', value: 'The Team' },
      { page: 'team', section: 'header', key: 'subtitle', value: 'Professional Excellence Behind Every Champion' },
      { page: 'team', section: 'group1', key: 'title', value: 'Executive Leadership' },
      { page: 'team', section: 'group1', key: 'm1_name', value: 'Sarah Jenkins' },
      { page: 'team', section: 'group1', key: 'm1_role', value: 'Executive Director' },
      { page: 'team', section: 'group1', key: 'm1_img', value: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
      { page: 'team', section: 'group1', key: 'm1_bio', value: 'Former Olympic consultant with 20 years in sports policy.' },
      { page: 'team', section: 'group1', key: 'm1_linkedin', value: 'https://linkedin.com/in/sarahjenkins' },
      { page: 'team', section: 'group1', key: 'm1_twitter', value: 'https://twitter.com/sarahj' },
      { page: 'team', section: 'group1', key: 'm1_bio_link', value: '/staff/sarah-jenkins' },
      
      { page: 'team', section: 'group1', key: 'm2_name', value: 'Marcus Chen' },
      { page: 'team', section: 'group1', key: 'm2_role', value: 'Chief Technical Officer' },
      { page: 'team', section: 'group1', key: 'm2_img', value: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
      { page: 'team', section: 'group1', key: 'm2_bio', value: 'UEFA Pro License coach with focus on youth systems.' },
      { page: 'team', section: 'group1', key: 'm2_linkedin', value: 'https://linkedin.com/in/marcuschen' },
      { page: 'team', section: 'group1', key: 'm2_twitter', value: 'https://twitter.com/mchen' },
      { page: 'team', section: 'group1', key: 'm2_bio_link', value: '/staff/marcus-chen' },

      // Coaching
      { page: 'coaching', section: 'header', key: 'title', value: 'Elite Coaching' },
      { page: 'coaching', section: 'header', key: 'subtitle', value: 'Professional Technical Development' },
      { page: 'coaching', section: 'methodology', key: 'badge', value: 'THE METHODOLOGY' },
      { page: 'coaching', section: 'methodology', key: 'title_line1', value: 'TECHNICAL MASTERY' },
      { page: 'coaching', section: 'methodology', key: 'title_line2', value: '& TACTICAL INTELLIGENCE' },
      { page: 'coaching', section: 'methodology', key: 'desc1', value: "At GoalGrow, we don't just teach football; we develop athletes. Our proprietary training methodology is built on the pillars of technical precision, tactical understanding, and physical resilience." },
      { page: 'coaching', section: 'methodology', key: 'desc2', value: "Each player undergoes a rigorous assessment and is placed into a tailored development tier that matches their current skill level while constantly pushing them toward the next milestone." },
      { page: 'coaching', section: 'methodology', key: 'focus_title', value: 'KEY FOCUS AREAS:' },
      { page: 'coaching', section: 'methodology', key: 'focus1', value: 'Ball Control & First Touch' },
      { page: 'coaching', section: 'methodology', key: 'focus2', value: 'Positional Awareness & Transition' },
      { page: 'coaching', section: 'methodology', key: 'focus3', value: 'High-Intensity Physical Conditioning' },
      { page: 'coaching', section: 'methodology', key: 'image', value: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800' },
      // Tiers
      { page: 'coaching', section: 'tiers', key: 'title', value: 'Development Tiers' },
      { page: 'coaching', section: 'tiers', key: 'subtitle', value: 'Structured pathways for long-term athlete success.' },
      { page: 'coaching', section: 'tiers', key: 't1_title', value: 'Foundation (U8-U12)' },
      { page: 'coaching', section: 'tiers', key: 't1_badge', value: 'Building the Basics' },
      { page: 'coaching', section: 'tiers', key: 't1_desc', value: 'Focus on technical fundamentals, coordination, and the joy of the game. 3 sessions per week with age-specific drills.' },
      { page: 'coaching', section: 'tiers', key: 't2_title', value: 'Development (U13-U15)' },
      { page: 'coaching', section: 'tiers', key: 't2_badge', value: 'Tactical Integration' },
      { page: 'coaching', section: 'tiers', key: 't2_desc', value: 'Introduction to complex tactical systems, positional specific training, and competitive psychology.' },
      { page: 'coaching', section: 'tiers', key: 't3_title', value: 'Elite (U16-U19)' },
      { page: 'coaching', section: 'tiers', key: 't3_badge', value: 'Professional Pathway' },
      { page: 'coaching', section: 'tiers', key: 't3_desc', value: 'High-performance training aimed at securing professional contracts and university scholarships.' },
      // Performance
      { page: 'coaching', section: 'performance', key: 'title', value: 'Data-Driven Performance' },
      { page: 'coaching', section: 'performance', key: 'subtitle', value: 'We use state-of-the-art technology to track every aspect of growth.' },
      { page: 'coaching', section: 'performance', key: 'p1_title', value: 'GPS Tracking' },
      { page: 'coaching', section: 'performance', key: 'p1_desc', value: 'Live data on speed, distance covered, and heat maps for every session.' },
      { page: 'coaching', section: 'performance', key: 'p2_title', value: 'Recovery Metrics' },
      { page: 'coaching', section: 'performance', key: 'p2_desc', value: 'Monitoring sleep, heart rate variability, and muscle fatigue to prevent injury.' },
      { page: 'coaching', section: 'performance', key: 'p3_title', value: 'Video Analysis' },
      { page: 'coaching', section: 'performance', key: 'p3_desc', value: 'Bi-weekly video reviews to improve tactical decision making.' },
      // CTA
      { page: 'coaching', section: 'cta', key: 'title', value: 'Ready to Elevate Your Game?' },
      { page: 'coaching', section: 'cta', key: 'desc', value: 'Selection trials are held quarterly across all our regional hubs. Join the academy that builds champions.' },
      { page: 'coaching', section: 'cta', key: 'btn', value: 'Register for Next Trials' },

      // Partners
      { page: 'partners', section: 'header', key: 'title', value: 'Global Partners' },
      { page: 'partners', section: 'header', key: 'subtitle', value: 'Fueling the Revolution through Collaboration' },
      { page: 'partners', section: 'tier1', key: 'title', value: 'Founding Partners' },
      { page: 'partners', section: 'tier1', key: 'p1_name', value: 'NIKE' },
      { page: 'partners', section: 'tier1', key: 'p1_role', value: 'Official Technical Partner' },

      // Contact
      { page: 'contact', section: 'header', key: 'title', value: 'Connect With Us' },
      { page: 'contact', section: 'header', key: 'subtitle', value: 'Get In Touch with the GoalGrow Team' },
      { page: 'contact', section: 'info', key: 'title', value: 'Get In Touch' },
      { page: 'contact', section: 'info', key: 'address_value', value: '123 Goal Street, Sport City, SC 54321' },
      { page: 'contact', section: 'info', key: 'email_value', value: 'office@goalgrow.org' },
      { page: 'contact', section: 'info', key: 'phone_value', value: '+1 (800) GROW-NOW' },
    ];

    for (const item of data) {
      await this.upsert(item);
    }
    return { message: 'Seed successful', count: data.length };
  }
}
