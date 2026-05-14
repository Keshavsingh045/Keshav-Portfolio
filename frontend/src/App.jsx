import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, Menu, X, 
  MapPin, ExternalLink, ChevronDown, Award, Briefcase, 
  Code, GraduationCap, Layout, Server, Sparkles, Terminal,
  Download, Send, CheckCircle2, AlertCircle
} from 'lucide-react';
import { FiGithub as Github, FiLinkedin as Linkedin, FiTwitter as Twitter, FiInstagram as Instagram } from 'react-icons/fi';
import { SiChessdotcom } from 'react-icons/si';
import { 
  personalDetails, skills, experience, 
  projects, education, certifications 
} from './data';

import Background3D from './components/Background3D';
import TiltCard from './components/TiltCard';

const SectionHeading = ({ title, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, rotateX: 90 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, type: "spring" }}
    className="flex items-center gap-3 mb-10"
    style={{ transformStyle: "preserve-3d" }}
  >
    <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.3)]">
      <Icon size={28} />
    </div>
    <h2 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">{title}</h2>
  </motion.div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const apiUrl = '/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      console.error(err);
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus(''), 5000);
  };

  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-blue-500/40 relative overflow-hidden">
      
      {/* 3D Background */}
      <Background3D />

      {/* Navbar / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-x-0 border-t-0 rounded-none px-6 py-4 bg-slate-950/40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="cursor-pointer inline-block z-50 w-16 h-16 -ml-2"
          >
            <img src="/logo.png" alt="Keshav Kundan Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-bold tracking-wide uppercase">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="relative hover:text-blue-400 transition-colors group py-1"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full shadow-[0_0_10px_#3b82f6]"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white transition-colors">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl py-6 px-6 flex flex-col gap-6 md:hidden z-40"
            >
              {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-300 hover:text-blue-400 transition-colors border-b border-slate-800/50 pb-2"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-40" style={{ perspective: "1000px" }}>
        
        {/* HERO SECTION */}
        <section id="about" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between relative gap-10">
          <motion.div 
            initial={{ opacity: 0, z: -100, rotateY: -20 }}
            animate={{ opacity: 1, z: 0, rotateY: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
            className="max-w-3xl flex-1"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              whileHover={{ translateZ: 50 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold mb-8 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-md"
            >
              <Sparkles size={16} />
              <span>MERN Stack Developer</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter" style={{ transform: "translateZ(30px)" }}>
              Hi, I'm <br/><span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">{personalDetails.name}</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl" style={{ transform: "translateZ(20px)" }}>
              {personalDetails.title} based in {personalDetails.location}. 
              Crafting immersive, high-performance web experiences.
            </p>

            <div className="flex flex-wrap gap-5 mb-14 relative z-50">
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.6)" }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                Let's Build Something
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf" 
                target="_blank"
                className="px-8 py-4 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl font-bold transition-colors shadow-xl flex items-center gap-2 hover:border-blue-500"
              >
                <Download size={20} /> Download CV
              </motion.a>
              <TiltCard className="inline-block">
                <a href={personalDetails.socials.github} target="_blank" rel="noreferrer" className="px-6 py-4 glass-panel rounded-xl font-bold flex items-center gap-3 hover:bg-slate-800/80 transition-colors">
                  <Github size={22} className="text-blue-400"/> GitHub
                </a>
              </TiltCard>
              <TiltCard className="inline-block">
                <a href={personalDetails.socials.linkedin} target="_blank" rel="noreferrer" className="px-6 py-4 glass-panel rounded-xl font-bold flex items-center gap-3 hover:bg-slate-800/80 transition-colors">
                  <Linkedin size={22} className="text-blue-400"/> LinkedIn
                </a>
              </TiltCard>
              <TiltCard className="inline-block">
                <a href={`https://chess.com/member/${personalDetails.socials.chess}`} target="_blank" rel="noreferrer" className="px-6 py-4 glass-panel rounded-xl font-bold flex items-center gap-3 hover:bg-slate-800/80 transition-colors">
                  <SiChessdotcom size={22} className="text-blue-400"/> Chess.com
                </a>
              </TiltCard>
            </div>
          </motion.div>

          {/* 3D Floating Avatar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
            className="hidden md:block relative w-[400px] h-[500px]"
            style={{ perspective: "1000px" }}
          >
            <TiltCard className="w-full h-full">
              <div className="absolute inset-0 bg-blue-500/20 rounded-[2rem] rotate-6 blur-xl" style={{ transform: "translateZ(-20px)" }} />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] -rotate-3 opacity-50" style={{ transform: "translateZ(-10px)" }} />
              <div 
                className="w-full h-full rounded-[2rem] overflow-hidden border-2 border-slate-700/50 shadow-2xl relative z-10"
                style={{ transform: "translateZ(20px)" }}
              >
                <img 
                  src="/hero-pic.jpg" 
                  alt="Keshav Kundan" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500/0f172a/3b82f6?text=Upload+hero-pic.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience">
          <SectionHeading title="Experience Matrix" icon={Briefcase} />
          <div className="space-y-12">
            {experience.map((exp, idx) => (
              <TiltCard key={idx}>
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-panel p-10 relative overflow-hidden group border-l-4 border-l-blue-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" style={{ transform: "translateZ(-10px)" }} />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">{exp.role}</h3>
                      <p className="text-blue-400 font-bold text-lg">{exp.company}</p>
                    </div>
                    <span className="px-4 py-2 rounded-lg bg-blue-900/40 text-sm font-bold text-blue-200 border border-blue-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 relative z-10" style={{ transform: "translateZ(10px)" }}>
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex gap-4 text-slate-300 text-lg">
                        <span className="text-blue-500 mt-1 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">✦</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-3 relative z-10" style={{ transform: "translateZ(15px)" }}>
                    {exp.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 text-sm font-bold bg-slate-900/60 text-blue-300 rounded-lg border border-slate-700 hover:border-blue-500/50 hover:bg-blue-900/30 transition-all cursor-default shadow-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects">
          <SectionHeading title="3D / Technical Projects" icon={Code} />
          <div className="grid lg:grid-cols-2 gap-10">
            {projects.map((project, idx) => (
              <TiltCard key={idx} className="h-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className="glass-panel p-10 flex flex-col h-full group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="text-3xl font-black text-white group-hover:text-blue-400 transition-colors drop-shadow-md">
                      {project.title}
                    </h3>
                    <span className="text-blue-300 bg-blue-900/30 px-3 py-1 rounded-md text-sm font-bold shadow-[0_0_10px_rgba(59,130,246,0.2)]">{project.year}</span>
                  </div>
                  
                  <p className="text-slate-300 mb-10 flex-grow leading-relaxed text-lg relative z-10" style={{ transform: "translateZ(10px)" }}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-auto relative z-10" style={{ transform: "translateZ(25px)" }}>
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-4 py-2 text-sm font-bold bg-slate-950/80 text-blue-200 rounded-xl border border-blue-900/50 shadow-inner group-hover:border-blue-500/50 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills">
          <SectionHeading title="Technical Arsenal" icon={Terminal} />
          
          <div className="grid lg:grid-cols-2 gap-10">
            <TiltCard>
              <div className="glass-panel p-10 h-full relative overflow-hidden">
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                  <Layout size={24} className="text-purple-400" /> Core Technologies
                </h3>
                <div className="flex flex-wrap gap-3" style={{ transform: "translateZ(30px)" }}>
                  {skills.hard.map((skill, i) => (
                    <motion.span 
                      whileHover={{ scale: 1.1, y: -5 }}
                      key={i} 
                      className="px-4 py-2 bg-slate-900 border border-slate-700 shadow-xl text-slate-200 font-bold text-sm rounded-xl hover:border-purple-500 hover:text-white transition-colors cursor-pointer"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </TiltCard>

            <div className="space-y-10">
              <TiltCard>
                <div className="glass-panel p-10">
                  <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                    <Server size={24} className="text-blue-400" /> Professional Skills
                  </h3>
                  <div className="flex flex-wrap gap-3" style={{ transform: "translateZ(20px)" }}>
                    {skills.soft.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 font-medium text-sm rounded-xl shadow-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>

              <TiltCard>
                <div className="glass-panel p-10 border border-yellow-500/20 bg-gradient-to-br from-slate-900/50 to-yellow-900/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl" />
                  <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3" style={{ transform: "translateZ(20px)" }}>
                    <Award size={24} className="text-yellow-400" /> Problem Solving
                  </h3>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg" style={{ transform: "translateZ(10px)" }}>
                    {skills.problemSolving.description}
                  </p>
                  <div className="flex gap-4" style={{ transform: "translateZ(30px)" }}>
                    {skills.problemSolving.badges.map((badge, i) => (
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                        key={i} 
                        className="flex items-center gap-2 px-4 py-3 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)] text-sm font-black rounded-xl"
                      >
                        <Award size={18} /> {badge}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTS */}
        <section className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading title="Education" icon={GraduationCap} />
            <div className="space-y-6">
              {education.map((edu, idx) => (
                <TiltCard key={idx}>
                  <div className="glass-panel p-8">
                    <h4 className="text-xl text-white font-black mb-2" style={{ transform: "translateZ(20px)" }}>{edu.degree}</h4>
                    <p className="text-blue-400 font-bold mb-4" style={{ transform: "translateZ(10px)" }}>{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm font-black" style={{ transform: "translateZ(15px)" }}>
                      <span className="text-slate-400 bg-slate-900 px-3 py-1 rounded-lg">{edu.duration}</span>
                      <span className="px-3 py-1 bg-blue-900/40 text-blue-200 border border-blue-500/30 rounded-lg shadow-inner">{edu.score}</span>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading title="Certifications" icon={Award} />
            <TiltCard>
              <div className="glass-panel p-6 h-[600px] overflow-y-auto pr-4 custom-scrollbar relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                <div className="space-y-6 relative z-10" style={{ transform: "translateZ(20px)" }}>
                  {certifications.map((cert, idx) => (
                    <motion.a 
                      href={cert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx} 
                      className="flex flex-col sm:flex-row gap-6 p-5 bg-slate-900/50 border border-slate-700/50 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800 transition-all group shadow-lg cursor-pointer block"
                    >
                      {/* Certificate Image Placeholder */}
                      <div className="w-full sm:w-40 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 relative">
                        <img 
                          src={cert.image} 
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200/0f172a/3b82f6?text=Upload+Screenshot'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                          <span className="text-xs font-bold text-blue-400">View Certificate</span>
                        </div>
                      </div>
                      
                      {/* Certificate Details */}
                      <div className="flex flex-col justify-center">
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">
                          {cert.title}
                        </h4>
                        <div className="flex flex-wrap gap-4 text-sm font-medium">
                          <span className="flex items-center gap-1 text-slate-300">
                            <Award size={16} className="text-purple-400" /> {cert.issuer}
                          </span>
                          <span className="flex items-center gap-1 text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md">
                            {cert.date}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* CONTACT & ABOUT IMAGES SECTION */}
        <section id="contact" className="py-20 relative">
          
          {/* Aesthetic Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <TiltCard className="h-64 md:h-80">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl relative group">
                <img 
                  src="/bw-pic.jpg" 
                  alt="Keshav B&W" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400/0f172a/3b82f6?text=Upload+bw-pic.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>
            </TiltCard>
            
            <TiltCard className="h-64 md:h-80 md:-translate-y-8">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl relative group">
                <img 
                  src="/desk-pic.jpg" 
                  alt="Keshav at Desk" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400/0f172a/8b5cf6?text=Upload+desk-pic.jpg'; }}
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>
            </TiltCard>

            <TiltCard className="h-64 md:h-80">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl relative group">
                <img 
                  src="/moody-pic.jpg" 
                  alt="Keshav Moody" 
                  className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400/0f172a/3b82f6?text=Upload+moody-pic.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>
            </TiltCard>
          </div>

          <TiltCard>
            <div className="glass-panel p-16 text-center relative overflow-hidden border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900/0 to-slate-900/0" />
              
              <div className="relative z-10 max-w-3xl mx-auto" style={{ transform: "translateZ(40px)" }}>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight drop-shadow-xl">Initialize Connection.</h2>
                <p className="text-slate-300 mb-12 text-xl font-light">
                  Open for new MERN Stack opportunities. Let's create something extraordinary together.
                </p>
                
                <div className="grid md:grid-cols-2 gap-10 mb-14 text-left" style={{ transform: "translateZ(20px)" }}>
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                    <motion.a 
                      whileHover={{ scale: 1.02, x: 5 }}
                      href={`mailto:${personalDetails.emails[0]}`} 
                      className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:border-blue-500/50 transition-all"
                    >
                      <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Mail size={24} /></div>
                      <div>
                        <p className="text-sm text-slate-400 font-medium">Email</p>
                        <p className="text-lg text-slate-200 font-bold">{personalDetails.emails[0]}</p>
                      </div>
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.02, x: 5 }}
                      href={`tel:${personalDetails.phones[0]}`} 
                      className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:border-blue-500/50 transition-all"
                    >
                      <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg"><Phone size={24} /></div>
                      <div>
                        <p className="text-sm text-slate-400 font-medium">Phone</p>
                        <p className="text-lg text-slate-200 font-bold">{personalDetails.phones[0]}</p>
                      </div>
                    </motion.a>
                  </div>

                  {/* Contact Form */}
                  <form onSubmit={handleContactSubmit} className="space-y-4 glass-panel p-6 rounded-2xl border border-slate-700/50 shadow-xl relative">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-300">Name</label>
                      <input 
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-300">Email</label>
                      <input 
                        type="email" required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-300">Message</label>
                      <textarea 
                        required rows="3"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formStatus === 'sending'}
                      type="submit"
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {formStatus === 'sending' ? <span className="animate-pulse">Sending...</span> : <><Send size={20} /> Send Message</>}
                    </motion.button>

                    {formStatus === 'success' && (
                      <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-green-400">
                        <CheckCircle2 size={48} className="mb-4" />
                        <p className="font-bold text-xl">Message Sent!</p>
                      </div>
                    )}
                    {formStatus === 'error' && (
                      <p className="text-red-400 text-sm font-bold flex items-center gap-1 mt-2"><AlertCircle size={16}/> Failed to send. Please try again.</p>
                    )}
                  </form>
                </div>

                <div className="flex justify-center gap-6" style={{ transform: "translateZ(30px)" }}>
                  {[
                    { icon: <Github size={24} />, link: personalDetails.socials.github },
                    { icon: <Linkedin size={24} />, link: personalDetails.socials.linkedin },
                    { icon: <Twitter size={24} />, link: `https://twitter.com/${personalDetails.socials.twitter}` },
                    { icon: <Instagram size={24} />, link: `https://instagram.com/${personalDetails.socials.instagram}` },
                    { icon: <SiChessdotcom size={24} />, link: `https://chess.com/member/${personalDetails.socials.chess}` }
                  ].map((social, idx) => (
                    <motion.a 
                      key={idx}
                      whileHover={{ scale: 1.2, y: -5, color: "#60a5fa", borderColor: "#3b82f6" }}
                      href={social.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-4 bg-slate-950 border-2 border-slate-800 rounded-2xl text-slate-400 transition-all shadow-xl hover:shadow-blue-500/20"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </section>

      </main>
      
      <footer className="text-center py-16 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-xl relative z-10 flex flex-col items-center justify-center gap-8">
        <div className="max-w-2xl px-6">
          <p className="text-slate-300 text-xl font-light leading-relaxed italic">
            "Turning complex problems into elegant, high-performance digital experiences. Let's build the future together."
          </p>
        </div>
        
        <div className="w-48 md:w-64 mt-2">
          <img 
            src="/signature.png" 
            alt="Keshav Kundan Signature" 
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-105 transition-transform duration-500" 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <p className="text-slate-500 text-sm font-bold tracking-widest uppercase mt-4">
          © {new Date().getFullYear()} Keshav Kundan. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
