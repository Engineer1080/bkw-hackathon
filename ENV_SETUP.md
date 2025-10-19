# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# API Configuration
# URL of the FastAPI backend for room type prediction
# Local development: http://localhost:8000
# Production: https://your-fastapi-service.railway.app
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Optional Variables

```bash
# Optional: Additional API endpoints for file processing
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api/process
```

## Development Setup

1. Copy the example above to `.env.local`
2. Update `NEXT_PUBLIC_API_URL` to point to your FastAPI service
3. Restart your Next.js development server

## Production Setup

### Railway Deployment

Add the environment variable in your Railway dashboard:
- Key: `NEXT_PUBLIC_API_URL`
- Value: `https://your-fastapi-service.railway.app`

### Vercel Deployment

Add the environment variable in your Vercel project settings:
- Key: `NEXT_PUBLIC_API_URL`
- Value: `https://your-fastapi-service.railway.app`

## Testing the API Connection

The application will automatically use the configured API URL. You can test the connection by:

1. Starting your FastAPI backend
2. Starting your Next.js frontend
3. Navigating to the "Quick Prediction" section
4. Entering room parameters and submitting

If the API is not reachable, you will see an error message.

