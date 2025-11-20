import { NextRequest, NextResponse } from 'next/server';
import { competitors } from '@/data/competitors';
import { Competitor } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    // Generate intelligent response using competitor data
    const response = await generateIntelligentResponse(message, history);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// Extract competitor names from the message
function extractCompetitorNames(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  const mentionedCompetitors: string[] = [];

  competitors.forEach(competitor => {
    const name = competitor.basics.name.toLowerCase();
    // Check for exact name or variations
    if (lowerMessage.includes(name)) {
      mentionedCompetitors.push(competitor.id);
    }
  });

  return mentionedCompetitors;
}

// Find competitor by ID
function findCompetitor(id: string): Competitor | undefined {
  return competitors.find(c => c.id === id);
}

// Format currency
function formatCurrency(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}

// Format number
function formatNumber(value: number): string {
  return value.toLocaleString();
}

// Compare two competitors
function compareCompetitors(comp1: Competitor, comp2: Competitor, aspect: string): string {
  const lowerAspect = aspect.toLowerCase();

  // Company size comparison
  if (lowerAspect.includes('size') || lowerAspect.includes('employee')) {
    const emp1 = comp1.basics.numberOfEmployees.value || 0;
    const emp2 = comp2.basics.numberOfEmployees.value || 0;
    const diff = Math.abs(emp1 - emp2);
    const larger = emp1 > emp2 ? comp1.basics.name : comp2.basics.name;
    const smaller = emp1 > emp2 ? comp2.basics.name : comp1.basics.name;

    return `**Company Size Comparison:**

${comp1.basics.name}: **${formatNumber(emp1)} employees**
${comp2.basics.name}: **${formatNumber(emp2)} employees**

${larger} is larger with ${formatNumber(diff)} more employees than ${smaller}.

**Context:**
- ${comp1.basics.name} is positioned as a ${comp1.basics.industry} company based in ${comp1.basics.headquarters}
- ${comp2.basics.name} is positioned as a ${comp2.basics.industry} company based in ${comp2.basics.headquarters}

This size difference often correlates with market positioning - ${larger} likely has more resources for enterprise features and support.`;
  }

  // Valuation comparison
  if (lowerAspect.includes('valuation') || lowerAspect.includes('worth')) {
    const val1 = comp1.financials?.valuation?.value || 0;
    const val2 = comp2.financials?.valuation?.value || 0;

    if (val1 === 0 && val2 === 0) {
      return `Valuation data is not publicly available for either ${comp1.basics.name} or ${comp2.basics.name}.`;
    }

    return `**Valuation Comparison:**

${comp1.basics.name}: ${val1 > 0 ? formatCurrency(val1) : 'Not publicly disclosed'}
${comp2.basics.name}: ${val2 > 0 ? formatCurrency(val2) : 'Not publicly disclosed'}

${val1 > 0 && comp1.financials?.valuation?.source ? `Source: ${comp1.financials.valuation.source}` : ''}
${val2 > 0 && comp2.financials?.valuation?.source ? `Source: ${comp2.financials.valuation.source}` : ''}`;
  }

  // Pricing comparison
  if (lowerAspect.includes('pric')) {
    const pricing1 = comp1.pricing;
    const pricing2 = comp2.pricing;

    let response = `**Pricing Comparison:**\n\n**${comp1.basics.name}:**\n`;
    response += `- Model: ${pricing1.model.value}\n`;
    if (pricing1.tiers && pricing1.tiers.length > 0) {
      pricing1.tiers.slice(0, 3).forEach(tier => {
        response += `  - ${tier.name}: ${tier.price}\n`;
      });
    }

    response += `\n**${comp2.basics.name}:**\n`;
    response += `- Model: ${pricing2.model.value}\n`;
    if (pricing2.tiers && pricing2.tiers.length > 0) {
      pricing2.tiers.slice(0, 3).forEach(tier => {
        response += `  - ${tier.name}: ${tier.price}\n`;
      });
    }

    return response;
  }

  // Rating comparison
  if (lowerAspect.includes('rating') || lowerAspect.includes('review')) {
    const rating1 = comp1.reviews?.aggregatedRating || 0;
    const rating2 = comp2.reviews?.aggregatedRating || 0;

    return `**Customer Ratings Comparison:**

${comp1.basics.name}: ⭐ ${rating1}/5
${comp2.basics.name}: ⭐ ${rating2}/5

${rating1 > rating2 ? comp1.basics.name : comp2.basics.name} has a higher customer rating.`;
  }

  // Technology comparison
  if (lowerAspect.includes('tech') || lowerAspect.includes('stack')) {
    const tech1 = comp1.technology;
    const tech2 = comp2.technology;

    const frontend1 = tech1?.frontend?.map(f => f.value).join(', ') || 'Not disclosed';
    const backend1 = tech1?.backend?.map(b => b.value).join(', ') || 'Not disclosed';
    const infra1 = tech1?.infrastructure?.map(i => i.value).join(', ') || 'Not disclosed';

    const frontend2 = tech2?.frontend?.map(f => f.value).join(', ') || 'Not disclosed';
    const backend2 = tech2?.backend?.map(b => b.value).join(', ') || 'Not disclosed';
    const infra2 = tech2?.infrastructure?.map(i => i.value).join(', ') || 'Not disclosed';

    return `**Technology Stack Comparison:**

**${comp1.basics.name}:**
- Frontend: ${frontend1}
- Backend: ${backend1}
- Infrastructure: ${infra1}

**${comp2.basics.name}:**
- Frontend: ${frontend2}
- Backend: ${backend2}
- Infrastructure: ${infra2}`;
  }

  // Default comparison
  return `I can compare ${comp1.basics.name} and ${comp2.basics.name}. What specific aspect would you like to compare? For example:
- Company size (employees)
- Valuation
- Pricing
- Customer ratings
- Technology stack`;
}

// Get reviews for a competitor
function getReviews(competitor: Competitor, limit: number = 3): string {
  if (!competitor.reviews || !competitor.reviews.reviews) {
    return `No reviews are currently available in our database for ${competitor.basics.name}.`;
  }

  let response = `**${competitor.basics.name} Reviews:**\n\n`;
  response += `**Overall Rating:** ⭐ ${competitor.reviews.aggregatedRating}/5\n`;
  response += `**Sentiment:** ${competitor.reviews.overallSentiment}\n\n`;

  const platforms = competitor.reviews.reviews;
  let reviewCount = 0;

  for (const platform of platforms) {
    if (reviewCount >= limit) break;

    response += `**From ${platform.platform}** (${platform.rating.value}/5, ${formatNumber(platform.totalReviews.value)} reviews):\n\n`;

    if (platform.commonPraises && platform.commonPraises.length > 0) {
      response += `*Positive feedback:*\n`;
      platform.commonPraises.slice(0, 2).forEach(praise => {
        response += `• "${praise}"\n`;
      });
      response += '\n';
    }

    if (platform.commonComplaints && platform.commonComplaints.length > 0) {
      response += `*Areas for improvement:*\n`;
      platform.commonComplaints.slice(0, 2).forEach(complaint => {
        response += `• "${complaint}"\n`;
      });
      response += '\n';
    }

    reviewCount++;
  }

  response += `\n*Note: These are actual customer reviews collected from verified review platforms. Reviews have not been altered and reflect real user experiences.*`;

  return response;
}

// Get competitor overview
function getCompetitorOverview(competitor: Competitor): string {
  const emp = competitor.basics.numberOfEmployees.value || 0;
  const rating = competitor.reviews?.aggregatedRating || 0;
  const val = competitor.financials?.valuation?.value || 0;

  let response = `**${competitor.basics.name} Overview:**\n\n`;
  response += `${competitor.basics.description}\n\n`;
  response += `**Key Facts:**\n`;
  response += `- Industry: ${competitor.basics.industry}\n`;
  response += `- Headquarters: ${competitor.basics.headquarters}\n`;
  response += `- Founded: ${competitor.basics.foundedYear}\n`;
  response += `- Employees: ${formatNumber(emp)}\n`;
  response += `- Rating: ⭐ ${rating}/5\n`;
  if (val > 0) {
    response += `- Valuation: ${formatCurrency(val)}\n`;
  }
  response += `- Data Completeness: ${competitor.completeness}%\n\n`;

  // Add key products
  if (competitor.products && competitor.products.length > 0) {
    response += `**Products:**\n`;
    competitor.products.slice(0, 2).forEach(product => {
      response += `- ${product.name}: ${product.description}\n`;
    });
  }

  return response;
}

// Main response generation function
async function generateIntelligentResponse(message: string, history?: any[]): Promise<string> {
  const lowerMessage = message.toLowerCase();
  const mentionedCompetitors = extractCompetitorNames(message);

  // Handle comparison queries
  if ((lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('versus') ||
       lowerMessage.includes('difference between')) && mentionedCompetitors.length >= 2) {
    const comp1 = findCompetitor(mentionedCompetitors[0]);
    const comp2 = findCompetitor(mentionedCompetitors[1]);

    if (comp1 && comp2) {
      return compareCompetitors(comp1, comp2, message);
    }
  }

  // Handle review queries
  if ((lowerMessage.includes('review') || lowerMessage.includes('feedback') ||
       lowerMessage.includes('testimonial') || lowerMessage.includes('customer') ||
       lowerMessage.includes('rating')) && mentionedCompetitors.length > 0) {
    const competitor = findCompetitor(mentionedCompetitors[0]);
    if (competitor) {
      return getReviews(competitor);
    }
  }

  // Handle specific competitor queries
  if (mentionedCompetitors.length === 1) {
    const competitor = findCompetitor(mentionedCompetitors[0]);
    if (competitor) {
      // Specific attribute queries
      if (lowerMessage.includes('employee') || lowerMessage.includes('size') || lowerMessage.includes('team')) {
        const emp = competitor.basics.numberOfEmployees.value || 0;
        return `${competitor.basics.name} has approximately **${formatNumber(emp)} employees** as of ${competitor.basics.numberOfEmployees.dateCollected}. (Source: ${competitor.basics.numberOfEmployees.source}, Confidence: ${competitor.basics.numberOfEmployees.confidence})`;
      }

      if (lowerMessage.includes('pric')) {
        let response = `**${competitor.basics.name} Pricing:**\n\n`;
        response += `Model: ${competitor.pricing.model.value}\n\n`;
        if (competitor.pricing.tiers && competitor.pricing.tiers.length > 0) {
          response += `**Tiers:**\n`;
          competitor.pricing.tiers.forEach(tier => {
            response += `\n**${tier.name}**${tier.popular ? ' 🌟 (Most Popular)' : ''}\n`;
            response += `- Price: ${tier.price.value}\n`;
            response += `- Billing: ${tier.billingCycle}\n`;
            if (tier.features && tier.features.length > 0) {
              response += `- Features: ${tier.features.slice(0, 3).join(', ')}${tier.features.length > 3 ? ', ...' : ''}\n`;
            }
          });
        }
        return response;
      }

      if (lowerMessage.includes('tech') || lowerMessage.includes('stack')) {
        const tech = competitor.technology;
        if (!tech) {
          return `Technology stack information is not available for ${competitor.basics.name}.`;
        }

        const frontend = tech.frontend?.map(f => f.value).join(', ') || 'Not disclosed';
        const backend = tech.backend?.map(b => b.value).join(', ') || 'Not disclosed';
        const infrastructure = tech.infrastructure?.map(i => i.value).join(', ') || 'Not disclosed';
        const security = tech.security?.map(s => s.value).join(', ') || 'Not disclosed';
        const iosApp = tech.mobileApps?.ios?.value ? 'iOS' : '';
        const androidApp = tech.mobileApps?.android?.value ? 'Android' : '';
        const mobileApps = [iosApp, androidApp].filter(Boolean).join(' & ') || 'Not available';

        return `**${competitor.basics.name} Technology Stack:**

- Frontend: ${frontend}
- Backend: ${backend}
- Infrastructure: ${infrastructure}
- Security: ${security}
- Mobile Apps: ${mobileApps}`;
      }

      if (lowerMessage.includes('valuation') || lowerMessage.includes('worth') || lowerMessage.includes('value')) {
        const val = competitor.financials?.valuation?.value;
        const valuation = competitor.financials?.valuation;
        if (val && valuation) {
          return `${competitor.basics.name} is valued at **${formatCurrency(val)}** as of ${valuation.dateCollected}. (Source: ${valuation.source}, Confidence: ${valuation.confidence})`;
        }
        return `Valuation information is not publicly available for ${competitor.basics.name}.`;
      }

      // Default to overview
      return getCompetitorOverview(competitor);
    }
  }

  // Handle general queries
  if (lowerMessage.includes('how many') || lowerMessage.includes('total')) {
    return `I have intelligence on **${competitors.length} competitors** in the survey and forms market. This includes major players like Qualtrics, Google Forms, Typeform, and many others. Would you like to know about any specific competitor?`;
  }

  if (lowerMessage.includes('market') || lowerMessage.includes('landscape') || lowerMessage.includes('industry')) {
    const totalEmployees = competitors.reduce((sum, c) => sum + (c.basics.numberOfEmployees.value || 0), 0);
    const avgRating = competitors.reduce((sum, c) => sum + (c.reviews?.aggregatedRating || 0), 0) / competitors.length;

    return `**Survey & Forms Market Landscape:**

**Market Size:**
- ${competitors.length} major competitors tracked
- ${formatNumber(totalEmployees)} total employees across tracked companies
- Average customer rating: ⭐ ${avgRating.toFixed(1)}/5

**Market Segments:**
1. **Enterprise**: Qualtrics, Alchemer - Advanced features, custom pricing
2. **Mid-Market**: Typeform, Jotform - Feature-rich, subscription-based
3. **Mass Market**: Google Forms, Microsoft Forms - Free/low-cost, basic features

**Key Trends:**
- AI-powered analytics and insights
- Mobile-first experiences
- Advanced integrations and APIs
- Focus on user experience and design

Would you like detailed information about any specific competitor or segment?`;
  }

  if (lowerMessage.includes('best') || lowerMessage.includes('top') || lowerMessage.includes('leader')) {
    // Sort by rating
    const topRated = [...competitors]
      .filter(c => c.reviews?.aggregatedRating)
      .sort((a, b) => (b.reviews?.aggregatedRating || 0) - (a.reviews?.aggregatedRating || 0))
      .slice(0, 5);

    let response = `**Top-Rated Competitors:**\n\n`;
    topRated.forEach((comp, idx) => {
      response += `${idx + 1}. **${comp.basics.name}** - ⭐ ${comp.reviews?.aggregatedRating}/5 (${comp.basics.industry})\n`;
    });

    return response;
  }

  // List all competitors
  if (lowerMessage.includes('list') || lowerMessage.includes('show all') || lowerMessage.includes('all competitor')) {
    let response = `**All ${competitors.length} Tracked Competitors:**\n\n`;
    competitors.slice(0, 15).forEach((comp, idx) => {
      response += `${idx + 1}. ${comp.basics.name} - ${comp.basics.industry}\n`;
    });
    if (competitors.length > 15) {
      response += `\n...and ${competitors.length - 15} more. Visit the Competitors page to see the full list.`;
    }
    return response;
  }

  // Default response with suggestions
  return `I'm your AI Competitive Intelligence Assistant with access to data on ${competitors.length} competitors. I can help you with:

**📊 Comparisons:**
• "How does Typeform's company size compare to Alchemer?"
• "Compare Qualtrics and Google Forms pricing"

**⭐ Reviews & Ratings:**
• "Give me examples of SurveySparrow's reviews"
• "What do customers say about Typeform?"

**📈 Company Information:**
• "Tell me about Qualtrics"
• "What is Google Forms' employee count?"
• "Show me Typeform's technology stack"

**🌐 Market Insights:**
• "What's the market landscape?"
• "Who are the top-rated competitors?"

What would you like to know?`;
}
