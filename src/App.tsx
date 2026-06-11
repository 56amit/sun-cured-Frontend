import React from 'react'
import { Navbar } from './pages/Navbar'
import { Hero } from './pages/Hero'
import { WhyUs } from './pages/WhyUs'
import { Products } from './pages/Products'
import { Benefits } from './pages/Benefits'
import { Process } from './pages/Process'
import { Testimonials } from './pages/Testimonials'
import { Footer } from './pages/Footer'

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
    </div>
  )
}
