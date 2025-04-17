import { useState } from "react";
import { LANGUAGE_VERSIONS } from "../constaints";
import styles from "./LanguageSelector.module.css";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.languageSelector}>
      <button 
        onClick={toggleMenu}
        className={styles.selectorButton}
        style={{
          backgroundColor: "#393053",
          color: "grey",
          padding: "8px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "8px",
          fontSize: "14px"
        }}
      >
        {language.toUpperCase()}
      </button>
      
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {languages.map(([lang, version]) => (
            <div
              key={lang}
              onClick={() => {
                onSelect(lang);
                setIsOpen(false);
              }}
              className={styles.languageOption}
              style={{
                padding: "8px 16px",
                cursor: "pointer",
                color: lang === language ? "white" : "grey",
                backgroundColor: "#393053"
              }}
            >
              {lang.toUpperCase()} &nbsp;
              <span className={styles.versionText}>
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
