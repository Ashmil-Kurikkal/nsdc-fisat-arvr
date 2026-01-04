import React from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from './Hero'
import About from './sections/About'
import Staff from './sections/Staff'
import SequentialVideoLoop from '../../components/ui/utils/SequentialVideoLoop'
import Events from './sections/Events'
import { useState } from 'react'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const Home = () => {
  const navigate = useNavigate()
  const videos = [
    "./visionpro.mp4",
    "./editgear.mp4"
  ];
  const videoproduct=[
    "Apple Vision Pro",
    "TourBox Editing Gear"
  ]

  const [hideNav, setHideNav] = useState(false);

  return (
    <div>
      <Hero hideNav={hideNav} />

      <SequentialVideoLoop videoSources={videos} product={videoproduct} />

      <div className="relative z-10 pb-20 bg-gradient-to-b from-transparent via-[#f0f2f5] to-[#e6e8eb]">
        
        {/* Added IDs for Navigation Scrolling */}
        <section id="about">
          <About />
        </section>

        <section id="events">
          <Events setHideNav={setHideNav} />
        </section>

        <section id="staff">
          <Staff />
        </section>

        <section id="contact">
          <Contact />
        </section>

        
      </div>
      <Footer />
    </div>
  )
}

export default Home