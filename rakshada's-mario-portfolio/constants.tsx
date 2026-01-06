
import { ResumeData } from './types';

export const RESUME_DATA: ResumeData = {
  name: "Rakshada Rajendra Tawade",
  title: "Java Developer Intern",
  summary: "A high-performing Java Developer Intern specializing in scalable enterprise applications. I bridge the gap between complex backend logic and user-centric features, achieving significant performance improvements in real-world library and employee management systems.",
  experience: [
    {
      company: "Codec Technologies",
      role: "Java Developer Intern",
      period: "Dec 2025 - Jan 2026",
      location: "Hybrid",
      description: [
        "Architected 3 enterprise Java web applications using MVC principles.",
        "Optimized query performance resulting in a 30% faster response time.",
        "Implemented secure authentication and CRUD operations with JDBC."
      ]
    },
    {
      company: "Codsoft",
      role: "Java Programming Intern",
      period: "Oct 2025 - Nov 2025",
      location: "Virtual",
      description: [
        "Engineered a robust ATM Interface and Grade Calculator.",
        "Integrated MySQL for persistent data storage across applications.",
        "Mastered advanced OOP concepts and exception handling patterns."
      ]
    },
    {
      company: "AmceGrade",
      role: "Web Development Intern",
      period: "July 2024 - Sept 2024",
      location: "Virtual",
      description: [
        "Crafted dynamic user interfaces using modern JavaScript.",
        "Collaborated via Git/GitHub for seamless version control.",
        "Resolved complex layout issues for cross-browser compatibility."
      ]
    }
  ],
  projects: [
    {
      title: "Library Manager",
      company: "Codec Technologies",
      github: "https://github.com/rakshada",
      description: [
        "Full-stack Java app for inventory automation.",
        "MySQL backend with optimized schema for search.",
        "Role-based dashboard for librarians and members."
      ]
    },
    {
      title: "Secure Chat App",
      company: "Codec Technologies",
      description: [
        "Real-time communication tool using JSP & Servlets.",
        "End-to-end data encryption for message security.",
        "Responsive design ensuring mobile-first accessibility."
      ]
    },
    {
      title: "Employee Suite",
      company: "Codec Technologies",
      description: [
        "Payroll and attendance automation system.",
        "Automated reporting features using Java Logic.",
        "Reduced manual data entry time by 50%."
      ]
    }
  ],
  skills: [
    { category: "Core Backend", skills: ["Java", "JDBC", "Spring Boot", "OOPs"], level: 5 },
    { category: "Web Frontend", skills: ["HTML5", "CSS3", "JavaScript", "Angular"], level: 4 },
    { category: "Server/DB", skills: ["MySQL", "Tomcat", "Servlets", "JSP"], level: 5 },
    { category: "Tools", skills: ["Git", "Maven", "Eclipse", "VS Code"], level: 4 }
  ],
  education: [
    { school: "SIES College of Arts & Commerce", degree: "BSC-IT (Computer Science)", pointer: "6.60 CGPA", year: "2023-2025" },
    { school: "Saraswati Institute of Technology", degree: "Diploma in Computer Engineering", pointer: "69.20%", year: "2019-2022" }
  ]
};

export const COLORS = {
  sky: "#5c94fc",
  ground: "#C84C0C",
  pipe: "#00a800",
  block: "#F8B800",
  brick: "#923404",
};
