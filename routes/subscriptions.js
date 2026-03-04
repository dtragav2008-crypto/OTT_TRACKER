import express from 'express'
import Subscription from '../models/Subscription.js'

const router = express.Router()

// GET all subscriptions
router.get('/', async (req, res) => {
    try {
        const subs = await Subscription.find().sort({ expiryDate: 1 })
        res.json(subs)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET single subscription
router.get('/:id', async (req, res) => {
    try {
        const sub = await Subscription.findById(req.params.id)
        if (!sub) return res.status(404).json({ error: 'Subscription not found' })
        res.json(sub)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST new subscription
router.post('/', async (req, res) => {
    try {
        const sub = new Subscription(req.body)
        const saved = await sub.save()
        res.status(201).json(saved)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// PUT update subscription
router.put('/:id', async (req, res) => {
    try {
        const sub = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!sub) return res.status(404).json({ error: 'Subscription not found' })
        res.json(sub)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// DELETE subscription
router.delete('/:id', async (req, res) => {
    try {
        const sub = await Subscription.findByIdAndDelete(req.params.id)
        if (!sub) return res.status(404).json({ error: 'Subscription not found' })
        res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router
