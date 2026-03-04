import { motion } from 'framer-motion'
import { Search, Bell, User, Menu } from 'lucide-react'
import { useState } from 'react'

const Header = ({ onMenuToggle }) => {
    const [searchFocused, setSearchFocused] = useState(false)

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="sticky top-0 z-30 glass-strong border-b border-red-900/10 px-6 py-3"
        >
            <div className="flex items-center justify-between gap-4">
                {/* Mobile menu button */}
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Search */}
                <div className="flex-1 max-w-md relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchFocused ? 'text-accent' : 'text-gray-500'}`} />
                    <input
                        type="text"
                        placeholder="Search subscriptions..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="cyber-input pl-10 py-2.5 text-sm"
                    />
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Notifications */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2.5 rounded-xl glass hover:border-accent/30 transition-all"
                    >
                        <Bell className="w-[18px] h-[18px] text-gray-400" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </motion.button>

                    {/* Profile */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl glass hover:border-accent/30 transition-all"
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="hidden sm:block text-left">
                            <p className="text-sm font-semibold leading-tight">John Doe</p>
                            <p className="text-[11px] text-gray-500">Premium</p>
                        </div>
                    </motion.button>
                </div>
            </div>
        </motion.header>
    )
}

export default Header
