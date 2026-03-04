import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load .env from the root directory
dotenv.config()

import subscriptionRoutes from './routes/subscriptions.js'

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ──────────────────────────────────────
// Allow requests from all origins (Netlify etc.)
app.use(cors({ origin: '*' }))
app.use(express.json())

// ─── Routes ─────────────────────────────────────────
app.use('/api/subscriptions', subscriptionRoutes)

app.get('/api/health', (req, res) => {
    // If DB is not connected, return 503 Service Unavailable so health checks fail gracefully
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    res.status(dbStatus === 'connected' ? 200 : 503).json({
        status: dbStatus === 'connected' ? 'ok' : 'error',
        db: dbStatus,
        message: dbStatus === 'disconnected' ? 'Ensure MONGODB_URI is set in Render Environment Variables' : '',
        timestamp: new Date().toISOString(),
    })
})

// ─── Boot Server & MongoDB ──────────────────────────
// Start Express first so Render sees the port open and doesn't crash on DB timeout
app.listen(PORT, () => {
    console.log(`🚀 OTT Tracker API running on port ${PORT}`)

    // Connect to DB asynchronously after starting server
    if (process.env.MONGODB_URI) {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log('✅ Connected to MongoDB Atlas'))
            .catch(err => console.error('❌ MongoDB connection error:', err.message))
    } else {
        console.error('❌ FATAL: MONGODB_URI environment variable is missing!')
    }
})
