import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Analysis from './components/Analysis'
import Footer from './components/Footer'
import BackgroundLayer from './components/BackgroundLayer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundLayer />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Timeline />
          <Analysis />
        </main>
        <Footer />
      </div>
    </div>
  )
}
