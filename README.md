# SurveyMonkey Competitor Intelligence Platform

A comprehensive, modern web application for exploring competitive intelligence in the survey and forms market. Built for SurveyMonkey employees and stakeholders to make data-driven strategic decisions.

![Platform Screenshot](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🎯 Overview

This platform provides deep competitive intelligence across **14 competitors** in the survey/forms market, including Qualtrics, Google Forms, Typeform, and 11 others. Data is structured across **9 comprehensive categories** with confidence scoring and source attribution.

### Key Features

- **🔍 Comprehensive Competitor Profiles**: Detailed analysis across 9 data categories
- **🤖 AI-Powered Chatbot**: Ask natural language questions about competitors
- **📊 Confidence Scoring**: High/medium/low confidence indicators on all data points
- **🎨 Modern UI/UX**: Apple/Rivian-inspired design with interactive elements
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **⚡ Real-time Insights**: Quick stats and comparative analysis

## 📋 Data Categories

Each competitor profile includes:

1. **Basic Company Information** - Name, logo, employees, location, founding year
2. **Financials** - Funding, valuation, revenue, quarterly earnings
3. **Milestones** - IPOs, acquisitions, strategic shifts, product launches
4. **Product Information** - Features, positioning, strategy, screenshots
5. **Pricing** - Tiered models, pricing strategies, incentives
6. **Technology** - Tech stack, infrastructure, security, integrations
7. **Marketing & Positioning** - Brand identity, value props, SEO strategy
8. **Claims & Statistics** - Company-stated metrics and statistics
9. **Reviews & Ratings** - Aggregated reviews from G2, Capterra, etc.

All data points include:
- ✅ Source links for verification
- 🎯 Confidence scores (green checkmark = high, yellow dot = medium, red dot = low)
- 📅 Collection dates
- 📝 Additional notes and context

## 🏗️ Architecture

```
surveymonkey-competitor-research/
├── app/                          # Next.js 14 App Router
│   ├── page.tsx                 # Homepage with overview
│   ├── competitors/
│   │   ├── page.tsx            # Competitors list
│   │   └── [id]/page.tsx       # Individual competitor detail
│   ├── chat/
│   │   └── page.tsx            # AI chatbot interface
│   └── api/
│       └── chat/route.ts        # Chat API endpoint
├── components/
│   ├── layout/                  # Navigation, chatbot overlay
│   ├── competitors/             # Competitor cards and sections
│   └── ui/                      # Reusable UI components
├── data/
│   └── competitors.ts           # Competitor database
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   └── utils.ts                 # Utility functions
└── public/                      # Static assets

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd claude-ai-research
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 💡 Usage

### Exploring Competitors

1. **Homepage**: View quick stats and top competitors
2. **Competitors Page**: Browse all 14 competitors with search
3. **Detail Pages**: Click any competitor for in-depth analysis
4. **Expandable Sections**: Click section headers to expand/collapse data

### Using the AI Chatbot

**Standalone Page**: Navigate to `/chat` for full chat experience

**Overlay**: Click the floating chat button (bottom-right) on any page

**Example Questions**:
- "What are Qualtrics' main strengths?"
- "Compare pricing across competitors"
- "Which competitors have mobile apps?"
- "Tell me about Typeform's positioning"

## 🎨 Design System

### Colors

- **Primary**: `hsl(222 47% 11%)` - Dark navy
- **Success**: Green (`#10b981`) for high confidence
- **Warning**: Yellow (`#f59e0b`) for medium confidence
- **Danger**: Red (`#ef4444`) for low confidence

### Typography

- System fonts (optimized for Mona Sans if added)
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components

- **Glass morphism** effects for cards
- **Smooth animations** with Framer Motion
- **Interactive hover states** throughout
- **Gradient accents** for visual interest

## 📊 Data Management

### Adding/Updating Competitor Data

Edit `/data/competitors.ts`:

```typescript
{
  id: 'competitor-slug',
  basics: {
    name: 'Company Name',
    // ... other fields
  },
  financials: { /* ... */ },
  // ... other categories
}
```

### Confidence Levels

- **High** (green ✓): Verified from primary sources
- **Medium** (yellow ●): Inferred from secondary sources
- **Low** (red ●): Estimates or limited data

### Sources

Always include:
- `source`: Brief description
- `sourceUrl`: Direct link
- `dateCollected`: When data was gathered

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📈 Future Enhancements

### Potential Features

- [ ] Real-time data updates from APIs
- [ ] Advanced filtering and search
- [ ] Data export (CSV, PDF reports)
- [ ] Comparison matrix view
- [ ] Email alerts for competitor changes
- [ ] Integration with Claude API for chatbot
- [ ] User authentication for internal access
- [ ] Data versioning and change tracking
- [ ] Screenshot galleries for products
- [ ] Interactive charts and visualizations

### Data Expansion

- [ ] Add remaining 11 competitors (stubs exist)
- [ ] Expand to 50+ competitors
- [ ] Weekly automated data collection
- [ ] Social media sentiment tracking
- [ ] Job posting analysis
- [ ] Patent and IP tracking

## 🤝 Contributing

For SurveyMonkey internal use. To update data:

1. Fork or create a branch
2. Update competitor data in `/data/competitors.ts`
3. Ensure confidence scores and sources are included
4. Test locally
5. Submit PR with description of changes

## 📝 License

Internal SurveyMonkey proprietary software. All rights reserved.

## 🙋 Support

For questions or issues:
- Internal: Contact the Competitive Intelligence team
- Technical: Reach out to the development team

---

## 🎯 Competitor Quick Reference

| Competitor | Founded | Employees | Valuation | Rating | Data % |
|------------|---------|-----------|-----------|--------|--------|
| Qualtrics | 2002 | 5,000 | $12.5B | 4.4/5 | 85% |
| Google Forms | 2008 | 190,000* | - | 4.6/5 | 70% |
| Typeform | 2012 | 500 | $935M | 4.5/5 | 75% |
| + 11 more | - | - | - | - | 30-40% |

*Part of Google/Alphabet

---

**Built with ❤️ for SurveyMonkey Competitive Intelligence**

Last Updated: 2024-01-15
