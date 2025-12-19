// src/App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./api";
import Navbar from "./components/Navbar";
import FadeInSection from "./animations/FadeInSection";
import { motion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import { Github, Linkedin, Mail } from "lucide-react";
import { Download } from "lucide-react";




function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [contactStatus, setContactStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let isMounted = true;

  const fetchData = async (retry = 0) => {
    try {
      const projRes = await api.get("/projects");
      const skillsRes = await api.get("/skills");

      if (isMounted) {
        setProjects(Array.isArray(projRes.data) ? projRes.data : []);
        setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
        setLoading(false);
      }
    } catch (err) {
      if (retry < 3) {
        // Retry after short delay
        setTimeout(() => fetchData(retry + 1), 1000);
      } else {
        console.error("Failed after retries:", err);
        setLoading(false);
      }
    }
  };

  fetchData();

  return () => {
    isMounted = false;
  };
}, []);



  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus("");

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
          await api.post("/contact", payload);
          setContactStatus("Message sent successfully ✅");
          form.reset();

          // 👇 Auto-clear message after 3 seconds
          setTimeout(() => {
            setContactStatus("");
          }, 3000);

        } catch (err) {
          setContactStatus("Failed to send message ❌");

          setTimeout(() => {
            setContactStatus("");
          }, 3000);
        }

  };

  return (
    <div className="app">
      <Navbar />
      <AnimatedBackground />


      {/* HERO */}
      <header id="home" className="hero">
        <h1>Neel Gosavi</h1>
        <h2>Full Stack Developer • MERN</h2>
        <p>
          I build scalable full-stack web applications with clean UI,
          secure backends, and real-world problem solving.
        </p>

        <div className="hero-buttons">
          <a href="#projects">View Projects</a>
          <a href="#contact" className="secondary">
            Contact Me
          </a>

          <a
            href="/Neel_Gosavi_Resume.pdf"
            download
            className="btn-secondary"
          >
            <Download size={16} style={{ marginRight: "6px" }} />
            Resume
          </a>


        </div>
        <div className="social-links">
          <a
            href="https://github.com/NeelGosavi"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={20} />
          </a>

         <a
            href="https://www.linkedin.com/in/neel-gosavi-4b1099358/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={20} />
          </a>

          <a href="mailto:neelgosavi07@gmail.com">
            <Mail size={20} />
          </a>
        </div>

      </header>

      {/* ABOUT */}
      <FadeInSection>
        <section id="about" className="section">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            About Me
          </motion.h3>

          <p>
            I am a third-year Computer Engineering student at Terna Engineering College
            with a strong academic record, maintaining a CGPA of <strong>9.40</strong>.
            Alongside my studies, I work as a Full Stack Developer, building
            end-to-end web applications using the MERN stack.
          </p>

          <p>
            I enjoy designing clean, intuitive user interfaces and developing secure,
            scalable backend systems that solve real-world problems. My projects focus
            on practical use cases such as inventory management, library systems, and
            full-stack platforms.
          </p>

          <p>
            Currently, I am expanding my skill set by learning <strong>Machine Learning</strong>,
            with a focus on understanding data-driven decision making and intelligent
            system design. I am passionate about continuous learning and aim to grow
            as a well-rounded software engineer.
          </p>
        </section>
      </FadeInSection>


      {/* PROJECTS */}
      <FadeInSection>
        <section id="projects" className="section">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Projects
          </motion.h3>

          {loading ? (
            <p style={{ opacity: 0.7 }}>Loading projects…</p>
          ) : projects.length === 0 ? (
            <p>No projects yet.</p>
          ) : (
            <motion.div
              className="cards"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
            >
              {projects.map((p) => (
                <motion.div
                  key={p._id}
                  className="project-card"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4>{p.title}</h4>
                  <p className="project-desc">{p.description}</p>

                  {Array.isArray(p.techStack) && (
                    <div className="project-tech">
                      {p.techStack.map((tech, i) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>
                  )}

                  <div className="project-links">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </FadeInSection>

      {/* SKILLS */}
      <FadeInSection>
        <section id="skills" className="section">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Skills
          </motion.h3>

          {loading ? (
            <p>Loading...</p>
          ) : skills.length === 0 ? (
            <p>No skills in database yet.</p>
          ) : (
            <div className="chips">
              {skills.map((s) => (
                <motion.span
                  key={s._id}
                  className="chip"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {s.name} <small>({s.category})</small>
                </motion.span>
              ))}
            </div>
          )}
        </section>
      </FadeInSection>

      {/* CONTACT */}
      <FadeInSection>
        <section id="contact" className="section contact-section">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Contact Me
          </motion.h3>

          <p className="contact-subtext">
            I’m always open to discussing new opportunities, projects, internships,
            or collaborations. If you have an idea or just want to connect, feel free
            to drop a message — I’ll get back to you as soon as possible.
          </p>

          <form className="contact-form centered" onSubmit={handleContactSubmit}>
            <input name="name" placeholder="Your name" required />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows="4"
              required
            />
            <button type="submit">Send Message</button>
          </form>
          <p className="response-time">
            Response time: usually within 24 hours
          </p>

          <div className="social-links">
          <a
            href="https://github.com/NeelGosavi"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={20} />
          </a>

         <a
            href="https://www.linkedin.com/in/neel-gosavi-4b1099358/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={20} />
          </a>

          <a href="mailto:neelgosavi07@gmail.com">
            <Mail size={20} />
          </a>
        </div>

          {contactStatus && (
            <motion.p
              className="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {contactStatus}
            </motion.p>
          )}

        </section>
      </FadeInSection>

    </div>
  );
}

export default App;
