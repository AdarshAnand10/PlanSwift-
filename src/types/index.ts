export interface PlanSection {
  id: string;
  title: string;
  content: string;
}

export interface BusinessPlan {
  id: string;
  name: string;
  companyName: string; // Added from form
  industry: string;
  missionStatement: string; // Added from form
  valueProposition: string; // Added from form
  targetMarket: string; // Added from form
  competitiveLandscape: string; // Added from form
  financialProjections: string; // Added from form
  managementTeam: string; // Added from form
  fundingRequest: string; // Added from form
  language: string; // e.g., 'en', 'es'
  sections: PlanSection[];
  fullPlanMarkdown?: string; // Store the raw generated markdown
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  predefinedInputs: {
    industry?: string;
    missionStatement?: string;
    valueProposition?: string;
    targetMarket?: string;
    competitiveLandscape?: string;
    financialProjections?: string;
    managementTeam?: string;
    fundingRequest?: string;
  };
}

// Used for the form to generate a business plan
export interface GeneratePlanFormValues {
  planName: string;
  companyName: string;
  industryTemplateId: string;
  missionStatement: string;
  valueProposition: string;
  targetMarket: string;
  competitiveLandscape: string;
  financialProjections: string;
  managementTeam: string;
  fundingRequest: string;
}