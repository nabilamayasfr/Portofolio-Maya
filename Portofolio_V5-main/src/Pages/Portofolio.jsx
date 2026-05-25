import React, { useEffect, useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, Github, Calendar, Building, ExternalLink, CheckCircle2 } from "lucide-react";
import PropTypes from "prop-types";

/* =========================
   DATA PROYEK (dari CV)
========================= */
const projects = [
  {
    title: "Sign Language Recognition Web App",
    image: "/projects/signlang.png",
    github: "https://github.com/nabilamayasfr/sign-language-app",
    tech: ["FastAPI", "OpenCV", "MediaPipe", "CNN", "TensorFlow"],
    bulletPoints: [
      "Leading end-to-end development of real-time Indonesian Sign Language recognition",
      "High-performance backend with FastAPI as integration layer",
      "Optimized real-time data processing using OpenCV & MediaPipe for hand landmarks"
    ]
  },
  {
    title: "Indonesian Traffic Sign Recognition",
    image: "/projects/trafficsign.png",
    github: "https://github.com/nabilamayasfr/traffic-sign-app",
    tech: ["Flutter", "TensorFlow Lite", "CNN", "Python"],
    bulletPoints: [
      "End-to-end ML pipeline: preprocessing, training, evaluation",
      "Custom CNN model deployed into Flutter mobile app",
      "Seamless on-device performance with TensorFlow Lite"
    ]
  },
  {
    title: "Internet Cafe Management App",
    image: "/projects/cafe.png",
    github: "https://github.com/nabilamayasfr/cafe-management",
    tech: ["Laravel", "MySQL", "PHP", "Tailwind"],
    bulletPoints: [
      "Real-time billing engine to automate operational processes",
      "Role-Based Access Control (RBAC) for admin & operator",
      "Secure data integrity with MySQL"
    ]
  },
  {
    title: "Boarding House Management Website",
    image: "/projects/boarding.png",
    github: "https://github.com/nabilamayasfr/boarding-house",
    tech: ["Laravel", "MySQL", "Bootstrap"],
    bulletPoints: [
      "Full-stack platform with CRUD & secure authentication",
      "Automated financial reporting dashboard",
      "Monthly revenue monitoring & data-driven insights"
    ]
  }
];

/* =========================
   SERTIFIKAT
========================= */
const certificates = [
  {
    id: 1,
    title: "2nd Place - Appropriate Innovation Technology Competition",
    issuer: "AIT Competition",
    date: "April 2023",
    image: "/certificates/ait-2nd.jpg",
    description: "Designed automatic seed planter with mechanical filtration & ergonomic lever mechanism. Applied engineering design to solve agricultural problems."
  }
];

/* =========================
   TECH STACK
========================= */
const techStacks = [
  { icon: "python.svg", language: "Python" },
  { icon: "php.svg", language: "PHP" },
  { icon: "dart.svg", language: "Dart" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "laravel.svg", language: "Laravel" },
  { icon: "flutter.svg", language: "Flutter" },
  { icon: "fastapi.svg", language: "FastAPI" },
  { icon: "tensorflow.svg", language: "TensorFlow" },
  { icon: "opencv.svg", language: "OpenCV" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "git.svg", language: "Git" },
  { icon: "figma.svg", language: "Figma" }
];

/* =========================
   TOGGLE BUTTON
========================= */
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

/* =========================
   TAB PANEL
========================= */
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

/* =========================
   CARD PROYEK (hanya tombol GitHub)
========================= */
const ProjectCard = ({ project, index }) => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={index * 100}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 group h-full flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700"
          onError={(e) => { e.target.src = "/placeholder-project.png"; }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        
        {/* Bullet points dengan centang */}
        <div className="mt-4 space-y-2">
          {project.bulletPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((item, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20"
            >
              {item}
            </span>
          ))}
        </div>
        
        {/* HANYA tombol GitHub, Live Demo dihapus */}
        <div className="flex flex-wrap gap-3 mt-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:scale-105 transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

/* =========================
   CARD SERTIFIKAT
========================= */
const CertificateCard = ({ certificate, index }) => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={index * 100}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 group h-full flex flex-col"
    >
      <div className="overflow-hidden">
        <img
          src={certificate.image}
          alt={certificate.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-700"
          onError={(e) => { e.target.src = "/placeholder-cert.png"; }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white">{certificate.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-purple-300 text-sm">
          <Building className="w-4 h-4" />
          <span>{certificate.issuer}</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{certificate.date}</span>
        </div>
        {certificate.description && (
          <p className="text-gray-400 mt-3 text-sm leading-relaxed flex-grow">
            {certificate.description}
          </p>
        )}
      </div>
    </div>
  );
};

CertificateCard.propTypes = {
  certificate: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

/* =========================
   BOOTCAMP INFO
========================= */
const BootcampInfo = () => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-duration="800"
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 group"
    >
      <div className="p-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-white">Dicoding x DBS Foundation</h4>
            <p className="text-gray-300 text-sm">AI Engineer Bootcamp (Feb 2026 - Present)</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">Completed modules: ML, Deep Learning, Computer Vision with TensorFlow</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">Capstone project: AI-based CV analysis for curriculum vitae evaluation</p>
          </div>
        </div>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:scale-105 transition-all duration-300 w-fit"
        >
          <ExternalLink className="w-4 h-4" />
          View Bootcamp Details
        </a>
      </div>
    </div>
  );
};

/* =========================
   MAIN COMPONENT
========================= */
export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my projects, certifications, and technical expertise from my learning journey.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
            }}
          >
            <Tab icon={<Code className="mb-2 w-5 h-5" />} label="Projects" {...a11yProps(0)} />
            <Tab icon={<Award className="mb-2 w-5 h-5" />} label="Certificates" {...a11yProps(1)} />
            <Tab icon={<Boxes className="mb-2 w-5 h-5" />} label="Tech Stack" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        {/* Tab Projects */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4">
              Course Experience
            </h3>
            <BootcampInfo />
          </div>
        </TabPanel>

        {/* Tab Certificates */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((certificate, index) => (
                <CertificateCard key={certificate.id} certificate={certificate} index={index} />
              ))}
            </div>
          </div>
        </TabPanel>

        {/* Tab Tech Stack */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="container mx-auto pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, index) => (
                <div key={index} data-aos="fade-up" data-aos-duration="1000">
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}