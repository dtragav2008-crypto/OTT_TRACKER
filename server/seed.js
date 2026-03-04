import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import Subscription from './models/Subscription.js'
import dns from 'dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '.env') })

const seedData = [
    {
        platform: 'Netflix',
        plan: 'Premium',
        price: 649,
        startDate: '2025-12-01',
        expiryDate: '2026-03-31',
        notes: 'Family plan shared with 4 members',
        icon: '🎬',
        color: '#E50914',
    },
    {
        platform: 'Amazon Prime',
        plan: 'Annual',
        price: 1499,
        startDate: '2025-09-15',
        expiryDate: '2026-09-15',
        notes: 'Includes Prime delivery benefits',
        icon: '📦',
        color: '#00A8E1',
    },
    {
        platform: 'Disney+ Hotstar',
        plan: 'Super',
        price: 899,
        startDate: '2025-11-01',
        expiryDate: '2026-03-10',
        notes: 'Sports + Entertainment bundle',
        icon: '🏰',
        color: '#113CCF',
    },
    {
        platform: 'Spotify',
        plan: 'Premium Duo',
        price: 179,
        startDate: '2026-01-01',
        expiryDate: '2026-04-01',
        notes: 'Music streaming for 2',
        icon: '🎵',
        color: '#1DB954',
    },
    {
        platform: 'YouTube Premium',
        plan: 'Family',
        price: 189,
        startDate: '2025-10-10',
        expiryDate: '2026-02-28',
        notes: 'Ad-free + YouTube Music',
        icon: '▶️',
        color: '#FF0000',
    },
    {
        platform: 'HBO Max',
        plan: 'Standard',
        price: 499,
        startDate: '2026-01-15',
        expiryDate: '2026-04-15',
        notes: 'HD streaming plan',
        icon: '🎭',
        color: '#B535F6',
    },
    {
        platform: 'Apple TV+',
        plan: 'Monthly',
        price: 99,
        startDate: '2026-02-01',
        expiryDate: '2026-03-05',
        notes: 'Originals only',
        icon: '🍎',
        color: '#555555',
    },
    {
        platform: 'JioCinema',
        plan: 'Premium',
        price: 999,
        startDate: '2025-06-01',
        expiryDate: '2026-01-31',
        notes: 'IPL and Hollywood content',
        icon: '🏏',
        color: '#0A3D92',
    },
]

const seedDB = async () => {
    try {
        console.log('🔄 Connecting to MongoDB Atlas...')
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('✅ Connected to MongoDB Atlas')

        // Clear existing data
        await Subscription.deleteMany({})
        console.log('🗑️  Cleared existing subscriptions')

        // Insert seed data
        const inserted = await Subscription.insertMany(seedData)
        console.log(`✅ Seeded ${inserted.length} subscriptions successfully!`)

        inserted.forEach((sub) => {
            console.log(`   • ${sub.platform} (${sub.plan}) — ₹${sub.price}`)
        })

        await mongoose.connection.close()
        console.log('🔌 Database connection closed')
        process.exit(0)
    } catch (err) {
        console.error('❌ Seed error:', err.message)
        process.exit(1)
    }
}

seedDB()
