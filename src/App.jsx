import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { UserStoreProvider } from './state/userStore'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Results from './pages/Results'

export default function App() {
  return (
    <UserStoreProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </UserStoreProvider>
  )
}
