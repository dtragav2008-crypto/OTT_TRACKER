import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
    Tv,
    CreditCard,
    Calendar,
    FileText,
    Tag,
    ArrowLeft,
    Check,
    ChevronDown,
} from 'lucide-react'

const platforms = [
    { name: 'Netflix', icon: '🎬', color: '#E50914' },
    { name: 'Amazon Prime', icon: '📦', color: '#00A8E1' },
    { name: 'Disney+ Hotstar', icon: '🏰', color: '#113CCF' },
    { name: 'Spotify', icon: '🎵', color: '#1DB954' },
    { name: 'YouTube Premium', icon: '▶️', color: '#FF0000' },
    { name: 'HBO Max', icon: '🎭', color: '#B535F6' },
    { name: 'Apple TV+', icon: '🍎', color: '#555' },
    { name: 'JioCinema', icon: '🏏', color: '#0A3D92' },
    { name: 'Other', icon: '📺', color: '#FF2B2B' },
]

const planTypes = ['Basic', 'Standard', 'Premium', 'Family', 'Annual', 'Monthly', 'Duo']

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
}
const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const AddSubscriptionPage = () => {
    const navigate = useNavigate()
    const [selectedPlatform, setSelectedPlatform] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => navigate('/dashboard'), 1500)
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-500/15 border-2 border-green-500/30 flex items-center justify-center mb-6"
                >
                    <Check className="w-9 h-9 text-green-400" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Subscription Added!</h2>
                <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
            </motion.div>
        )
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-2xl mx-auto space-y-6"
        >
            {/* Back + Title */}
            <motion.div variants={item} className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 rounded-lg glass hover:border-accent/30 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Add Subscription</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Add a new OTT platform subscription</p>
                </div>
            </motion.div>

            {/* Platform Selector */}
            <motion.div variants={item} className="cyber-card">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Select Platform
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    {platforms.map((p) => (
                        <motion.button
                            key={p.name}
                            type="button"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setSelectedPlatform(p)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${selectedPlatform?.name === p.name
                                    ? 'border-accent/50 bg-accent/10 shadow-glow-sm'
                                    : 'border-white/5 hover:border-white/10 bg-dark-700/50'
                                }`}
                        >
                            <span className="text-xl">{p.icon}</span>
                            <span className="text-[11px] font-medium text-gray-300 truncate w-full text-center">
                                {p.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Form */}
            <motion.form variants={item} onSubmit={handleSubmit} className="cyber-card space-y-5">
                <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-accent" />
                    Subscription Details
                </h3>

                {/* Platform Name (if custom) */}
                {selectedPlatform?.name === 'Other' && (
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Platform Name</label>
                        <div className="relative">
                            <Tv className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input
                                type="text"
                                placeholder="Enter platform name"
                                className="cyber-input pl-10"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Plan Type */}
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Plan Type</label>
                    <div className="relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <select className="cyber-input pl-10 pr-10 appearance-none cursor-pointer">
                            <option value="">Select plan</option>
                            {planTypes.map((p) => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Price (₹)</label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                            type="number"
                            placeholder="499"
                            min="0"
                            className="cyber-input pl-10"
                            required
                        />
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Start Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input
                                type="date"
                                className="cyber-input pl-10"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5">Expiry Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                            <input
                                type="date"
                                className="cyber-input pl-10"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Notes (optional)</label>
                    <textarea
                        placeholder="Any additional notes about this subscription..."
                        rows={3}
                        className="cyber-input resize-none"
                    />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-3 pt-2">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="cyber-btn flex-1 py-3"
                    >
                        Add Subscription
                    </motion.button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 rounded-lg text-sm font-medium border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </motion.form>
        </motion.div>
    )
}

export default AddSubscriptionPage
