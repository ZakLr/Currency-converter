import React, { useState } from "react";

const DropdownForm = ({ options, setCurrency }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(!isOpen);
    setCurrency(option);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={() => setIsOpen(!isOpen)}>
        Click to Select <span>...</span>
      </button>

      <div className="dropdown-content">
        {options.map((option, index) => (
          <p
            key={index}
            className={`dropdown-item ${
              option === selectedOption ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </p>
        ))}
      </div>
      {selectedOption && <p>Selected Option: {selectedOption}</p>}
    </div>
  );
};

export default DropdownForm;
