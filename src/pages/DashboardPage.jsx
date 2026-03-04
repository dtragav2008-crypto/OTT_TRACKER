import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getDaysLeft, formatCurrency, getStatusFromDays } from '../data/mockData'
import { fetchSubscriptions } from '../utils/api'
import {
    TrendingUp,
    AlertTriangle,
    CreditCard,
    ListVideo,
    ArrowUpRight,
    ChevronRight,
    Loader2
} from 'lucide-react'

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
}
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const StatusBadge = ({ status }) => {
    const cls =
        status === 'active'
            ? 'badge-active'
            : status === 'expiring'
                ? 'badge-expiring'
                : 'badge-expired'
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cls}`}>
            {status === 'active' ? '● Active' : status === 'expiring' ? '⚠ Expiring' : '✕ Expired'}
        </span>
    )
}

const DashboardPage = () => {
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSubscriptions()
                setSubscriptions(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    const totalSubscriptions = subscriptions.length
    const expiringSoon = subscriptions.filter(s => {
        const d = getDaysLeft(s.expiryDate)
        return d > 0 && d <= 15
    }).length
    const totalSpend = subscriptions.reduce((acc, sub) => acc + (sub.price || 0), 0)

    const statCards = [
        {
            title: 'Total Subscriptions',
            value: totalSubscriptions,
            icon: ListVideo,
            change: '+2 this month',
            color: 'from-accent/20 to-accent/5',
            iconBg: 'bg-accent/15',
        },
        {
            title: 'Expiring Soon',
            value: expiringSoon,
            icon: AlertTriangle,
            change: 'Within 15 days',
            color: 'from-yellow-500/20 to-yellow-500/5',
            iconBg: 'bg-yellow-500/15',
            textColor: 'text-yellow-400',
        },
        {
            title: 'Total Spend Value',
            value: formatCurrency(totalSpend),
            icon: CreditCard,
            change: 'Overall active plans',
            color: 'from-green-500/20 to-green-500/5',
            iconBg: 'bg-green-500/15',
            textColor: 'text-green-400',
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
        )
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Page Title */}
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Overview of your active subscriptions</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Last updated: just now
                </div>
            </motion.div>

            {/* Stat Cards */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.title}
                            className="cyber-card group relative overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="relative flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-medium mb-1">{stat.title}</p>
                                    <p className={`text-2xl font-bold ${stat.textColor || 'text-white'}`}>{stat.value}</p>
                                    <p className="text-[11px] text-gray-600 mt-2 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" />
                                        {stat.change}
                                    </p>
                                </div>
                                <div className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                                    <Icon className={`w-5 h-5 ${stat.textColor || 'text-accent'}`} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </motion.div>

            {/* Subscription Table */}
            <motion.div variants={item} className="cyber-card overflow-hidden p-0">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <div>
                        <h2 className="text-base font-semibold">Active Subscriptions</h2>
                        <p className="text-xs text-gray-500 mt-0.5">All your OTT platform subscriptions</p>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Platform</th>
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Plan</th>
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Price</th>
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Expiry Date</th>
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Days Left</th>
                                <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-sm">
                                        No active subscriptions found.
                                    </td>
                                </tr>
                            )}
                            {subscriptions.map((sub, idx) => {
                                const daysLeft = getDaysLeft(sub.expiryDate)
                                const status = getStatusFromDays(daysLeft)
                                return (
                                    <motion.tr
                                        key={sub._id || idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                                                    style={{ backgroundColor: `${sub.color || '#FF2B2B'}20` }}
                                                >
                                                    {sub.icon || '📺'}
                                                </div>
                                                <span className="font-medium text-sm">{sub.platform}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-400">{sub.plan}</td>
                                        <td className="px-4 py-4 text-sm font-medium">{formatCurrency(sub.price)}</td>
                                        <td className="px-4 py-4 text-sm text-gray-400">
                                            {new Date(sub.expiryDate).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`text-sm font-semibold ${daysLeft <= 0 ? 'text-red-400' : daysLeft <= 15 ? 'text-yellow-400' : 'text-green-400'
                                                }`}>
                                                {daysLeft <= 0 ? 'Expired' : `${daysLeft} days`}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusBadge status={status} />
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-white/5">
                    {subscriptions.length === 0 && (
                        <div className="p-6 text-center text-sm text-gray-500">
                            No active subscriptions found.
                        </div>
                    )}
                    {subscriptions.map((sub, idx) => {
                        const daysLeft = getDaysLeft(sub.expiryDate)
                        const status = getStatusFromDays(daysLeft)
                        return (
                            <div key={sub._id || idx} className="px-5 py-4 flex items-center gap-4">
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                    style={{ backgroundColor: `${sub.color || '#FF2B2B'}20` }}
                                >
                                    {sub.icon || '📺'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm truncate">{sub.platform}</p>
                                    <p className="text-xs text-gray-500">{sub.plan} · {formatCurrency(sub.price)}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <StatusBadge status={status} />
                                    <p className={`text-[11px] font-medium mt-1 ${daysLeft <= 0 ? 'text-red-400' : daysLeft <= 15 ? 'text-yellow-400' : 'text-gray-500'
                                        }`}>
                                        {daysLeft <= 0 ? 'Expired' : `${daysLeft}d left`}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default DashboardPage
