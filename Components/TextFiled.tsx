import React, { ChangeEvent } from "react";

interface TextFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ value, onChange }) => {
  return (
    <div className="textfield">
      <div className="text-field-container">
        <label className="text-field-label">Text</label>
        <textarea rows={5} value={value} onChange={onChange} />
      </div>

      <div className="text-field-tooltip">
        <p>Explanation for the text field</p>
      </div>
    </div>
  );
};

export default TextField;
