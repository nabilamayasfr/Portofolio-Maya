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
import { Code, Award, Boxes, Github, Calendar, Building, ExternalLink } from "lucide-react";
import PropTypes from "prop-types";

/* =========================
   DATA PROYEK (4 PROYEK)
========================= */
const projects = [
  {
    title: "SignLearn AI",
    description: "Interactive sign language learning system using Computer Vision and AI.",
    image: "/projects/signlearn.png",
    github: "https://github.com/nabilamayasfr/signlearn-ai",
    tech: ["React", "FastAPI", "MediaPipe"],
  },
  {
    title: "Matrix Warnet",
    description: "Web-based internet cafe rental management system.",
    image: "/projects/matrix.png",
    github: "https://github.com/nabilamayasfr/matrix-warnet",
    tech: ["Laravel", "MySQL", "Tailwind"],
  },
  {
    title: "Portfolio 3D",
    description: "3D interactive portfolio website with Three.js and modern animations.",
    image: "/projects/portfolio3d.png",
    github: "https://github.com/nabilamayasfr/3d-portfolio",
    tech: ["Three.js", "React", "Tailwind"],
  },
  {
    title: "EcoChain",
    description: "Blockchain-based supply chain tracking for sustainable products.",
    image: "/projects/ecochain.png",
    github: "https://github.com/nabilamayasfr/ecochain",
    tech: ["Solidity", "Ethereum", "Next.js"],
  },
];

/* =========================
   DATA SERTIFIKAT (5 SERTIFIKAT)
========================= */
const certificates = [
  {
    id: 1,
    title: "Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "June 1, 2025",
    image: "/certificates/azure-ai.jpg",
  },
  {
    id: 2,
    title: "Dev Cert for Machine Learning with TensorFlow",
    issuer: "dev.cert by dev.id",
    date: "May 19, 2025",
    image: "/certificates/tensorflow-dev.jpg",
  },
  {
    id: 3,
    title: "Cloud Computing",
    issuer: "Alibaba Cloud",
    date: "May 22, 2024",
    image: "/certificates/alibaba-cloud.jpg",
  },
  {
    id: 4,
    title: "Junior Web Developer",
    issuer: "BNSP (LSP Informatika)",
    date: "October 20, 2023",
    image: "/certificates/junior-web.jpg",
  },
  {
    id: 5,
    title: "LASKAR AI 2025",
    issuer: "AI Engineer Program",
    date: "February 2025 - July 2025",
    image: "/certificates/laskar-ai.jpg",
    description: "Intensive program with practical skills in data preprocessing, model development, and deployment using TensorFlow.",
  },
];

/* =========================
   TECH STACK
========================= */
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
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
   CARD PROYEK
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
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-400 mt-3 text-sm leading-relaxed flex-grow">
          {project.description}
        </p>
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
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white hover:scale-105 transition-all duration-300 w-fit"
        >
          <Github className="w-4 h-4" />
          View GitHub
        </a>
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
   BOOTCAMP INFO (Course Experience)
   - Menggunakan gaya card yang SAMA dengan card proyek
   - Tombol dengan ukuran SAMA dengan tombol "View GitHub"
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
            <p className="text-gray-300 text-sm">Bootcamp Program - Frontend & Backend Development</p>
          </div>
          <div className="text-sm text-gray-400">
            <span className="px-3 py-1 rounded-full bg-white/10">2025</span>
          </div>
        </div>
        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          Saya mengikuti bootcamp intensif yang diselenggarakan oleh <span className="text-purple-300 font-medium">Dicoding</span> bekerja sama dengan 
          <span className="text-purple-300 font-medium"> DBS Foundation</span>. Program ini fokus pada pengembangan aplikasi web modern 
          dengan teknologi terkini, serta membangun proyek-proyek kolaboratif yang siap industri.
        </p>
        {/* Tombol dengan ukuran dan style SAMA dengan tombol di card proyek */}
        <a
          href="#" // Ganti dengan link detail bootcamp jika ada
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
   MAIN COMPONENT (tanpa SwipeableViews)
========================= */
export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const initialProjectsCount = 4;
  const initialCertificatesCount = 5;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialProjectsCount);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialCertificatesCount);

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
          Explore my journey through projects, certifications, and technical expertise.
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar Tabs */}
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
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        {/* Tab Projects */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
          {projects.length > initialProjectsCount && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("projects")}
                isShowingMore={showAllProjects}
              />
            </div>
          )}

          {/* Course Experience Section - dengan card dan tombol yang SEBARIS */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-4">
              Course Experience
            </h3>
            <BootcampInfo />
          </div>
        </TabPanel>

        {/* Tab Certificates */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedCertificates.map((certificate, index) => (
                <CertificateCard key={certificate.id} certificate={certificate} index={index} />
              ))}
            </div>
          </div>
          {certificates.length > initialCertificatesCount && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("certificates")}
                isShowingMore={showAllCertificates}
              />
            </div>
          )}
        </TabPanel>

        {/* Tab Tech Stack */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                  }
                  data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                >
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