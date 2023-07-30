import React, { useState } from "react";

interface SliderProps {
  id: string;
  metric: string;
  rate: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    metric: string
  ) => void; // Modify this line
}

const Slider: React.FC<SliderProps> = ({ id, metric, rate, onChange }) => {
  // Modify this line
  const [value, setValue] = useState(String(rate));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event, metric); // Pass the id to the onChange function
  };

  // Change the slider color when slider value is changed
  const getLevelColor = (level: string): string => {
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

  // Change the emoji when slider value is changed
  const getLevelEmoji = (level: string): string => {
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
      <div className="slider-emoji" style={{ fontSize: "50px" }}>
        {getLevelEmoji(value)}
      </div>
      {/**Slider for emoji */}
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        className={`slider level-${value}`}
        onChange={handleChange}
        style={{ background: getLevelColor(value), marginTop: "20px" }}
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
