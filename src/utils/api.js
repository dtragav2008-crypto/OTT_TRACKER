export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const fetchSubscriptions = async () => {
    try {
        const res = await fetch(`${API_BASE_URL}/subscriptions`)
        if (!res.ok) throw new Error('Failed to fetch subscriptions')
        return res.json()
    } catch (err) {
        console.error(err)
        return []
    }
}

export const createSubscription = async (data) => {
    const res = await fetch(`${API_BASE_URL}/subscriptions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create subscription')
    return res.json()
}
