// Mock data for the OTT Subscription Tracker
export const subscriptions = [
    {
        id: 1,
        platform: 'Netflix',
        plan: 'Premium',
        price: 649,
        startDate: '2025-12-01',
        expiryDate: '2026-03-31',
        status: 'active',
        notes: 'Family plan shared with 4 members',
        icon: '🎬',
        color: '#E50914',
    },
    {
        id: 2,
        platform: 'Amazon Prime',
        plan: 'Annual',
        price: 1499,
        startDate: '2025-09-15',
        expiryDate: '2026-09-15',
        status: 'active',
        notes: 'Includes Prime delivery benefits',
        icon: '📦',
        color: '#00A8E1',
    },
    {
        id: 3,
        platform: 'Disney+ Hotstar',
        plan: 'Super',
        price: 899,
        startDate: '2025-11-01',
        expiryDate: '2026-03-10',
        status: 'expiring',
        notes: 'Sports + Entertainment bundle',
        icon: '🏰',
        color: '#113CCF',
    },
    {
        id: 4,
        platform: 'Spotify',
        plan: 'Premium Duo',
        price: 179,
        startDate: '2026-01-01',
        expiryDate: '2026-04-01',
        status: 'active',
        notes: 'Music streaming for 2',
        icon: '🎵',
        color: '#1DB954',
    },
    {
        id: 5,
        platform: 'YouTube Premium',
        plan: 'Family',
        price: 189,
        startDate: '2025-10-10',
        expiryDate: '2026-02-28',
        status: 'expired',
        notes: 'Ad-free + YouTube Music',
        icon: '▶️',
        color: '#FF0000',
    },
    {
        id: 6,
        platform: 'HBO Max',
        plan: 'Standard',
        price: 499,
        startDate: '2026-01-15',
        expiryDate: '2026-04-15',
        status: 'active',
        notes: 'HD streaming plan',
        icon: '🎭',
        color: '#B535F6',
    },
    {
        id: 7,
        platform: 'Apple TV+',
        plan: 'Monthly',
        price: 99,
        startDate: '2026-02-01',
        expiryDate: '2026-03-05',
        status: 'expiring',
        notes: 'Originals only',
        icon: '🍎',
        color: '#555555',
    },
    {
        id: 8,
        platform: 'JioCinema',
        plan: 'Premium',
        price: 999,
        startDate: '2025-06-01',
        expiryDate: '2026-01-31',
        status: 'expired',
        notes: 'IPL and Hollywood content',
        icon: '🏏',
        color: '#0A3D92',
    },
]

export const monthlySpending = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    data: [2180, 2680, 3012, 3012, 3114, 2465, 2815],
}

export const platformDistribution = {
    labels: ['Netflix', 'Amazon Prime', 'Disney+', 'Spotify', 'YouTube', 'HBO Max', 'Apple TV+', 'JioCinema'],
    data: [649, 1499, 899, 179, 189, 499, 99, 999],
    colors: ['#E50914', '#00A8E1', '#113CCF', '#1DB954', '#FF0000', '#B535F6', '#555555', '#0A3D92'],
}

export const getDaysLeft = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    return diff
}

export const getStatusFromDays = (daysLeft) => {
    if (daysLeft <= 0) return 'expired'
    if (daysLeft <= 15) return 'expiring'
    return 'active'
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
    }).format(amount)
}

export const stats = {
    totalSubscriptions: 8,
    expiringSoon: 2,
    totalMonthlySpend: 5013,
    expired: 2,
}
