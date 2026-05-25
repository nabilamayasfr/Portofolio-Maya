/* ============================== IMPORT ============================== */
import React, { useEffect } from "react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ============================== COMPONENT ============================== */
const ContactPage = () => {
  /* ============================== EFFECTS ============================== */
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  /* ============================== DATA KONTAK ============================== */
  const contactCards = [
    {
      id: 1,
      title: "Email",
      value: "nabilamayasfr@gmail.com",
      icon: Mail,
      link: "mailto:nabilamayasfr@gmail.com",
      color: "from-red-500 to-orange-500",
    },
    {
      id: 2,
      title: "GitHub",
      value: "@nabilamayasfr",
      icon: Github,
      link: "https://github.com/nabilamayasfr",
      color: "from-gray-700 to-gray-900",
    },
    {
      id: 3,
      title: "LinkedIn",
      value: "Nabila Maya Shafira",
      icon: Linkedin,
      link: "https://www.linkedin.com/in/nabila-m-654b12308/",
      color: "from-blue-600 to-blue-800",
    },
    {
      id: 4,
      title: "Instagram",
      value: "@nabilamayasfr_",
      icon: Instagram,
      link: "https://www.instagram.com/nabilamayasfr_/",
      color: "from-pink-500 to-purple-600",
    },
  ];

  /* ============================== RENDER ============================== */
  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%]">
      {/* Header */}
      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
        >
          <span
            style={{
              backgroundImage: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Hubungi Saya
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Terhubung dengan saya melalui platform di bawah ini. Saya akan senang mendengar dari Anda!
        </p>
      </div>

      {/* 4 Card Kontak - hanya ini, tidak ada tambahan apapun di bawahnya */}
      <div className="h-auto py-10 flex items-center justify-center" id="Contact">
        <div className="container px-[1%] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, index) => (
              <div
                key={card.id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 100}
                className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 hover:scale-[1.02] transition-all duration-500 hover:shadow-lg hover:shadow-[#6366f1]/20"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4">{card.title}</h3>
                  <p className="text-gray-300 text-sm mt-2 break-all">{card.value}</p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 px-5 py-2 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Hubungi
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* TIDAK ADA APAPUN DI SINI - sudah bersih dari card tambahan */}
        </div>
      </div>
    </div>
  );
};

/* ============================== EXPORT ============================== */
export default ContactPage;