import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    ListVideo,
    PlusCircle,
    BarChart3,
    Settings,
    Zap,
} from 'lucide-react'

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/dashboard', icon: ListVideo, label: 'Subscriptions', end: true },
    { to: '/dashboard/add', icon: PlusCircle, label: 'Add Subscription' },
    { to: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '#', icon: Settings, label: 'Settings' },
]

const Sidebar = () => {
    const location = useLocation()

    return (
        <motion.aside
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hidden lg:flex flex-col w-64 min-h-screen glass-strong border-r border-red-900/20 z-20"
        >
            {/* Brand */}
            <div className="flex items-center gap-3 px-6 py-6 border-b border-red-900/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-glow">
                    <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-base font-bold tracking-tight">OTT Tracker</h1>
                    <p className="text-[11px] text-gray-500 font-medium">Subscription Manager</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-3">
                    Menu
                </p>
                {navItems.map((item) => {
                    const isActive =
                        item.to === '/dashboard'
                            ? location.pathname === '/dashboard'
                            : location.pathname === item.to
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={`sidebar-link ${isActive ? 'active' : ''}`}
                        >
                            <Icon className="w-[18px] h-[18px]" />
                            <span>{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-glow-sm"
                                />
                            )}
                        </NavLink>
                    )
                })}
            </nav>

            {/* Bottom Card */}
            <div className="px-4 pb-6">
                <div className="cyber-card p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Go Premium</p>
                    <p className="text-[11px] text-gray-500 mb-3">Unlock advanced analytics & alerts</p>
                    <button className="cyber-btn w-full text-xs py-2">Upgrade</button>
                </div>
            </div>
        </motion.aside>
    )
}

export default Sidebar
