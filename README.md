# ATM MERN Project

## Local setup

### Backend
1. Copy `backend/.env.example` to `backend/.env`
2. Set `MONGO_URI` and `MONGO_DBNAME`
3. Run:
   - `cd backend`
   - `npm install`
   - `npm start`

### Frontend
1. Copy `frontend/.env.example` to `frontend/.env` if using a custom API URL
2. Run:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## Vercel deployment

### Recommended setup
1. Connect the repository to Vercel.
2. Set root folder to the project root.
3. Add environment variables in Vercel:
   - `MONGO_URI`
   - `MONGO_DBNAME`
   - `VITE_API_URL` (for the deployed frontend, set to your app URL + `/api/atm`)

### Vercel configuration
- `vercel.json` already routes `/api/*` to `backend/index.js`.
- The frontend uses Vite and builds from `frontend/package.json`.

### Notes
- Do not commit `.env` files.
- If production frontend needs the backend URL, set `VITE_API_URL` in Vercel.
