import React, { use, useState } from "react";

interface SliderProps {
  id: string;
  test: string;
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

const Slider: React.FC<SliderProps> = ({ id, test: metric, emojiRate, levelRate, onLevelChange, onEmojiChange }) => {
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
      <h1>{metric}</h1>
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
