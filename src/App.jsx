import "./i18n/i18n";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Section from "./components/Section";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main className="px-6 md:px-10 lg:px-12 max-w-[1200px] mx-auto">
        <Section id="home">
          <Home />
        </Section>

        <Section id="about">
          <About />
        </Section>

        <Section id="experience">
          <Experience />
        </Section>

        <Section id="projects">
          <Projects />
        </Section>

        <Section id="contact">
          <Contact />
        </Section>
      </main>

      <Footer />
    </>
  );
}

export default App;
