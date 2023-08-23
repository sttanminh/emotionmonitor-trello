import React, { use, useState } from "react";

interface SliderProps {
  id: string;
  metric: string;
  emojiRate: number;
  levelRate: number;
  onLevelChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    metric: string
  ) => void;
  onEmojiChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    metric: string
  ) => void;
}

const Slider: React.FC<SliderProps> = ({ id, metric, emojiRate, levelRate, onLevelChange, onEmojiChange }) => {
  // Modify this line
  const [emojiValue, setEmojiValue] = useState(String(emojiRate));
  const [levelValue, setLevelValue] = useState(String(levelRate));

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLevelValue(event.target.value);
    onLevelChange(event, metric);
  };

  const handleEmojiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmojiValue(event.target.value);
    onEmojiChange(event, metric);
  };

  // Change the slider color when slider value is changed
  const getEmojiSliderColor = (level: string): string => {
    switch (level) {
      case "1":
        return "#c41e3a"; // Dark red
      case "2":
        return "#ffa940"; // Orange
      case "3":
        return "#b8b800"; // Yellow
      case "4":
        return "#52c41a"; // Green
      case "5":
        return "#1890ff"; // Blue
      default:
        return "#ffffff"; // Default (white)
    }
  };

  // Change the slider color when slider value is changed
  const getLvSliderColor = (level: string): string => {
    switch (level) {
      case "1":
        return "#c41e3a"; // Dark red
      case "2":
        return "#b8b800"; // Yellow
      case "3":
        return "#1890ff"; // Blue
      default:
        return "#ffffff"; // Default (white)
    }
  };

  // Change the emoji when slider value is changed
  const getEmoji = (level: string): string => {
    switch (level) {
      case "1":
        return "😔"; // Very sad
      case "2":
        return "😢"; // Sad
      case "3":
        return "😐"; // Ok
      case "4":
        return "😊"; // Happy
      case "5":
        return "😀"; // Very happy
      default:
        return "🤔"; // Slider (default)
    }
  };

  return (
    <div className="slider-container">
      <div className="header">
        <h1>{metric}</h1>
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="12" cy="12" r="9" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><rect height="0.01" stroke="#292929" stroke-linejoin="round" stroke-width="3" width="0.01" x="12" y="16"></rect><path d="M10.5858 7.58572C10.9754 7.1961 11.4858 7.00083 11.9965 6.99994C12.5095 6.99904 13.0228 7.1943 13.4142 7.58572C13.8047 7.97625 14 8.48809 14 8.99994C14 9.51178 13.8047 10.0236 13.4142 10.4141C13.0228 10.8056 12.5095 11.0008 11.9965 10.9999L12 11.9999" stroke="#292929" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></g></svg>
        <div className="tooltip">Change the <strong>first slider</strong> to reflect the complexity of the metric. Change the <strong>second slider</strong> to change the emoji to reflect your emotion</div>
      </div>
      <div className="slider-emoji" style={{ fontSize: "40px" }}>
        {getEmoji(emojiValue)}
      </div>
      {/**Slider for metric level (high, medium, low) */}
      <input
        type="range"
        min="1"
        max="3"
        className={`slider level-${2 * parseInt(levelValue) - 1}`}
        value={levelValue}
        onChange={handleLevelChange}
        style={{ background: getLvSliderColor(levelValue) }}
      />
      <div className="slider-scale">
        <div className="scale-level">Low</div>
        <div className="scale-level">Medium</div>
        <div className="scale-level">High</div>
      </div>
      {/**Slider for emoji */}
      <input
        type="range"
        min="1"
        max="5"
        value={emojiValue}
        className={`slider level-${emojiValue}`}
        onChange={handleEmojiChange}
        style={{ background: getEmojiSliderColor(emojiValue), marginTop: "20px" }}
      />
      <div className="slider-scale">
        <div className="scale-level">1</div>
        <div className="scale-level">2</div>
        <div className="scale-level">3</div>
        <div className="scale-level">4</div>
        <div className="scale-level">5</div>
      </div>
    </div>
  );
};

export default Slider;
