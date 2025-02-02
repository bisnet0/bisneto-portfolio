import NavBar from "../../components/NavBar/NavBar"
import About from "./sections/About/About"
import Baseboard from "./sections/Baseboard/Baseboard"
import Hero from "./sections/Hero/Hero"
import Projects from "./sections/Projects/Projects"
import Skills from "./sections/Skills/Skills"

const Home = () =>{

  
    return (
      <>
        <NavBar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Baseboard />
      </>
    )
    
  }
  
  export default Home
  