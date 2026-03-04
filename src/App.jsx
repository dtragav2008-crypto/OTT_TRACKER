import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import AddSubscriptionPage from './pages/AddSubscriptionPage'
import AnalyticsPage from './pages/AnalyticsPage'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/dashboard/add" element={<AddSubscriptionPage />} />
                    <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
