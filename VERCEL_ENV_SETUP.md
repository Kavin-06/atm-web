# VERCEL ENVIRONMENT SETUP

## To fix the "server error" issue, add these environment variables to Vercel:

### Option 1: Via Vercel Dashboard (easiest)
1. Go to: https://vercel.com/kavin-06s-projects/atm/settings/environment-variables
2. Click "Add New" and set each variable for "Production":
   - Key: MONGO_URI
     Value: mongodb+srv://kavinprasanth0696_db_user:oEjCblmgO6t0k6tK@cluster0.38fcvgi.mongodb.net/mernatm?appName=Cluster0
   
   - Key: MONGO_DBNAME
     Value: mernatm

3. After adding, redeploy the project

### Option 2: Via Vercel CLI (if you can interact with the terminal)
```bash
cd /home/kavin/Desktop/mern\ stack/atm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 20

# Select "Production" environment when prompted
vercel env add MONGO_URI

# Then select "Production" environment when prompted
vercel env add MONGO_DBNAME

# Redeploy
vercel --prod
```

## Current Deployment Status:
- Frontend: Deployed with API URL configured ✓
- Backend: API routes ready ✓
- MongoDB: Need to set environment variables (PENDING)

Once you add the env vars in Vercel, the app should work!
