
import { Navbar } from './pages/Navbar'
import { Hero } from './pages/Hero'
import { WhyUs } from './pages/WhyUs'
import { Products } from './pages/Products'
import { Benefits } from './pages/Benefits'
import { Process } from './pages/Process'
import { Testimonials } from './pages/Testimonials'
import { Footer } from './pages/Footer'
import { CartDrawer } from './pages/CartDrawer'
import { CheckoutModal } from './pages/CheckoutModal'
import { AuthModal } from './pages/AuthModal'
import { UserProfileModal } from './pages/UserProfileModal'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Products />
        <Benefits />
        <Process />
        <Testimonials />
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <UserProfileModal />
      <Toaster position="top-center" richColors />
    </div>
  )
}
