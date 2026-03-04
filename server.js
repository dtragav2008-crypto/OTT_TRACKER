import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

// Load .env from the root directory
dotenv.config()

import subscriptionRoutes from './routes/subscriptions.js'

const app = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ──────────────────────────────────────
app.use(cors())
app.use(express.json())

// ─── Routes ─────────────────────────────────────────
app.use('/api/subscriptions', subscriptionRoutes)

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
    })
})

// ─── MongoDB Connection ─────────────────────────────
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Connected to MongoDB Atlas')
        app.listen(PORT, () => {
            console.log(`🚀 OTT Tracker API running on http://localhost:${PORT}`)
        })
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message)
        process.exit(1)
    }
}

connectDB()
