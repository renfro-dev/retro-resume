export interface ServiceEntry {
  slug: string;
  title: string;
  description: string;
}

export const services: ServiceEntry[] = [
  {
    slug: "revenue_enablement",
    title: "Revenue Enablement",
    description: "Implement cutting edge tools to make your sales and marketing team more effective.",
  },
  {
    slug: "customer_intelligence",
    title: "Customer Intelligence",
    description: "Audit, enrich, and analyse CRM data to find where to focus your efforts.",
  },
  {
    slug: "ai_workflow_libraries",
    title: "AI Workflow Libraries",
    description: "Build a library of version controlled workflows that unite teams, accelerate delivery, and standardize outputs.",
  },
  {
    slug: "ai_executive_training",
    title: "AI Executive Training",
    description: "We train and empower executives with hands on training.",
  },
  {
    slug: "recruiting_prospecting",
    title: "Recruiting & Prospecting",
    description: "Find and convert your best prospects.",
  },
];
