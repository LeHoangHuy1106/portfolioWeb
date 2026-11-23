import React, { useState } from "react";
import "../styles/Home.css";
import Profile from "./Profile";
import Project from "./Project";
import Contact from "./Contact";
import DetailGame from "./DetailGame";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Profile");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const renderContent = () => {
    if (selectedGame) {
      return <DetailGame gameName={selectedGame} onBack={() => setSelectedGame(null)} />;
    }

    switch (selectedOption) {
      case "Profile":
        return <Profile />;
      case "Project":
        return <Project onSelectGame={(gameName: string) => setSelectedGame(gameName)} />;
      case "Contact":
        return <Contact />;
      case "MyCV":
        window.open("/assets/pdf/CV Lê Hoàng Huy - Game Developer.pdf", "_blank"); // Replace with the actual path to your CV
        setSelectedOption("Profile"); // Reset to Profile after opening CV
        return null;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="home-container">
      {/* Sidebar cho màn hình lớn */}
      <div className="sidebar">
        <div className="logo">
          <img src="/assets/Images/logo.jpg" alt="Logo" />
        </div>
        <ul>
          <li
            className={selectedOption === "Profile" ? "active" : ""}
            onClick={() => {
              setSelectedOption("Profile");
              setSelectedGame(null);
            }}
          >
            <i className="bi bi-person" />
            <button className="link-button">Profile</button>
          </li>
          <li
            className={selectedOption === "Project" ? "active" : ""}
            onClick={() => {
              setSelectedOption("Project");
              setSelectedGame(null);
            }}
          >
            <i className="bi bi-briefcase" />
            <button className="link-button">Project</button>
          </li>
          <li
            className={selectedOption === "Contact" ? "active" : ""}
            onClick={() => {
              setSelectedOption("Contact");
              setSelectedGame(null);
            }}
          >
            <i className="bi bi-envelope" />
            <button className="link-button">Contact</button>
          </li>
          <li
            className={selectedOption === "MyCV" ? "active" : ""}
            onClick={() => {
              setSelectedOption("MyCV");
              setSelectedGame(null);
            }}
          >
            <i className="bi bi-file-earmark-text" />
            <button className="link-button">My CV</button>
          </li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="content">{renderContent()}</div>

      {/* Tab Bar cho màn hình nhỏ */}
      <div className="tab-bar">
        <button
          className={selectedOption === "Profile" ? "active" : ""}
          onClick={() => {
            setSelectedOption("Profile");
            setSelectedGame(null);
          }}
        >
          <i className="bi bi-person"></i>
          <span>Profile</span>
        </button>
        <button
          className={selectedOption === "Project" ? "active" : ""}
          onClick={() => {
            setSelectedOption("Project");
            setSelectedGame(null);
          }}
        >
          <i className="bi bi-briefcase"></i>
          <span>Project</span>
        </button>
        <button
          className={selectedOption === "Contact" ? "active" : ""}
          onClick={() => {
            setSelectedOption("Contact");
            setSelectedGame(null);
          }}
        >
          <i className="bi bi-envelope"></i>
          <span>Contact</span>
        </button>
        <button
          className={selectedOption === "MyCV" ? "active" : ""}
          onClick={() => {
            setSelectedOption("MyCV");
            setSelectedGame(null);
          }}
        >
          <i className="bi bi-file-earmark-text"></i>
          <span>My CV</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
