# BKW AI Planning Assistant 🏗️

Modern Next.js web application for automated building planning with AI. Built for the BKW Engineering x TUM.ai Hackathon 2025.

## Features

- 🤖 **AI-Powered Classification**: Automatic room type detection
- 💰 **Cost Estimation**: DIN 276 compliant cost calculations
- 📊 **Performance Analysis**: Heating, cooling, and ventilation calculations
- 📄 **Report Generation**: Professional documentation in DOCX/PDF format
- 🎨 **Modern UI**: Beautiful interface with Framer Motion animations
- 🖼️ **Hero Background**: Stunning modern office imagery

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **React**: React 19

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Engineer1080/bkw-hackathon.git
cd bkw-hackathon
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update the API endpoint in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://your-backend-url/api/process
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment to Railway

### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Go to [Railway](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect Next.js and deploy
6. Set environment variable in Railway dashboard:
   - `NEXT_PUBLIC_API_URL`: Your ML backend URL

### Option 2: Deploy with Railway CLI

1. Install Railway CLI:
```bash
npm i -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
railway init
```

4. Deploy:
```bash
railway up
```

5. Set environment variables:
```bash
railway variables set NEXT_PUBLIC_API_URL=your-backend-url
```

### Railway Configuration

Railway automatically detects Next.js. No additional configuration needed!

The app is configured with:
- ✅ `output: 'standalone'` for optimized Docker builds
- ✅ `npm start -p $PORT` to use Railway's dynamic port
- ✅ Production-ready build settings

## Project Structure

```
bkw-hackathon/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page with hero background
├── components/
│   ├── FileUpload.tsx        # File upload component
│   └── ResultsDashboard.tsx  # Results display
├── public/
│   └── modern_office.jpg     # Hero background image
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

## Backend Integration

The frontend expects a POST endpoint at `/api/process` that:

**Input:**
- `files`: Array of uploaded files (IFC, RVT, Excel, PDF)
- `location`: Project location (optional)
- `buildingType`: Building type (optional)
- `specialRequirements`: Special requirements text (optional)

**Output:**
```json
{
  "summary": {
    "totalRooms": 150,
    "roomTypes": 12,
    "confidence": 95,
    "similarProjects": 15
  },
  "costs": {
    "total": 1300000,
    "breakdown": [
      {
        "category": "Heat Supply Systems",
        "code": "KG 420",
        "amount": 285000,
        "percentage": 22,
        "description": "..."
      }
    ]
  },
  "roomClassifications": [
    {
      "type": "Office",
      "count": 45,
      "heating": 36,
      "cooling": 55
    }
  ],
  "warnings": ["Optional warning messages"],
  "files": {
    "roomBook": "url-to-excel",
    "costEstimate": "url-to-excel",
    "report": "url-to-pdf"
  }
}
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the BKW brand colors:
```js
bkw: {
  orange: '#FF6B00',
  blue: '#003DA5',
}
```

### API Endpoint

Update the API URL in `.env.local` or Railway environment variables.

## Build for Production

```bash
npm run build
npm start
```

## Recent Updates

- ✅ Updated to Next.js 15
- ✅ Updated to React 19
- ✅ Added modern office hero background
- ✅ Improved gradient styling for "AI-Powered" text
- ✅ Enhanced glassmorphism effects
- ✅ Updated year references to 2025

## License

MIT License - Built for BKW Engineering x TUM.ai Hackathon 2025

## Support

For issues or questions, please open an issue on GitHub or contact the team.

---

**Built with ❤️ for the BKW Engineering x TUM.ai Hackathon 2025**

🔗 **Repository**: [https://github.com/Engineer1080/bkw-hackathon](https://github.com/Engineer1080/bkw-hackathon)