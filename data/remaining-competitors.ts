// Stub data for remaining competitors - can be expanded with full details
import { Competitor } from '@/lib/types';

export const remainingCompetitors: Partial<Competitor>[] = [
  {
    id: 'jotform',
    basics: {
      name: 'Jotform',
      slug: 'jotform',
      logo: 'https://logo.clearbit.com/jotform.com',
      website: 'https://www.jotform.com',
      foundedYear: { value: 2006, source: 'Crunchbase', sourceUrl: 'https://www.crunchbase.com/organization/jotform', confidence: 'high', dateCollected: '2024-01-15' },
      numberOfEmployees: { value: 700, source: 'LinkedIn', sourceUrl: 'https://www.linkedin.com/company/jotform', confidence: 'medium', dateCollected: '2024-01-15' },
      headquarters: { value: 'San Francisco, CA', source: 'Company website', sourceUrl: 'https://www.jotform.com', confidence: 'high', dateCollected: '2024-01-15' },
      industry: { value: 'Online Forms', source: 'Company', sourceUrl: 'https://www.jotform.com', confidence: 'high', dateCollected: '2024-01-15' },
      description: { value: 'Powerful form builder with 10,000+ templates', source: 'Website', sourceUrl: 'https://www.jotform.com', confidence: 'high', dateCollected: '2024-01-15' },
      socialMedia: {},
    },
    lastUpdated: '2024-01-15',
    completeness: 40,
  },
  {
    id: 'microsoft-forms',
    basics: {
      name: 'Microsoft Forms',
      slug: 'microsoft-forms',
      logo: 'https://logo.clearbit.com/microsoft.com',
      website: 'https://www.microsoft.com/en-us/microsoft-365/online-surveys-polls-quizzes',
      foundedYear: { value: 2016, source: 'Product launch', sourceUrl: 'https://www.microsoft.com', confidence: 'high', dateCollected: '2024-01-15' },
      numberOfEmployees: { value: 220000, source: 'Microsoft Corp', sourceUrl: 'https://www.microsoft.com', confidence: 'medium', dateCollected: '2024-01-15', notes: 'Part of Microsoft 365' },
      headquarters: { value: 'Redmond, WA', source: 'Microsoft', sourceUrl: 'https://www.microsoft.com', confidence: 'high', dateCollected: '2024-01-15' },
      industry: { value: 'Productivity Software', source: 'Company', sourceUrl: 'https://www.microsoft.com', confidence: 'high', dateCollected: '2024-01-15' },
      description: { value: 'Survey tool integrated with Microsoft 365', source: 'Website', sourceUrl: 'https://www.microsoft.com', confidence: 'high', dateCollected: '2024-01-15' },
      socialMedia: {},
    },
    lastUpdated: '2024-01-15',
    completeness: 35,
  },
  {
    id: 'alchemer',
    basics: {
      name: 'Alchemer',
      slug: 'alchemer',
      logo: 'https://logo.clearbit.com/alchemer.com',
      website: 'https://www.alchemer.com',
      foundedYear: { value: 2006, source: 'Company website', sourceUrl: 'https://www.alchemer.com', confidence: 'high', dateCollected: '2024-01-15' },
      numberOfEmployees: { value: 300, source: 'LinkedIn', sourceUrl: 'https://www.linkedin.com/company/alchemer', confidence: 'medium', dateCollected: '2024-01-15' },
      headquarters: { value: 'Louisville, CO', source: 'Company website', sourceUrl: 'https://www.alchemer.com', confidence: 'high', dateCollected: '2024-01-15' },
      industry: { value: 'Customer Feedback', source: 'Company', sourceUrl: 'https://www.alchemer.com', confidence: 'high', dateCollected: '2024-01-15' },
      description: { value: 'Enterprise feedback and survey platform', source: 'Website', sourceUrl: 'https://www.alchemer.com', confidence: 'high', dateCollected: '2024-01-15' },
      socialMedia: {},
    },
    lastUpdated: '2024-01-15',
    completeness: 30,
  },
  // Add remaining competitors as stubs (QuestionPro, SurveySparrow, SurveyGizmo, Zoho Survey, Formstack, Qualaroo, Survicate, Sogosurvey)
];
