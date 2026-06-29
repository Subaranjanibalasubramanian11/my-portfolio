import { useState } from "react";
import "./App.css";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";

function App() {
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <Cursor />
      <Navbar onResumeClick={() => setShowResume(true)} />
      <main>
        <Home showResume={showResume} setShowResume={setShowResume} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}

export default App;