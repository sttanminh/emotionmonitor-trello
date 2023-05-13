import React from "react";

interface ReflectionBoxProps {
  onContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReflectionBox: React.FC<ReflectionBoxProps> = ({ onContentChange }) => {
  return (
    <div className="reflection-box-container">
      <textarea
        onChange={onContentChange}
        className="box text-box"
        placeholder="Enter your thought"
      ></textarea>
      <div className="box recommendation-box">Recommendation goes here</div>
    </div>
  );
};

export default ReflectionBox;