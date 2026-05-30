import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Code,
  Award,
  Boxes,
  Github,
  Calendar,
  Building,
  CheckCircle2,
  FileText,
} from "lucide-react";
import PropTypes from "prop-types";

// IMPORT FOTO PROJECT DARI src/assets
import signlearnImg from "../assets/signlearn.png";
import rambuidImg from "../assets/rambuid.png";
import matrixImg from "../assets/matrix.png";
import kostkuImg from "../assets/kostku.png";

/* =========================
   PROJECT DATA
========================= */
const projects = [
  {
    title: "Sign Language Recognition Web App",
    github: "https://github.com/nabilamayasfr/ASBI-Project",
    image: signlearnImg,
    tech: ["FastAPI", "OpenCV", "MediaPipe", "CNN", "TensorFlow"],
    bulletPoints: [
      "Leading end-to-end development of real-time Indonesian Sign Language recognition",
      "High-performance backend with FastAPI as integration layer",
      "Optimized real-time data processing using OpenCV & MediaPipe for hand landmarks",
    ],
  },
  {
    title: "Indonesian Traffic Sign Recognition",
    github: "https://github.com/arrel123/RambuID",
    image: rambuidImg,
    tech: ["Flutter", "TensorFlow Lite", "CNN", "Python"],
    bulletPoints: [
      "End-to-end ML pipeline: preprocessing, training, evaluation",
      "Custom CNN model deployed into Flutter mobile app",
      "Seamless on-device performance with TensorFlow Lite",
    ],
  },
  {
    title: "Internet Cafe Management App",
    github: "https://github.com/achul-cos/project-matrix-pbl",
    image: matrixImg,
    tech: ["Laravel", "MySQL", "PHP", "Tailwind"],
    bulletPoints: [
      "Real-time billing engine to automate operational processes",
      "Role-Based Access Control (RBAC) for admin & operator",
      "Secure data integrity with MySQL",
    ],
  },
  {
    title: "Boarding House Management Website",
    github: "https://github.com/nabilamayasfr/kostku.web",
    image: kostkuImg,
    tech: ["Laravel", "MySQL", "Bootstrap"],
    bulletPoints: [
      "Full-stack platform with CRUD & secure authentication",
      "Automated financial reporting dashboard",
      "Monthly revenue monitoring & data-driven insights",
    ],
  },
];

/* =========================
   CERTIFICATES
========================= */
const certificates = [
  {
    id: 1,
    title: "AI Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "February 2026",
    driveLink:
      "https://drive.google.com/file/d/1-XzXDJ5XBc15wFmYuRLGcwW5L1jnh7kV/view?usp=sharing",
    description:
      "Learned basic AI concepts, including data processing and simple machine learning algorithms.",
  },
  {
    id: 2,
    title: "Deep Learning Fundamentals",
    issuer: "Dicoding Indonesia",
    date: "May 2026",
    driveLink:
      "https://drive.google.com/file/d/1KR4qmAw3jAv8PEwcxtmX1UzPmNPqbZbW/view?usp=sharing",
    description:
      "Explored neural networks, backpropagation, and TensorFlow implementation for deep learning.",
  },
  {
    id: 3,
    title: "Appropriate Technology Competition",
    issuer: "Department of Social Affairs and Community Empowerment, Batam City",
    date: "April 2023",
    driveLink:
      "https://drive.google.com/file/d/12mPHKGDvxukCtQQSVaKN9kFIIMPTSu8V/view?usp=sharing",
    description:
      "2nd Place in a national competition with an automatic seed planter innovation.",
  },
  {
    id: 4,
    title: "Machine Learning",
    issuer: "Dicoding Indonesia",
    date: "April 2026",
    driveLink:
      "https://drive.google.com/file/d/1QCk1zG8Ly8BMb_cqKUHdxqkNl3J86ax-/view?usp=sharing",
    description:
      "Covered supervised & unsupervised learning, model evaluation, and feature engineering.",
  },
  {
    id: 5,
    title: "Programming with Python",
    issuer: "Dicoding Indonesia",
    date: "February 2026",
    driveLink:
      "https://drive.google.com/file/d/1gGK2t0IuyV0boWNOnv2dCm6wCVtm04Lv/view?usp=sharing",
    description:
      "Python basics, data structures, OOP, and libraries for data science.",
  },
];

/* =========================
   TECH STACK
========================= */
const techStacks = [
  { icon: "python.jpg", language: "Python" },
  { icon: "php.png", language: "PHP" },
  { icon: "dart.png", language: "Dart" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "laravel.png", language: "Laravel" },
  { icon: "flutter.png", language: "Flutter" },
  { icon: "FastAPI.png", language: "FastAPI" },
  { icon: "tensorflow.png", language: "TensorFlow" },
  { icon: "opencv.png", language: "OpenCV" },
  { icon: "MySQL.png", language: "MySQL" },
  { icon: "Git.png", language: "Git" },
  { icon: "figma.png", language: "Figma" },
];

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
   PROJECT CARD
========================= */
const ProjectCard = ({ project, index }) => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={index * 100}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 group h-full flex flex-col"
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>

        {/* FOTO PROJECT DI BAWAH JUDUL */}
        <div className="mt-5 w-full h-56 rounded-2xl overflow-hidden bg-white border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="mt-5 space-y-2 flex-grow">
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
   CERTIFICATE CARD
========================= */
const CertificateCard = ({ certificate, index }) => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={index * 100}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 group h-full flex flex-col"
    >
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

        <div className="mt-6">
          <a
            href={certificate.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:scale-105 transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            View Certificate
          </a>
        </div>
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
            <h4 className="text-xl font-bold text-white">
              Dicoding x DBS Foundation
            </h4>
            <p className="text-gray-300 text-sm">
              AI Engineer Bootcamp (Feb 2026 - Present)
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">
              Completed modules: ML, Deep Learning, Computer Vision with
              TensorFlow
            </p>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-gray-300 text-sm">
              Capstone project: AI-based CV analysis for curriculum vitae
              evaluation
            </p>
          </div>
        </div>
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
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>

        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my projects, certifications, and technical expertise from my
          learning journey.
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
            <Tab
              icon={<Code className="mb-2 w-5 h-5" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
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

        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {certificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </div>
          </div>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="container mx-auto pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {techStacks.map((stack, index) => (
                <div key={index} data-aos="fade-up" data-aos-duration="1000">
                  <TechStackIcon
                    TechStackIcon={stack.icon}
                    Language={stack.language}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}