import "./i18n/i18n"
import Navbar from "./components/Navbar"
import Home from "./sections/Home"
import Section from "./components/Section"

function App() {


  return (
    <>
      <Navbar />

      <main>
        <Section id="home">
          <Home />
        </Section>

        <Section id="about">
          <section className="flex items-center justify-center">
            About
          </section>
        </Section>

        <Section id="projects">
          <section className="flex items-center justify-center">
            Projects
          </section>
        </Section>
      </main>
    </>
  )
}

export default App
