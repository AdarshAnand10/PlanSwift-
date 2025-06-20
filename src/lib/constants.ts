
import type { IndustryTemplate } from '@/types';

export const APP_NAME = "PlanInsta"; // Updated App Name

export const INDUSTRIES: IndustryTemplate[] = [
  { 
    id: 'tech_startup', 
    name: 'Tech Startup', 
    description: 'For innovative software, hardware, or internet-based ventures.',
    predefinedInputs: { 
      industry: 'Technology',
      missionStatement: 'To revolutionize [specific area] through innovative technology solutions.',
      valueProposition: 'Our platform offers [unique benefit] to [target users], unlike existing solutions that [pain point].',
      targetMarket: 'Early adopters, tech enthusiasts, and businesses seeking digital transformation in [specific sector].',
      competitiveLandscape: 'Dominated by established players like [Competitor A] and emerging startups such as [Competitor B]. Our differentiation lies in [unique selling proposition].',
      financialProjections: 'Seeking seed funding to achieve [milestone 1] and [milestone 2] within 18 months, projecting [X]% user growth.',
      managementTeam: 'Led by experienced entrepreneurs with a track record in [relevant fields].',
      fundingRequest: 'Requesting $500,000 for product development, marketing, and team expansion.'
    } 
  },
  { 
    id: 'ecommerce_store', 
    name: 'E-commerce Store', 
    description: 'For online retail businesses selling physical or digital products.',
    predefinedInputs: { 
      industry: 'Retail E-commerce',
      missionStatement: 'To provide customers with high-quality [product category] and an exceptional online shopping experience.',
      valueProposition: 'We offer a curated selection of [product type] with fast shipping and personalized customer service.',
      targetMarket: '[Demographic] interested in [product benefits/niche].',
      competitiveLandscape: 'Competing with large marketplaces like Amazon and niche online stores. We focus on [unique aspect].',
      financialProjections: 'Aiming for [X] sales in the first year, with a customer acquisition cost of [Y].',
      managementTeam: 'Founders with expertise in digital marketing, SCM and e-commerce operations.',
      fundingRequest: 'Seeking $100,000 for inventory, marketing campaigns, and platform enhancements.'
    } 
  },
  { 
    id: 'cafe_restaurant', 
    name: 'Cafe/Restaurant',
    description: 'For food and beverage establishments, from coffee shops to fine dining.',
    predefinedInputs: { 
      industry: 'Food & Beverage',
      missionStatement: 'To be a beloved local spot offering delicious [cuisine type] made from fresh, locally-sourced ingredients in a welcoming atmosphere.',
      valueProposition: 'A unique dining experience featuring [signature dishes/drinks] and a strong community focus.',
      targetMarket: 'Local residents, office workers, and tourists aged [age range].',
      competitiveLandscape: 'Several cafes and restaurants in the area. Our competitive edge is [unique menu items/ambiance/price point].',
      financialProjections: 'Projecting [X] daily customers with an average check size of [Y]. Break-even point estimated at [Z] months.',
      managementTeam: 'Experienced chef and restaurant manager partnership.',
      fundingRequest: 'Requesting $150,000 for leasehold improvements, kitchen equipment, and initial operating expenses.'
    } 
  },
  { 
    id: 'consulting_firm', 
    name: 'Consulting Firm', 
    description: 'For businesses offering expert advice and services in various fields.',
    predefinedInputs: { 
      industry: 'Professional Services',
      missionStatement: 'To empower businesses in [specific industry] to achieve [specific goals] through expert strategic advice and implementation support.',
      valueProposition: 'Our consultants provide tailored solutions based on deep industry knowledge and proven methodologies, delivering measurable results.',
      targetMarket: 'Small to medium-sized enterprises (SMEs) in the [target industry/niche] requiring expertise in [service area].',
      competitiveLandscape: 'Competition includes large consulting firms and specialized boutique agencies. We differentiate through [our specific expertise/approach/pricing model].',
      financialProjections: 'Targeting [X] clients in the first year with an average project value of [Y].',
      managementTeam: 'Principal consultants with [combined years] of experience and a strong network in [industry].',
      fundingRequest: 'Seeking $50,000 for marketing, business development, and establishing a professional office space.'
    } 
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'zh', name: '中文 (简体)'}, // Simplified Chinese
];

export const DEFAULT_LANGUAGE = 'en';

export const LOCAL_STORAGE_PLANS_KEY = 'planInsta_plans'; // Updated key for new app name
