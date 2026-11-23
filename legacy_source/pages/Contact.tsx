import React from "react";
import '../styles/Contact.css';

import { FaTelegram, FaFacebook, FaYoutube, FaGithub, FaDiscord, FaPhone } from "react-icons/fa";
import { SiZalo, SiTiktok } from "react-icons/si";

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-grid">
        <a href="https://telegram.me/Lhhuy_dev" target="_blank" rel="noopener noreferrer">
          <FaTelegram className="contact-icon telegram" />
        </a>
        <a href="https://www.facebook.com/BCA.mai.mai/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="contact-icon facebook" />
        </a>
        <a href="https://zalo.me/0868781600" target="_blank" rel="noopener noreferrer">
          <SiZalo className="contact-icon zalo" />
        </a>
        <a href="https://www.youtube.com/@sakalisofbna548" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="contact-icon youtube" />
        </a>
        <a href="https://github.com/LeHoangHuy1106" target="_blank" rel="noopener noreferrer">
          <FaGithub className="contact-icon github" />
        </a>
        <a href="https://discord.gg/yourdiscord" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="contact-icon discord" />
        </a>
        <a href="https://www.tiktok.com/@yourusername" target="_blank" rel="noopener noreferrer">
          <SiTiktok className="contact-icon tiktok" />
        </a>
        <a href="tel:+1234567890">
          <FaPhone className="contact-icon phone" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
