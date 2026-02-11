import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Education from '../components/Education.jsx';

const Home = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
    </div>
  );
};

export default Home;

