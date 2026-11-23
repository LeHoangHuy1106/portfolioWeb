import React from "react";
import { useNavigate } from "react-router-dom";
import ListGame from "../Config/listGameData"; // Import danh sách game
import "../styles/DetailGame.css"; // Import file CSS

interface DetailGameProps {
  gameName: string; // Tên game được truyền từ Home
  onBack: () => void; // Hàm callback để quay lại danh sách
}

const DetailGame: React.FC<DetailGameProps> = ({ gameName, onBack }) => {
  const navigate = useNavigate();
  const game = ListGame.find((g) => g.gameName === gameName); // Tìm game theo tên

  if (!game) {
    return (
      <div className="detail-container">
        <h2>Game Not Found</h2>
        <button className="back-button" onClick={() => navigate("/")}>← Back to List</button>
      </div>
    );
  }

  const galleryClass = game.isLandscape ? "landscape" : "portrait";

  return (
    <div className="detail-container">
      {/* Banner */}
      {game.banner && (
        <div className="banner-container">
          <img src={game.banner} alt={`${game.gameName} Banner`} className="game-banner" />
        </div>
      )}

      {/* Tiêu đề và biểu tượng */}
      <div className="icon-container">
        <h1 className="detail-title">{game.gameName}</h1>
        {game.icon && <img src={game.icon} alt={game.gameName} className="detail-icon" />}

        {/* Nút quay lại */}
        <button className="back-button" onClick={onBack}>
          ← Back to Projects
        </button>
      </div>

      {/* Thông tin chi tiết */}
      <div className="detail-info">
        <div className="detail-info-row">
          <i className="bi bi-tags-fill detail-info-icon"></i>
          <div className="detail-info-content">
            <div className="detail-info-title">Category</div>
            <div className="detail-info-text">{game.category}</div>
          </div>
        </div>
        <div className="detail-info-row">
          <i className="bi bi-phone detail-info-icon"></i>
          <div className="detail-info-content">
            <div className="detail-info-title">Platform</div>
            <div className="detail-info-text">{game.platform.join(", ")}</div>
          </div>
        </div>
        <div className="detail-info-row">
          <i className="bi bi-info-circle detail-info-icon"></i>
          <div className="detail-info-content">
            <div className="detail-info-title">Description</div>
            <div className="detail-info-text">{game.description}</div>
          </div>
        </div>
        <div className="detail-info-row">
          <i className="bi bi-clock-fill detail-info-icon"></i>
          <div className="detail-info-content">
            <div className="detail-info-title">Duration</div>
            <div className="detail-info-text">{game.duration}</div>
          </div>
        </div>
        <div className="detail-info-row">
          <i className="bi bi-people-fill detail-info-icon"></i>
          <div className="detail-info-content">
            <div className="detail-info-title">Team Size</div>
            <div className="detail-info-text">{game.teamSize}</div>
          </div>
        </div>
        <div className="detail-info-row">
          <i className="bi bi-link-45deg detail-info-icon"></i>
          <div className="detail-info-content">
            <div className="detail-info-title">Demo</div>
            {game.link ? (
              <a
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-button demo-button"
              >
                View Demo
              </a>
            ) : (
              <div className="detail-info-text">Not yet updated</div>
            )}
          </div>
        </div>
      </div>

      {/* Bộ sưu tập hình ảnh */}
      <div className={`image-gallery ${galleryClass}`}>
        {game.images.map((image, index) => (
          <img key={index} src={image} alt={`${game.gameName} screenshot ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default DetailGame;
