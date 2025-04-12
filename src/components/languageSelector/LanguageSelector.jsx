import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../../constaints";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="language-selector">
      <button
        onClick={toggleMenu}
        style={{
          backgroundColor: "#393053",
          color: "grey",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "8px",
          fontSize: "14px",
        }}
      >
        {language.toUpperCase()}
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#393053",
            border: "1px solid #393053",
            borderRadius: "4px",
            marginTop: "4px",
            zIndex: 1000,
          }}
        >
          {languages.map(([lang, version]) => (
            <div
              key={lang}
              onClick={() => {
                onSelect(lang);
                setIsOpen(false);
              }}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                color: lang === language ? "white" : "grey",
                backgroundColor: "#393053",
                hover: {
                  backgroundColor: "#4E31AA",
                  color: "lightgrey",
                },
              }}
            >
              {lang.toUpperCase()} &nbsp;
              <span style={{ color: lang === language ? "white" : "grey" }}>
                {version}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
