import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PolygonBackground from '../components/PolygonBackground'
import { Zap, Bell, BarChart3, Shield, ArrowRight, ChevronRight } from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: 'Track Subscriptions',
        desc: 'Monitor all your OTT platforms in one sleek dashboard. Never lose track of active services.',
    },
    {
        icon: Bell,
        title: 'Expiry Alerts',
        desc: 'Get notified before your subscriptions expire. Stay ahead with smart reminders.',
    },
    {
        icon: BarChart3,
        title: 'Spending Analytics',
        desc: 'Visualize your monthly spending patterns with beautiful, interactive charts.',
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen bg-dark-900 overflow-hidden">
            <PolygonBackground />

            {/* Nav */}
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5"
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-glow">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">OTT Tracker</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/auth')}
                        className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        className="cyber-btn text-xs py-2 px-5"
                    >
                        Sign Up
                    </button>
                </div>
            </motion.nav>

            {/* Hero */}
            <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24 md:pt-24 md:pb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-accent border border-accent/20">
                        <Shield className="w-3.5 h-3.5" />
                        Smart Subscription Management
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight max-w-4xl mb-6"
                >
                    Track Your OTT{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light glow-text">
                        Subscriptions
                    </span>{' '}
                    Smartly
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-base md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed"
                >
                    Monitor Netflix, Amazon Prime, Disney+, and more — all in one beautiful dashboard.
                    Never miss an expiry date again.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="cyber-btn text-sm py-3.5 px-8 flex items-center gap-2 group"
                    >
                        Start Tracking
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-8 py-3.5 rounded-md text-sm font-semibold border border-white/10 text-gray-300 hover:border-accent/40 hover:text-white hover:bg-white/5 transition-all"
                    >
                        Learn More
                    </button>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="grid grid-cols-3 gap-8 md:gap-16 mt-16 md:mt-24"
                >
                    {[
                        ['10K+', 'Active Users'],
                        ['50K+', 'Subscriptions Tracked'],
                        ['99.9%', 'Uptime'],
                    ].map(([value, label]) => (
                        <div key={label} className="text-center">
                            <p className="text-2xl md:text-3xl font-bold text-accent">{value}</p>
                            <p className="text-xs md:text-sm text-gray-500 mt-1">{label}</p>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Features */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 pb-24">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                >
                    {features.map((feat) => {
                        const Icon = feat.icon
                        return (
                            <motion.div key={feat.title} variants={item} className="cyber-card group cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                                    <Icon className="w-5 h-5 text-accent" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed mb-4">{feat.desc}</p>
                                <span className="inline-flex items-center text-xs text-accent font-medium group-hover:gap-2 transition-all">
                                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-red-900/10 py-8 px-6 text-center">
                <p className="text-xs text-gray-600">
                    © 2026 OTT Tracker. Built with ❤️ for smart subscribers.
                </p>
            </footer>
        </div>
    )
}

export default LandingPage
