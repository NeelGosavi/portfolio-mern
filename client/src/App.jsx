// src/App.jsx
import { useEffect, useState } from "react";
import { api } from "./api";
import Navbar from "./components/Navbar";
import FadeInSection from "./animations/FadeInSection";
import { motion } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import { Github, Linkedin, Mail, Download, ExternalLink, Code2 } from "lucide-react";

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
          const fetchedProjects = Array.isArray(projRes.data) ? projRes.data : [];
          const fetchedSkills = Array.isArray(skillsRes.data) ? skillsRes.data : [];

          // --- LOGIC TO MERGE PROJECT SKILLS INTO SKILLS LIST ---
          
          // 1. Get all unique technologies listed in projects
          const projectTechSet = new Set();
          fetchedProjects.forEach((p) => {
            if (Array.isArray(p.techStack)) {
              p.techStack.forEach((tech) => projectTechSet.add(tech));
            }
          });

          // 2. Identify which ones are missing from the skills database
          // (We use lowercase comparison to avoid duplicates like "react" vs "React")
          const existingSkillNames = new Set(fetchedSkills.map((s) => s.name.toLowerCase()));
          const missingSkills = [];

          projectTechSet.forEach((tech) => {
            if (!existingSkillNames.has(tech.toLowerCase())) {
              missingSkills.push({
                _id: `auto-${tech}`, // Generate a temporary unique ID
                name: tech,
                category: "Tech Stack", // Default category for inferred skills
              });
            }
          });

          // 3. Update state with both lists combined
          setProjects(fetchedProjects);
          setSkills([...fetchedSkills, ...missingSkills]);
          setLoading(false);
        }
      } catch (err) {
        if (retry < 3) {
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
      setTimeout(() => setContactStatus(""), 3000);
    } catch (err) {
      setContactStatus("Failed to send message ❌");
      setTimeout(() => setContactStatus(""), 3000);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <AnimatedBackground />

      {/* HERO SECTION */}
      <header
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-4"
      >
        <div className="max-w-4xl mx-auto space-y-8 z-10">
          
          {/* Name & Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                Neel Gosavi
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 font-light flex flex-wrap justify-center items-center gap-3">
              Full Stack Developer 
              <span className="hidden md:inline text-gray-700">•</span> 
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-base font-semibold tracking-wide">
                MERN Stack
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            I build scalable full-stack web applications with clean UI, 
            secure backends, and real-world problem solving.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center pt-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] active:scale-95"
            >
              View Projects
            </a>
            
            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-sm text-white rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              Contact Me
            </a>

            <a
              href="/Neel_Gosavi_Resume.pdf"
              download
              className="group flex items-center gap-2 px-6 py-4 bg-gray-900 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white rounded-full transition-all hover:scale-105 active:scale-95"
            >
              <Download size={18} className="group-hover:animate-bounce" />
              <span className="text-sm font-medium">Resume</span>
            </a>
          </motion.div>

          {/* Social Dock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-6 justify-center pt-8"
          >
            <a
              href="https://github.com/NeelGosavi"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white hover:scale-110 transition-all text-gray-400"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/neel-gosavi-4b1099358/"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-400 hover:scale-110 transition-all text-gray-400"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:neelgosavi07@gmail.com"
              className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-red-600/20 hover:border-red-500/50 hover:text-red-400 hover:scale-110 transition-all text-gray-400"
            >
              <Mail size={24} />
            </a>
          </motion.div>

        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-6xl mx-auto px-6 space-y-32 pb-20">
        
        {/* ABOUT SECTION */}
        <FadeInSection>
          <section id="about" className="scroll-mt-32">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">About Me</h3>
              <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              <p className="mb-6">
                I am a third-year Computer Engineering student at <span className="text-blue-400 font-medium">Terna Engineering College</span> with a strong academic record, maintaining a CGPA of <strong className="text-white">9.40</strong>. Alongside my studies, I work as a Full Stack Developer, building end-to-end web applications using the MERN stack.
              </p>
              <p className="mb-6">
                I enjoy designing clean, intuitive user interfaces and developing secure, scalable backend systems that solve real-world problems. My projects focus on practical use cases such as <span className="text-purple-400">inventory management systems</span>, <span className="text-purple-400">library platforms</span>, and <span className="text-purple-400">full-stack web apps</span>.
              </p>
              <p>
                I have also completed training in <strong className="text-white">Machine Learning</strong>, gaining hands-on experience in data-driven decision making and intelligent system design. I actively apply these concepts to build smarter software solutions.
              </p>
            </div>
          </section>
        </FadeInSection>

        {/* PROJECTS SECTION */}
        <FadeInSection>
          <section id="projects" className="scroll-mt-32">
             <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h3>
              <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : projects.length === 0 ? (
              <p className="text-center text-gray-500">No projects yet.</p>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {projects.map((p) => (
                  <motion.div
                    key={p._id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -8 }}
                    className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 hover:bg-gray-800/80 transition-all duration-300 shadow-lg hover:shadow-purple-500/10 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                        <Code2 size={24} />
                      </div>
                      <div className="flex gap-3">
                         {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Github size={20} />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h4>
                    
                    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                      {p.description}
                    </p>

                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(p.techStack) && p.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium bg-gray-800 text-gray-300 px-2.5 py-1 rounded-md border border-gray-700 group-hover:border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        </FadeInSection>

        {/* SKILLS SECTION */}
        <FadeInSection>
          <section id="skills" className="scroll-mt-32">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h3>
              <div className="h-1 w-20 bg-green-500 mx-auto rounded-full"></div>
            </motion.div>

            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : skills.length === 0 ? (
              <p className="text-center text-gray-500">
                No skills in database yet.
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {skills.map((s) => (
                  <motion.span
                    key={s._id}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="bg-gray-900/80 border border-gray-700 text-gray-200 px-5 py-3 rounded-xl cursor-default hover:bg-gray-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 flex items-center gap-2"
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-md border border-gray-700 uppercase tracking-wider">
                      {s.category}
                    </span>
                  </motion.span>
                ))}
              </div>
            )}
          </section>
        </FadeInSection>

        {/* CONTACT SECTION */}
        <FadeInSection>
          <section id="contact" className="scroll-mt-32 max-w-2xl mx-auto">
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h3>
              <p className="text-gray-400">
                I’m always open to discussing new opportunities, projects, or collaborations.
              </p>
            </motion.div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
                />
              </div>
              <textarea
                name="message"
                placeholder="How can I help you?"
                rows="5"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all resize-y"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>

            {contactStatus && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 text-center p-4 rounded-xl font-medium ${
                  contactStatus.includes("✅")
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {contactStatus}
              </motion.div>
            )}
          </section>
        </FadeInSection>

      </div>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-900">
        <p>© {new Date().getFullYear()} Neel Gosavi. Built with React, Tailwind & Framer Motion.</p>
      </footer>
    </div>
  );
}

export default App;