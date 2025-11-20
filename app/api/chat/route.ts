import { NextRequest, NextResponse } from 'next/server';
import { competitors } from '@/data/competitors';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // For demo purposes, we'll create a simple response based on keywords
    // In production, this would integrate with Claude API or another LLM
    const response = generateResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Simple keyword-based responses for demo
  // In production, replace with actual AI API integration

  // Qualtrics queries
  if (lowerMessage.includes('qualtrics')) {
    const qualtrics = competitors.find(c => c.id === 'qualtrics');
    if (lowerMessage.includes('strength') || lowerMessage.includes('advantage')) {
      return `Qualtrics' main strengths include:

1. **Enterprise-Grade Platform**: Positioned as a comprehensive experience management (XM) platform with advanced features for large organizations
2. **AI-Powered Analytics**: Features like Stats iQ and Text iQ provide automated insights and sentiment analysis
3. **Market Penetration**: 75% of Fortune 100 companies use Qualtrics, showing strong enterprise adoption
4. **Backing from SAP**: With SAP's $12.5B acquisition, Qualtrics has significant resources and enterprise integration capabilities

However, this comes with trade-offs: complex interface, steep learning curve, and premium pricing that may be prohibitive for smaller teams.`;
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return `Qualtrics uses a custom enterprise pricing model:

- **Pricing**: Not publicly listed - requires contact with sales team
- **Model**: Enterprise subscription with tiered packages (CoreXM, Customer XM, Employee XM)
- **Confidence**: Medium (pricing information from sales inquiries)
- **No free trial** available

This positions Qualtrics firmly in the enterprise segment, contrasting with competitors like Google Forms (free) and Typeform (starting at $25/month).`;
    }

    if (qualtrics) {
      return `Qualtrics is an enterprise experience management platform founded in 2002. Key facts:

- **Employees**: ~5,000
- **Valuation**: $12.5B (SAP acquisition, 2023)
- **Rating**: 4.4/5 across 8,500+ reviews
- **Headquarters**: Provo, Utah & Seattle, Washington

Qualtrics offers four XM products (Customer, Employee, Product, Brand) on a single platform with strong AI capabilities but requires significant investment.`;
    }
  }

  // Google Forms queries
  if (lowerMessage.includes('google forms') || lowerMessage.includes('google form')) {
    const googleForms = competitors.find(c => c.id === 'google-forms');
    if (lowerMessage.includes('position') || lowerMessage.includes('strategy')) {
      return `Google Forms positioning and strategy:

**Positioning**: Simple, free, accessible form builder
**Strategy**: Free tool to drive Google Workspace adoption
**Target Market**: Mass market - educators, small businesses, individuals

**Key differentiators**:
- Completely free with unlimited forms and responses
- Deep integration with Google Workspace (Sheets, Drive, Calendar)
- Dominates SEO due to Google brand

**Trade-offs**: Limited features, basic design options, no advanced analytics. Best for simple, quick surveys but not suitable for complex research or enterprise needs.`;
    }

    if (googleForms) {
      return `Google Forms is a free online form builder launched in 2008 as part of Google Workspace:

- **Price**: Free (forever)
- **Rating**: 4.6/5 across 15,000+ reviews
- **Usage**: Billions of forms created
- **Best for**: Simple surveys, quizzes, event registrations

**Strengths**: Free, easy to use, Google integration
**Weaknesses**: Limited features, basic design, no advanced analytics

This makes it a strong competitor in the entry-level market but less competitive for enterprise or complex survey needs.`;
    }
  }

  // Typeform queries
  if (lowerMessage.includes('typeform')) {
    const typeform = competitors.find(c => c.id === 'typeform');
    if (lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('cost')) {
      return `Typeform pricing comparison:

**Typeform Tiers**:
- Free: $0 (10 responses/month, 3 typeforms)
- Basic: $25/month (100 responses/month)
- Plus: $50/month (1,000 responses/month) - Most Popular
- Business: $83/month (10,000 responses/month)

**vs Competitors**:
- More expensive than Google Forms (free) and Microsoft Forms (free with Office 365)
- Comparable to mid-tier competitors
- Much cheaper than enterprise solutions like Qualtrics (custom pricing)

**Value Prop**: Higher pricing justified by beautiful design and claims of 95% completion rates.`;
    }

    if (typeform) {
      return `Typeform is a conversational form builder founded in 2012 in Barcelona:

- **Employees**: ~500
- **Funding**: $135M raised, valued at $935M
- **Rating**: 4.5/5
- **Key Differentiator**: One-question-at-a-time conversational interface

**Strengths**: Beautiful design, high completion rates, user-friendly
**Weaknesses**: Response limits on lower tiers, limited reporting capabilities

**Target Market**: SMBs, marketing teams, creative agencies who value design and user experience.`;
    }
  }

  // Mobile apps query
  if (lowerMessage.includes('mobile') && lowerMessage.includes('app')) {
    return `Mobile app availability across competitors:

**Yes - Full mobile apps (iOS & Android)**:
- Qualtrics ✓
- Google Forms ✓ (via Google Workspace)
- Typeform ✓
- Jotform ✓ (based on market research)

**Confidence Level**: High for top 3 competitors based on App Store/Google Play listings

Mobile apps are increasingly important for on-the-go survey creation and data collection. Most modern competitors offer mobile experiences, though feature parity with web versions varies.`;
  }

  // Pricing comparison
  if ((lowerMessage.includes('compare') || lowerMessage.includes('comparison')) && lowerMessage.includes('pric')) {
    return `Pricing comparison across competitors:

**Free Options**:
- Google Forms: $0 (unlimited, forever)
- Microsoft Forms: $0 (with Microsoft 365)

**Freemium Models**:
- Typeform: $0-$83/month (based on responses)
- Jotform: Similar tiered model

**Enterprise/Custom**:
- Qualtrics: Custom pricing (enterprise-focused)
- Alchemer: Custom pricing

**Key Insight**: Clear market segmentation - free tools for basic needs, mid-tier ($25-100/month) for SMBs, enterprise solutions (custom) for large organizations. SurveyMonkey should consider positioning across multiple segments.`;
  }

  // Market overview
  if (lowerMessage.includes('market') || lowerMessage.includes('landscape') || lowerMessage.includes('overview')) {
    return `Survey/Forms market landscape overview:

**Market Segments**:
1. **Free/Consumer**: Google Forms, Microsoft Forms - High volume, basic features
2. **SMB/Mid-Market**: Typeform, Jotform, SurveyMonkey - Design & features balance
3. **Enterprise**: Qualtrics, Alchemer - Advanced features, integration, support

**Key Trends**:
- AI-powered analytics (Qualtrics leading)
- Design-focused experiences (Typeform differentiation)
- Integration ecosystems (all players investing)
- Mobile-first approaches

**Total Employees**: ~200K+ across tracked competitors
**Avg Rating**: 4.4/5 across platforms

**Opportunity for SurveyMonkey**: Strong mid-market position with potential to expand both up-market (compete with Qualtrics features) and down-market (compete with Google Forms ease).`;
  }

  // Default response
  return `I can help you learn about our ${competitors.length} tracked competitors. Here are some things you can ask me about:

• **Specific competitors**: "Tell me about Qualtrics" or "What is Typeform's pricing?"
• **Comparisons**: "Compare pricing across competitors"
• **Features**: "Which competitors have mobile apps?"
• **Market insights**: "What's the competitive landscape?"
• **Strengths/weaknesses**: "What are Google Forms' main advantages?"

What would you like to know?`;
}
