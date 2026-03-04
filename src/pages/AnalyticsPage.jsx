import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { getDaysLeft, formatCurrency } from '../data/mockData'
import { fetchSubscriptions } from '../utils/api'
import { TrendingUp, PieChart, CalendarClock, Loader2 } from 'lucide-react'

ChartJS.register(
    CategoryScale, LinearScale, BarElement, ArcElement,
    PointElement, LineElement, Title, Tooltip, Legend, Filler
)

// ─── Chart defaults ─────────────────────────────────
ChartJS.defaults.color = '#666'
ChartJS.defaults.borderColor = 'rgba(255,255,255,0.04)'
ChartJS.defaults.font.family = 'Inter'

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const AnalyticsPage = () => {
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchSubscriptions()
                setSubscriptions(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
        )
    }

    // --- Compute Platform Distribution ---
    const platformMap = {}
    subscriptions.forEach(sub => {
        if (!platformMap[sub.platform]) {
            platformMap[sub.platform] = { spend: 0, color: sub.color || '#FF2B2B' }
        }
        platformMap[sub.platform].spend += (sub.price || 0)
    })
    const platformDistribution = {
        labels: Object.keys(platformMap),
        data: Object.values(platformMap).map(p => p.spend),
        colors: Object.values(platformMap).map(p => p.color)
    }

    // --- Compute Expiry Data ---
    const expiringData = subscriptions
        .map((s) => ({ name: s.platform, days: getDaysLeft(s.expiryDate), icon: s.icon, color: s.color }))
        .sort((a, b) => a.days - b.days)

    // --- Dynamic Stats ---
    let totalMonthly = 0
    let highestSpend = { platform: 'None', price: 0 }
    let lowestSpend = { platform: 'None', price: Infinity }

    subscriptions.forEach(sub => {
        totalMonthly += (sub.price || 0)
        if (sub.price > highestSpend.price) highestSpend = { platform: sub.platform, price: sub.price }
        if (sub.price < lowestSpend.price) lowestSpend = { platform: sub.platform, price: sub.price }
    })
    if (lowestSpend.price === Infinity) lowestSpend.price = 0

    const nextExpiry = expiringData.find(d => d.days >= 0) || { name: 'None', days: 0 }


    // ─── Bar Chart – Monthly Spending (Mocked trend + current month actual) ───────────────────
    // For a real app, you would compute this from payment history, here we just show a trend ending in the current monthly spend
    const trendData = [totalMonthly * 0.8, totalMonthly * 0.9, totalMonthly * 1.1, totalMonthly * 0.95, totalMonthly * 1.05, totalMonthly * 0.9, totalMonthly]
    const barData = {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            {
                label: 'Spending (₹)',
                data: trendData.map(v => Math.round(v)),
                backgroundColor: (ctx) => {
                    const chart = ctx.chart
                    const { ctx: c, chartArea } = chart
                    if (!chartArea) return '#FF2B2B'
                    const gradient = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
                    gradient.addColorStop(0, 'rgba(255, 43, 43, 0.15)')
                    gradient.addColorStop(1, 'rgba(255, 43, 43, 0.7)')
                    return gradient
                },
                borderRadius: 6,
                borderSkipped: false,
                barThickness: 28,
            },
        ],
    }

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1A1A1A',
                borderColor: 'rgba(255, 43, 43, 0.3)',
                borderWidth: 1,
                titleFont: { weight: 600 },
                padding: 12,
                cornerRadius: 8,
                callbacks: { label: (ctx) => `  ₹${ctx.raw.toLocaleString()}` },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 11, weight: 500 } },
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)' },
                ticks: {
                    font: { size: 11 },
                    callback: (v) => `₹${(v / 1000).toFixed(1)}k`,
                },
            },
        },
    }

    // ─── Doughnut – Platform Distribution ───────────────
    const doughnutData = {
        labels: platformDistribution.labels,
        datasets: [
            {
                data: platformDistribution.data,
                backgroundColor: platformDistribution.colors.map((c) => (c || '#FF2B2B') + 'CC'),
                borderColor: '#0A0A0A',
                borderWidth: 3,
                hoverOffset: 8,
            },
        ],
    }

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 16,
                    usePointStyle: true,
                    pointStyleWidth: 8,
                    font: { size: 11, weight: 500 },
                },
            },
            tooltip: {
                backgroundColor: '#1A1A1A',
                borderColor: 'rgba(255, 43, 43, 0.3)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                callbacks: { label: (ctx) => `  ₹${ctx.raw.toLocaleString()}` },
            },
        },
    }

    // ─── Line Chart – Expiry Timeline ───────────────────
    const lineData = {
        labels: expiringData.map((d) => d.name),
        datasets: [
            {
                label: 'Days until expiry',
                data: expiringData.map((d) => Math.max(d.days, 0)),
                borderColor: '#FF2B2B',
                backgroundColor: 'rgba(255, 43, 43, 0.08)',
                pointBackgroundColor: expiringData.map((d) => d.color || '#FF2B2B'),
                pointBorderColor: '#0A0A0A',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 9,
                tension: 0.4,
                fill: true,
            },
        ],
    }

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1A1A1A',
                borderColor: 'rgba(255, 43, 43, 0.3)',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                callbacks: { label: (ctx) => `  ${ctx.raw} days remaining` },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, weight: 500 }, maxRotation: 45 },
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.03)' },
                ticks: {
                    font: { size: 11 },
                    callback: (v) => `${v}d`,
                },
                beginAtZero: true,
            },
        },
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Title */}
            <motion.div variants={item}>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Insights into your subscription spending and status
                </p>
            </motion.div>

            {/* Top Row: Bar + Doughnut */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Monthly Spending */}
                <motion.div variants={item} className="cyber-card lg:col-span-3">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="p-2 rounded-lg bg-accent/10">
                            <TrendingUp className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Monthly OTT Spending</h3>
                            <p className="text-[11px] text-gray-500">Last 7 months (Projected)</p>
                        </div>
                    </div>
                    <div className="h-64">
                        {subscriptions.length > 0 ? (
                            <Bar data={barData} options={barOptions} />
                        ) : (
                            <p className="text-sm text-gray-500 text-center mt-20">No data available.</p>
                        )}
                    </div>
                </motion.div>

                {/* Platform Distribution */}
                <motion.div variants={item} className="cyber-card lg:col-span-2">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="p-2 rounded-lg bg-accent/10">
                            <PieChart className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Platform Distribution</h3>
                            <p className="text-[11px] text-gray-500">Spending by platform</p>
                        </div>
                    </div>
                    <div className="h-64">
                        {subscriptions.length > 0 ? (
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        ) : (
                            <p className="text-sm text-gray-500 text-center mt-20">No data available.</p>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Expiry Timeline */}
            <motion.div variants={item} className="cyber-card">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-2 rounded-lg bg-accent/10">
                        <CalendarClock className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold">Subscription Expiry Timeline</h3>
                        <p className="text-[11px] text-gray-500">Days remaining for each platform</p>
                    </div>
                </div>
                <div className="h-64">
                    {subscriptions.length > 0 ? (
                        <Line data={lineData} options={lineOptions} />
                    ) : (
                        <p className="text-sm text-gray-500 text-center mt-20">No data available.</p>
                    )}
                </div>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Highest Spend', value: highestSpend.platform, sub: formatCurrency(highestSpend.price) },
                    { label: 'Lowest Spend', value: lowestSpend.platform, sub: formatCurrency(lowestSpend.price) },
                    { label: 'Next Expiry', value: nextExpiry.name, sub: `In ${nextExpiry.days} days` },
                    { label: 'Total Value', value: formatCurrency(totalMonthly), sub: 'Active plans' },
                ].map((s) => (
                    <div key={s.label} className="cyber-card text-center py-5">
                        <p className="text-[11px] text-gray-500 font-medium mb-1">{s.label}</p>
                        <p className="text-base font-bold">{s.value}</p>
                        <p className="text-[11px] text-accent mt-1">{s.sub}</p>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default AnalyticsPage
