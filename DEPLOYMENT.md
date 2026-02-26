# DairyDrop Deployment Guide

## Quick Deployment with Railway

### Prerequisites
- GitHub account
- Railway account (https://railway.app)

### Step 1: Deploy Backend Server

1. Go to https://railway.app and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `DairyDropCS519` repository
4. Railway will auto-detect it's a Node.js project
5. Set environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://sahirullah313_db_user:Sahirullah%2A.1@cluster0.7s6z2rb.mongodb.net/dairy_drop
   JWT_SECRET=your_secure_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=dq6wg9x5d
   CLOUDINARY_API_KEY=778659712236579
   CLOUDINARY_API_SECRET=ffX_uosfFhDRAs6dzE_qtsaaFig
   ADMIN_EMAIL=admin@gmail.com
   ADMIN_PASSWORD=admin123
   ```
6. Click "Deploy"
7. Copy the generated URL (e.g., `https://dairydrop-production.railway.app`)

### Step 2: Deploy Frontend (Client)

1. Update `client/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
   (Replace with your actual backend URL from Step 1)

2. Go to Vercel (https://vercel.com) and sign in with GitHub
3. Click "New Project" → Import `DairyDropCS519` repository
4. Set root directory to `client`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
6. Click "Deploy"

### Step 3: Update GitHub

Push the deployment files:
```bash
git add .
git commit -m "Add deployment configuration files"
git push origin master
```

### Live URLs
- **Frontend**: https://your-vercel-url.vercel.app
- **Backend API**: https://your-railway-url.railway.app
- **API Docs**: https://your-railway-url.railway.app/api

## Alternative: Deploy Both on Railway

If you prefer to deploy both on Railway:

1. Create a root `package.json` that manages both:
```json
{
  "name": "dairydrop",
  "scripts": {
    "install-all": "npm install && cd client && npm install && cd ../server && npm install",
    "build": "cd client && npm run build",
    "start": "cd server && npm start"
  }
}
```

2. Set `Procfile` to: `web: npm start`

## Environment Variables Needed

### Server (.env)
- `NODE_ENV`: production
- `PORT`: 5000
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secure random string
- `CLOUDINARY_*`: Your Cloudinary credentials

### Client (.env.production)
- `REACT_APP_API_URL`: Your backend API URL

## Troubleshooting

**CORS Issues**: Make sure server has CORS enabled for your frontend domain
**API Connection**: Verify `REACT_APP_API_URL` matches your backend URL
**Database**: Ensure MongoDB connection string is correct

## Support
For more help, visit:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
