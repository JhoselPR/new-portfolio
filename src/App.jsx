import "./i18n/i18n";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Section from "./components/Section";
import Experience from "./sections/Experience";

function App() {
  return (
    <>
      <Navbar />

      <main className="px-10 md:px-15 max-w-6xl mx-auto">
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
          <section className="flex items-center justify-center">
            Projects
          </section>
        </Section>
      </main>
    </>
  );
}

export default App;
