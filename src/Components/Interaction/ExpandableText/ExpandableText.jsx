import { useState } from "react";
import "./ExpandableText.css";

const ExpandableText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`expandable-text ${isExpanded ? "expanded" : ""}`}>
      <p cl>{isExpanded ? text : `${text.substring(0, maxLength)}...`}</p>
      <button onClick={toggleExpand}>
        {isExpanded ? "Mostrar menos" : "Mostrar más"}
      </button>
    </div>
  );
};

export default ExpandableText;
