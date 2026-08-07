import CinematicBackground from '../../components/CinematicBackground/CinematicBackground'
import NavBar from '../../components/NavBar/NavBar'
import About from './sections/About/About'
import Baseboard from './sections/Baseboard/Baseboard'
import Hero from './sections/Hero/Hero'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'

const Home = () => (
  <>
    <CinematicBackground />
    <NavBar />
    <main>
      <Hero />
      <Skills />
      <About />
      <Projects />
    </main>
    <Baseboard />
  </>
)

export default Home
