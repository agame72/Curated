import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { UserStoreProvider } from './state/userStore.jsx'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Results from './pages/Results'
import Account from './pages/Account'

export default function App() {
  return (
    <UserStoreProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/app" element={<Results />} />
            <Route path="/account" element={<Account />} />
            <Route path="/results" element={<RedirectToApp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserStoreProvider>
  )
}

function RedirectToApp() {
  const location = useLocation()
  return <Navigate to={`/app${location.search || ''}`} replace />
}
