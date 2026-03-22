import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingElement from "./components/FloatingElement";
import ProfileImage from "./components/ProfileImage";
import CustomCursor from "./components/CustomCursor";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaArrowRight, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { SiReact, SiJavascript, SiMongodb, SiTailwindcss, SiFirebase, SiNextdotjs, SiNodedotjs, SiTypescript } from 'react-icons/si';
import emailjs from 'emailjs-com';

// Initialize EmailJS with your public key
emailjs.init('vUXjAjOCCx7vFx50B');

import profileImage from './assets/profile.jpg';
import campusFindImage from './assets/campusfind.jpg';
import swaasthImage from './assets/swaasth.jpg';

const projects = [
  {
    title: 'CampusFind',
    description: 'A lost and found web platform for university campuses helping students report and recover belongings efficiently.',
    stack: ['React', 'Next.js', 'Firebase', 'Cloudinary', 'Tailwind CSS'],
    github: 'https://github.com',
    demo: 'https://campus-find-kappa.vercel.app',
    image: campusFindImage,
    icon: SiReact
  },
  {
    title: 'Swaasth',
    description: 'A health-based platform simplifying hospital and patient interactions with OPD, appointments, and medical records management.',
    stack: ['React', 'JavaScript', 'MongoDB', 'Node.js', 'Express'],
    github: 'https://github.com',
    demo: '#',
    image: swaasthImage,
    icon: SiJavascript
  }
];

const skillsData = [
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript }
];



const experiences = [
  { 
    year: '2025', 
    title: 'Summer Internship', 
    company: 'CodecTechnologies', 
    detail: 'Web Developer - Built responsive web applications using React and modern web technologies.',
    type: 'experience'
  },
  { 
    year: '2024', 
    title: 'Runner Up', 
    company: 'Innovathon', 
    detail: 'Participated in hackathon and secured second position with innovative solution.',
    type: 'achievement'
  },
  { 
    year: '2024', 
    title: 'Git & GitHub Professional Certificate', 
    company: 'Professional Certification', 
    detail: 'Completed professional certification in version control and collaborative development.',
    type: 'certification'
  }
];

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-[#E5E7EB] p-10">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <pre className="bg-[#111827] p-4 rounded-lg text-sm text-red-300 overflow-auto">
            {String(this.state.error)}
            <br />
            {this.state.info?.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};


export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [titleTyping, setTitleTyping] = useState('');
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation for title
  useEffect(() => {
    const title = "I'm a Full Stack Web Developer";
    let charIndex = 0;
    let local = '';
    const letters = title.split('');

    const typeInterval = setInterval(() => {
      if (charIndex < letters.length) {
        local += letters[charIndex];
        setTitleTyping(local);
        charIndex += 1;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cursor dot
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-dot';
    document.body.appendChild(cursor);

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cursor.remove();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validate form fields
    if (!name || !email || !message) {
      setFormStatus({ 
        type: 'error', 
        message: 'Please fill in all fields.' 
      });
      setIsSubmitting(false);
      return;
    }

    // EmailJS configuration
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      
    };

    emailjs
      .send(
        'service_u6kth06',        // Your Service ID
        'template_key19eq',       // Your Template ID
        templateParams,
        'vUXjAjOCCx7vFx50B'       // Your Public Key
      )
      .then(
        (response) => {
          setFormStatus({ 
            type: 'success', 
            message: '✓ Message sent successfully! I\'ll get back to you soon.' 
          });
          event.target.reset();
          setIsSubmitting(false);
          
          // Clear message after 5 seconds
          setTimeout(() => {
            setFormStatus({ type: '', message: '' });
          }, 5000);
        },
        (error) => {
          console.error('EmailJS Error:', error);
          setFormStatus({ 
            type: 'error', 
            message: '✗ Failed to send message. Please try again.' 
          });
          setIsSubmitting(false);
        }
      );
  };

  const sections = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

  return (
    <ErrorBoundary>
      <CustomCursor />
      <div className="relative">
        {/* Scroll Progress Bar */}
        <motion.div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
        />

      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative w-16 h-16"
          >
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#6366F1] border-r-[#22C55E]"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#6366F1] border-l-[#22C55E]"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      )}

      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-2xl border-b border-[#22C55E]/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => scroll.scrollToTop()}
            className="text-2xl font-bold gradient-text"
          >
            Portfolio
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <ScrollLink
                key={section}
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                className="relative px-4 py-2 text-sm font-medium text-[#E5E7EB] cursor-pointer group"
              >
                {section}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6366F1] to-[#22C55E]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </ScrollLink>
            ))}
          </div>

          {/* Mobile Menu & CTA */}
          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              className="hidden sm:flex items-center gap-2 btn-primary text-sm"
            >
              <FaDownload className="text-sm" /> Resume
            </motion.a>

            {/* Mobile Menu */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden p-2 hover:bg-[#111827]/50 rounded-lg transition-colors"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={navOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-[#6366F1] rounded-full"
                />
                <motion.span
                  animate={navOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-[#22C55E] rounded-full"
                />
                <motion.span
                  animate={navOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-[#6366F1] rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={navOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-[#22C55E]/10"
        >
          <div className="px-4 py-4 space-y-2">
            {sections.map((section) => (
              <ScrollLink
                key={section}
                to={section.toLowerCase()}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setNavOpen(false)}
                className="block px-4 py-2 text-[#E5E7EB] hover:text-[#6366F1] transition-colors rounded-lg"
              >
                {section}
              </ScrollLink>
            ))}
          </div>
        </motion.div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          {/* Background Elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#6366F1]/20 rounded-full filter blur-3xl opacity-50 -z-10" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#22C55E]/20 rounded-full filter blur-3xl opacity-50 -z-10" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={!loading ? 'visible' : 'hidden'}
            className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Priyangshu </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#22c55e]">Nath Laskar</span>
                </h1>
              </motion.div>

              <motion.p variants={itemVariants} className="text-3xl sm:text-4xl font-semibold text-white">
                I’m a Full Stack Developer
              </motion.p>

              <motion.p variants={itemVariants} className="text-[#9CA3AF] text-lg sm:text-xl leading-relaxed max-w-xl">
                I build fast, scalable, and user-friendly web applications.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center justify-center gap-2"
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work <FaArrowRight className="text-sm" />
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <FaDownload /> Download Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-6 pt-4">
                <motion.a
                  whileHover={{ scale: 1.2, y: -5 }}
                  href="https://github.com/priyangshy"
                  className="text-[#E5E7EB] hover:text-[#38bdf8] text-3xl transition-colors"
                >
                  <FaGithub />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, y: -5 }}
                  href="https://www.linkedin.com/in/priyangshu-nath-laskar-3baa5"
                  className="text-[#E5E7EB] hover:text-[#38bdf8] text-3xl transition-colors"
                >
                  <FaLinkedin />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, y: -5 }}
                  href="mailto:priyangshu.codec@gmail.com"
                  className="text-[#E5E7EB] hover:text-[#38bdf8] text-3xl transition-colors"
                >
                  <FaEnvelope />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div variants={itemVariants}>
              <ProfileImage src={profileImage} alt="Profile" />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#22C55E]/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text">About Me</h2>
              <p className="text-[#9CA3AF] text-lg leading-relaxed max-w-3xl">
                I'm a passionate Computer Science student with a strong foundation in full-stack web development. I love solving complex problems and turning ideas into elegant, functional solutions. My journey in tech has been driven by curiosity and a desire to create meaningful digital experiences.
              </p>
            </motion.div>

            {/* About Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-6 mt-12"
            >
              {[
                { title: 'Education', content: 'B.Tech in CSE from Assam Downtown University (2023-2027)' },
                { title: 'Specialization', content: 'Full Stack Development with React, Node.js, and MongoDB' },
                { title: 'Focus', content: 'Building responsive, user-friendly applications with modern tech' }
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="glass-card p-8">
                  <h3 className="text-xl font-semibold text-[#6366F1] mb-3">{item.title}</h3>
                  <p className="text-[#9CA3AF]">{item.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#22C55E]/10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold gradient-text mb-12"
            >
              Featured Projects
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {projects.map((project, i) => {
                const IconComponent = project.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="glass-card overflow-hidden group"
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50" />
                    </div>

                    {/* Project Content */}
                    <div className="p-8 space-y-4 relative z-10">
                      <div className="flex items-center gap-3">
                        <IconComponent className="text-2xl text-[#6366F1]" />
                        <h3 className="text-2xl font-bold text-[#E5E7EB]">{project.title}</h3>
                      </div>
                      <p className="text-[#38bdf8] text-xs uppercase tracking-widest">Built with React, Firebase, Tailwind</p>
                      <p className="text-[#9CA3AF] text-sm leading-relaxed">{project.description}</p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.stack.map((tech, j) => (
                          <span key={j} className="px-3 py-1 text-xs font-semibold bg-[#6366F1]/20 text-[#6366F1] rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4 pt-4">
                        <motion.a
                          whileHover={{ x: 5 }}
                          href={project.demo}
                          className="flex items-center gap-2 text-[#22C55E] hover:text-[#16A34A] transition-colors text-sm font-semibold"
                        >
                          Live Demo <FaArrowRight className="text-xs" />
                        </motion.a>
                        <motion.a
                          whileHover={{ x: 5 }}
                          href={project.github}
                          className="flex items-center gap-2 text-[#6366F1] hover:text-[#4F46E5] transition-colors text-sm font-semibold"
                        >
                          GitHub <FaArrowRight className="text-xs" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#22C55E]/10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold gradient-text mb-6"
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#9CA3AF] text-lg mb-12"
            >
              Technologies I use to build modern, maintainable applications.
            </motion.p>

            <div className="marquee-container">
              {/* Row 1: Moves from 0% to -50% */}
              <motion.div
                className="marquee-row"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 20,
                    ease: 'linear',
                  },
                }}
              >
                {skillsData.concat(skillsData).map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={`${skill.name}-${index}`} className="skill-pill">
                      <Icon className="text-sm" />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Row 2: Moves from -50% to 0% (opposite direction) */}
              <motion.div
                className="marquee-row"
                animate={{ x: ['-50%', '0%'] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: 20,
                    ease: 'linear',
                  },
                }}
              >
                {skillsData.concat(skillsData).map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <div key={`${skill.name}-row2-${index}`} className="skill-pill">
                      <Icon className="text-sm" />
                      <span>{skill.name}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#22C55E]/10">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold gradient-text mb-12"
            >
              Experience & Achievements
            </motion.h2>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="glass-card p-8 border-l-4 border-[#6366F1]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-[#22C55E] text-sm font-semibold">{exp.year}</p>
                      <h3 className="text-2xl font-bold text-[#E5E7EB] mt-1">{exp.title}</h3>
                      <p className="text-[#6366F1] font-semibold mt-1">{exp.company}</p>
                      <p className="text-[#9CA3AF] text-sm mt-3">{exp.detail}</p>
                    </div>
                    <motion.div
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#6366F1]/20 text-[#6366F1] whitespace-nowrap ml-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      {exp.type}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#22C55E]/10">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold gradient-text">Get In Touch</h2>
              <p className="text-[#9CA3AF] text-lg">Have a project in mind? Let's collaborate and create something amazing together.</p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#38bdf8] focus:border-[#38bdf8] disabled:opacity-50"
                />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#38bdf8] focus:border-[#38bdf8] disabled:opacity-50"
                />
              </div>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="message"
                rows="5"
                placeholder="Enter your message"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#38bdf8] focus:border-[#38bdf8] disabled:opacity-50"
              />

              {/* Status Message */}
              {formStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    formStatus.type === 'success'
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {formStatus.type === 'success' ? (
                    <FaCheck className="text-lg flex-shrink-0" />
                  ) : (
                    <FaExclamationCircle className="text-lg flex-shrink-0" />
                  )}
                  <span>{formStatus.message}</span>
                </motion.div>
              )}

              <motion.button
                whileHover={!isSubmitting ? { scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="inline-block">
                      ⚙️
                    </motion.span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FaArrowRight className="text-sm" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22C55E]/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#9CA3AF] text-sm">© 2026 Priyangshu Nath Laskar. Built with React, Tailwind & Framer Motion.</p>
          <div className="flex gap-6 text-[#E5E7EB]">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://github.com/priyangshy"
              className="hover:text-[#6366F1] transition-colors text-lg"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://www.linkedin.com/in/priyangshu-nath-laskar-3baa5"
              className="hover:text-[#6366F1] transition-colors text-lg"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="mailto:priyangshu9282@gmail.com"
              className="hover:text-[#6366F1] transition-colors text-lg"
            >
              <FaEnvelope />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  </ErrorBoundary>
  );
}
