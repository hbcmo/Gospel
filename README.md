# Gospel Game

An interactive evangelistic web application that walks users through the essential truths of the gospel message with the intent to persuade.

## About

This application presents the gospel through four key questions:
1. **Who is God?** - God's holiness, sovereignty, and perfection
2. **Who is Man?** - Human sinfulness, total depravity, and need for salvation
3. **Who is Jesus?** - Christ as mediator, His substitutionary atonement, and sufficient sacrifice
4. **Invitation** - Call to repentance, faith in Christ alone, and lordship submission

### Theological Framework

Built on a soft Calvinistic/Reformed Baptist framework, emphasizing:
- God's sovereignty and holiness
- Human inability and total depravity
- Grace alone through faith alone in Christ alone
- Substitutionary atonement
- Call to repentance and lordship

### Features

- **Progressive Journey**: Users advance through stages with visual progress tracking
- **Flexible Pacing**: 
  - "I'm Ready to Decide" button to skip to invitation for those ready to respond
  - "Learn More" expandable sections for deeper theological exploration
  - "I Need More Time to Consider" option to review content
- **Interactive Elements**: Reflection questions with visual feedback
- **Scripture-Based**: Biblical references throughout each stage
- **Discipleship Guidance**: Post-decision next steps for new believers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or download the repository
cd gospel-game

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Deployment**: Optimized for Vercel, Netlify, or any Node.js hosting

## Project Structure

```
gospel-game/
├── src/
│   └── app/
│       ├── page.tsx          # Main gospel game component
│       ├── layout.tsx         # Root layout
│       └── globals.css        # Global styles
├── public/                    # Static assets
├── package.json
└── README.md
```

## Usage for Ministry

This tool is designed for:
- Personal evangelism websites
- Church outreach initiatives
- Online gospel presentations
- Sharing with seekers and non-believers

### Customization

You can customize the content by editing `src/app/page.tsx`:
- Modify scripture references
- Adjust theological explanations
- Change visual styling
- Add additional stages or content

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the production bundle and deploy the `.next` folder to your hosting provider.

## Contributing

This is a ministry tool. Feel free to adapt it for your context while maintaining theological accuracy.

## License

Free to use for gospel ministry purposes.

## Contact

For questions about theological content or technical implementation, please open an issue in the repository.

---

*"For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes." - Romans 1:16*
