import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { X } from 'lucide-react'

const DashboardLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-dark-900">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 z-40"
                        />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
                        >
                            <div className="relative h-full">
                                <Sidebar />
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <Header onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout
