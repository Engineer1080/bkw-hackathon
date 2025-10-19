# BKW AI Planning Assistant 🏗️

Modern Next.js web application for automated building planning with AI. Built for the BKW Engineering x TUM.ai Hackathon 2025.

## Features

- 🤖 **AI-Powered Classification**: Automatic room type detection with FastAPI ML backend
- 💰 **AI Cost Estimation**: Intelligent TGA cost estimation (DIN 276 compliant)
- 📊 **Performance Analysis**: Heating, cooling, and ventilation calculations
- 📄 **AI Report Generation**: HOAI-compliant explanatory reports powered by Claude Sonnet 4.5
- 🎨 **Modern UI**: Beautiful interface with Framer Motion animations
- 🖼️ **Hero Background**: Stunning modern office imagery
- ⚡ **Quick Prediction**: Real-time room type prediction based on volume, area, and heating load
- 🌙 **Dark Mode**: Full dark mode support with theme persistence
- 📈 **Detailed Cost Breakdown**: All TGA cost groups (KG 410-480) with intelligent descriptions

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
# Create .env.local with the following content:
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Update the API endpoint in `.env.local`:
```
# For local FastAPI development
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production
NEXT_PUBLIC_API_URL=https://your-fastapi-service.railway.app
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
│   ├── ResultsDashboard.tsx  # Results display
│   ├── RoomTypePredictor.tsx # Quick room type prediction
│   ├── AIReportGenerator.tsx # AI-powered report generation
│   └── CostEstimator.tsx     # AI-powered cost estimation
├── lib/
│   └── api.ts                # FastAPI client & type definitions
├── public/
│   ├── modern_office.jpg     # Hero background image
│   └── residential_building.jpg # Upload section background
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

## API Integration

### FastAPI ML Backend

The application integrates with a FastAPI backend for room type prediction:

**Endpoint**: `POST /predict`

**Request Body**:
```json
{
  "volume_m3": 150.0,
  "area_m2": 50.0,
  "total_heating_load_kw": 12.5
}
```

**Response**:
```json
{
  "Room_Type_No": 1,
  "input": {
    "volume_m3": 150.0,
    "area_m2": 50.0,
    "total_heating_load_kw": 12.5
  }
}
```

### AI Report Generation API

**Endpoint**: `POST /generate_report`

**Request** (multipart/form-data):
- `request`: JSON string with project details
- `room_book`: Excel file (optional)
- `cost_estimate`: Excel file (optional)
- `export_format`: "docx" or "markdown"

**Response**: Binary file (DOCX or Markdown)

The report generation typically takes 30-60 seconds as Claude AI generates each section intelligently.

### AI Cost Estimation API

**Endpoint**: `POST /estimate-costs`

**Request Body**:
```json
{
  "project_name": "Neubau Zentrale Muster GmbH",
  "location": "München, Bayern",
  "project_type": "office",
  "federal_state": "Bayern",
  "total_area_m2": 5000,
  "number_of_rooms": 150,
  "building_height_m": 18.5
}
```

**Response**:
```json
{
  "success": true,
  "project_name": "Neubau Zentrale Muster GmbH",
  "total_area_m2": 5000,
  "cost_estimation": {
    "kg_410": {
      "betrag": 500000,
      "pro_m2": 100,
      "beschreibung": "Sanitäranlagen mit modernen Armaturen..."
    },
    "kg_420": { "betrag": 750000, "pro_m2": 150, "beschreibung": "..." },
    "kg_430": { "betrag": 625000, "pro_m2": 125, "beschreibung": "..." },
    "kg_434": { "betrag": 400000, "pro_m2": 80, "beschreibung": "..." },
    "kg_440": { "betrag": 600000, "pro_m2": 120, "beschreibung": "..." },
    "kg_470": { "betrag": 150000, "pro_m2": 30, "beschreibung": "..." },
    "kg_480": { "betrag": 200000, "pro_m2": 40, "beschreibung": "..." },
    "gesamt_kg_400": {
      "betrag": 3225000,
      "pro_m2": 645
    },
    "genauigkeit": "±30% (Kostenschätzung nach LP2)",
    "hinweise": [
      "Kosten basieren auf mittlerem Standard",
      "Standort München berücksichtigt"
    ]
  },
  "generated_by": "AI",
  "disclaimer": "Kostenschätzung nach DIN 276, Genauigkeit ±30%, Stand LP2"
}
```

**Features**:
- 🎯 Intelligent cost calculation based on building type and location
- 📊 Detailed breakdown for all TGA cost groups (KG 410-480)
- 🏗️ Considers federal state (labor costs), building type, and area
- ⚡ Fast response time (5-10 seconds)
- 💡 AI-generated descriptions and recommendations

### File Processing Backend (Optional)

The frontend also supports a file processing endpoint at `/api/process` that:

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
- ✅ Added AI Cost Estimation
- ✅ Added modern office hero background
- ✅ Improved gradient styling for "AI-Powered" text
- ✅ Enhanced glassmorphism effects
- ✅ Dark Mode support with theme persistence
- ✅ Updated year references to 2025
- ✅ Integrated FastAPI ML backend for room type prediction
- ✅ AI Report Generation with HOAI compliance

## License

MIT License - Built for BKW Engineering x TUM.ai Hackathon 2025

## Support

For issues or questions, please open an issue on GitHub or contact the team.

---

**Built with ❤️ for the BKW Engineering x TUM.ai Hackathon 2025**

🔗 **Repository**: [https://github.com/Engineer1080/bkw-hackathon](https://github.com/Engineer1080/bkw-hackathon)