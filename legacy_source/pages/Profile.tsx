import React from 'react';
import '../styles/Porfile.css';
import ProgressBar from '../Components/ProgressBar';

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <div className="profile-banner-wrapper">
        <img
          src="/assets/Images/banner.jpg"
          alt="Banner"
          className="profile-banner"
        />
      </div>
      <div className="profile-content">
        <div className="profile-left">
          <div className="profile-avatar-wrapper">
            <img
              src="/assets/Images/avt.jpg"
              alt="Avatar"
              className="profile-avatar"
            />
          </div>
        </div>
        <div className="profile-right">
          <h1 className="profile-name-header animated-text">
            {Array.from("Lê Hoàng Huy").map((char, index) => (
              <span
                key={index}
                className="animated-letter"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p>
            “Focused on developing strong problem-solving skills, continuously improving programming logic and applying AI intelligently and effectively throughout the development process. Aiming to advance to a Middle Game Developer role, with the goal of building versatile, flexible, and engaging game projects across multiple genres.”
          </p>
        </div>
      </div>
      <div className="profile-contact">
        <div className="profile-info-header">
          <h2>Information</h2>
          <hr />
        </div>
        <div className="profile-info-wrapper">
          <ul className="profile-info-row">
            <li>
              <i className="bi bi-telephone large-icon" />
              <div className="info-text">08 68 781600</div>
            </li>
            <li>
              <i className="bi bi-envelope large-icon" />
              <div className="info-text">lehoanghuy11062001@gmail.com</div>
            </li>
            <li>
              <i className="bi bi-geo-alt large-icon" />
              <div className="info-text">District 7, Ho Chi Minh City</div>
            </li>
          </ul>
          <br></br><br></br><br></br>
          <ul className="profile-info-row">
            <li>
              <i className="bi bi-calendar large-icon" />
              <div className="info-text">11/06/2001</div>
            </li>
            <li>
              <i className="bi bi-person large-icon" />
              <div className="info-text">Male</div>
            </li>
<li>
  <i className="bi bi-globe large-icon" />
  <div className="info-text">
    Website: 
    <a 
      href="https://benkstudio.com" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ marginLeft: 6 }}
    >
      benkstudio.com
    </a>
  </div>
</li>
          </ul>
        </div>
      </div>
      <div className="profile-education">
        <div className="profile-education-header">
          <h2>Education</h2>
        </div>
        <div className="education-details">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/1/1b/T%C4%90T_logo.png"
          alt="Ton Duc Thang University Logo"
          className="university-logo"
        />
          <h3>TON DUC THANG UNIVERSITY</h3>
          <p className="degree">Software Engineering</p>
          <p className="duration">2019 - 2023</p>
          <p className="gpa">GPA: 7.85/10</p>
          <ProgressBar value={7.85} max={10.0} />
        </div>
      </div>
      <div className="profile-experience">
        <div className="profile-experience-header">
            <h2>Work Experience</h2>
          </div>
        <div className="experience-item">
          <h3>Freelance Game Developer (Team Lead)</h3>
          <p><strong>Company:</strong> Self-Employed</p>
          <p><strong>Time:</strong> 01/2024 - Present</p>
          <ul>
            <li>Led and managed a development team, assigning tasks based on team members’ strengths and ensuring project progress and quality.</li>
            <li>Planned and managed the full project lifecycle, from requirement analysis and solution design to development and delivery.</li>
            <li>Developed custom web and mobile game applications, focusing on performance, scalability, and user experience.</li>
            <li>Defined technical direction and system architecture to ensure maintainability and efficient development.</li>
            <li>Collaborated directly with clients to gather requirements, provide consultation, and deliver tailored solutions.</li>
            <li>Leveraged AI tools to optimize development workflows and improve team productivity.</li>
            <li>Proactively identified and resolved technical and project-related issues throughout development.</li>
          </ul>
        </div>
          <div className="experience-item">
            <h3>Unity Developer</h3>
            <p><strong>Company:</strong> OneChain Studio</p>
            <p><strong>Time:</strong> 02/2023 - 08/2023</p>
            <ul>
              <li>Developed mini-game applications on the Unity platform.</li>
              <li>Collaborated with cross-functional teams to ensure the quality of the final product.</li>
              <li>Conducted testing and debugging to resolve issues in the games.</li>
            </ul>
          </div>
          <div className="experience-item">
            <h3>Cocos Creator Developer</h3>
            <p><strong>Company:</strong> OneChain Studio</p>
            <p><strong>Time:</strong> 08/2023 - 04/2024</p>
            <ul>
              <li>Developed games for the web platform app.saworld.io using Cocos Creator, focusing on optimizing performance and user experience in game development.</li>
              <li>Built new features and functionalities based on project requirements.</li>
              <li>Collaborated with team members to develop innovative technical solutions.</li>
            </ul>
          </div>

      </div>
      <div className="profile-skill">
        <div className="profile-skill-header">
          <h2>Skills</h2>
        </div>
        <div className="profile-skill-language">
          <div className="language-title">
            <h3>Language</h3>
          </div>
          <div className="language-icons">
            <div className="language-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png" alt="C#" className="language-icon" />
              <span>C#</span>
            </div>
            <div className="language-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiOWiJ07iKcOZVrnlzWu_0oKnYMTjyrb5i2Q&s.png" alt="TypeScript" className="language-icon" />
              <span>TypeScript</span>
            </div>
            <div className="language-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="language-icon" />
              <span>Python</span>
            </div>
            <div className="language-item">
              <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="Java" className="language-icon" />
              <span>Java</span>
            </div>
          </div>
        </div>

        <div className="profile-skill-engine">
          <div className="engine-title">
            <h3>Engine</h3>
          </div>
          <div className="engine-icons">
            <div className="engine-item">
              <img src="https://cdn-icons-png.freepik.com/512/5969/5969346.png" alt="Unity" className="engine-icon" />
              <span>Unity</span>
            </div>
            <div className="engine-item">
              <img src="https://download.cocos.com/CocosWww/2021/09/CocosLogoTransparent.png" alt="Cocos Creator" className="engine-icon" />
              <span>Cocos Creator</span>
            </div>
          </div>
        </div>

        <div className="profile-skill-web">
          <div className="web-title">
            <h3>Web Development</h3>
          </div>
          <div className="web-icons">
            <div className="web-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXgAuAwfMMDkwZScsLkBAeZ4GjyfB7GtIzcA&s.png" alt="Express" className="web-icon" />
              <span>Express</span>
            </div>
            <div className="web-item">
              <img src="https://i0.wp.com/phocode.com/wp-content/uploads/2016/03/django-logo.png?fit=300%2C300&ssl=1.png" alt="Django" className="web-icon" />
              <span>Django</span>
            </div>
            <div className="web-item">
              <img src="https://www.svgrepo.com/show/331488/mongodb.svg" alt="MongoDB" className="web-icon" />
              <span>MongoDB</span>
            </div>
            <div className="web-item">
              <img src="https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg" alt="MySQL" className="web-icon" />
              <span>MySQL</span>
            </div>
            <div className="web-item">
              <img src="https://e7.pngegg.com/pngimages/170/924/png-clipart-microsoft-sql-server-microsoft-azure-sql-database-microsoft-text-logo.png" alt="SQL Server" className="web-icon" />
              <span>SQL Server</span>
            </div>
            <div className="web-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React TS" className="web-icon" />
              <span>React TS</span>
            </div>
            <div className="web-item">
              <img src="https://ezerus.com.au/wp-content/uploads/2019/05/nodejs-square-200.png" alt="Node Js" className="web-icon" />
              <span>React TS</span>
            </div>
          </div>
        </div>
         <div className="profile-skill-platform">
<div className="profile-skill-web">
  <div className="web-title">
    <h3>Platforms & Deployment</h3>
  </div>
  <div className="web-icons">

    <div className="web-item">
      <img src="https://didongthongminh.vn/images/news/resize/4185627-app-bo-chuyen-doi-tieng-viet-app-2-300x300-d98c22a0-2c6a-43a9-bfb1-aef996b3a649.png?version=1636963060" alt="Google Play" className="web-icon" />
      <span>Google Play</span>
    </div>

    <div className="web-item">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/App_Store_macOS.png" alt="App Store" className="web-icon" />
      <span>App Store</span>
    </div>

    <div className="web-item">
      <img src="https://store-images.s-microsoft.com/image/apps.54073.13902538874112719.524cfb4a-0a7d-45be-bae7-dc1bb3a1c4af.bfaf52ba-a25c-4b1d-b32b-07d3e5c8bb8e" alt="Microsoft Store" className="web-icon" />
      <span>Microsoft Store</span>
    </div>

    <div className="web-item">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png" alt="Telegram" className="web-icon" />
      <span>Telegram</span>
    </div>

    <div className="web-item">
      <img src="https://cdn-icons-png.flaticon.com/256/8945/8945634.png" alt="PC" className="web-icon" />
      <span>PC</span>
    </div>
    <div className="web-item">
      <img src="https://cdn.iconscout.com/icon/free/png-256/free-website-icon-svg-download-png-3395056.png?f=webp" alt="Website" className="web-icon" />
      <span>Website</span>
    </div>
  </div>
</div>

</div>   
        <div className="profile-skill-tool">
          <div className="tool-title">
            <h3>Tools</h3>
          </div>
          <div className="tool-icons">
            <div className="tool-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" alt="Figma" className="tool-icon" />
              <span>Figma</span>
            </div>
            <div className="tool-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="tool-icon" />
              <span>ChatGPT</span>
            </div>
                <div className="tool-item">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="tool-icon" />
      <span>GitHub</span>
    </div>
          </div>
        </div>

        <div className="profile-skill-game-types">
          <div className="game-types-title">
            <h3>Game Types</h3>
          </div>
          <div className="game-types-bubbles">
            <div className="game-type-bubble">Hypercasual Games</div>
            <div className="game-type-bubble">Casual Games</div>
            <div className="game-type-bubble">Web Games</div>
            <div className="game-type-bubble">App Games</div>
            <div className="game-type-bubble">Integrated Games</div>
          </div>
        </div>

<div className="profile-skill-programming">
  <div className="programming-title">
    <h3>Programming Skills</h3>
  </div>

  <div className="programming-cards">
    <div className="programming-card">
      Unity & C# (2D/3D game development), React / NextJS for web tools
    </div>

    <div className="programming-card">
      Mobile performance optimization (FPS, memory, draw calls) & debugging
    </div>

    <div className="programming-card">
      Game UX, player retention design & ads integration (AdMob, IronSource)
    </div>

    <div className="programming-card">
      Strong problem-solving mindset with persistence in complex situations
    </div>

    <div className="programming-card">
      Leverage AI to optimize development time, reduce cost, and accelerate thinking
    </div>

    <div className="programming-card">
      Team collaboration with designers/testers & effective project execution
    </div>
  </div>
</div>

      </div>


    </div>
  );
};

export default Profile;
