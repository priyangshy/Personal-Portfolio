import campusFindImage from '../assets/campusfind.jpg';
import swaasthImage from '../assets/swaasth.jpg';
import {
  SiReact,
  SiJavascript,
  SiMongodb,
  SiTailwindcss,
  SiFirebase,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
} from 'react-icons/si';

export const sections = ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'];

export const projects = [
  {
    title: 'CampusFind',
    description:
      'A lost and found web platform for university campuses helping students report and recover belongings efficiently.',
    stack: ['React', 'Next.js', 'Firebase', 'Cloudinary', 'Tailwind CSS'],
    github: 'https://github.com',
    demo: 'https://campus-find-kappa.vercel.app',
    image: campusFindImage,
    icon: SiReact,
  },
  {
    title: 'Swaasth',
    description:
      'A health-based platform simplifying hospital and patient interactions with OPD, appointments, and medical records management.',
    stack: ['React', 'JavaScript', 'MongoDB', 'Node.js', 'Express'],
    github: 'https://github.com',
    demo: '#',
    image: swaasthImage,
    icon: SiJavascript,
  },
];

export const skillsData = [
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Firebase', icon: SiFirebase },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
];

export const experiences = [
  {
    year: '2025',
    title: 'Summer Internship',
    company: 'CodecTechnologies',
    detail: 'Web Developer - Built responsive web applications using React and modern web technologies.',
    type: 'experience',
  },
  {
    year: '2024',
    title: 'Runner Up',
    company: 'Innovathon',
    detail: 'Participated in hackathon and secured second position with innovative solution.',
    type: 'achievement',
  },
  {
    year: '2024',
    title: 'Git & GitHub Professional Certificate',
    company: 'Professional Certification',
    detail: 'Completed professional certification in version control and collaborative development.',
    type: 'certification',
  },
];
