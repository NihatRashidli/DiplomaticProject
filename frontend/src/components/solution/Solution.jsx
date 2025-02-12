import React, { useState } from "react";
import "./Solution.scss";

const Solution = () => {
  const [activeTab, setActiveTab] = useState("documentMatching");

  const features = {
    documentMatching: {
      title: "Document Matching",
      description: "Automatically match Excel data with supporting documents.",
      image: "../src/assets/images/document_matching@2x.avif",
    },
    formExtraction: {
      title: "Form Extraction",
      description:
        "Extract relevant data from forms automatically, reducing manual work.",
      image: "../src/assets/images/form-extraction.avif",
    },
    tableSnip: {
      title: "Table Snip",
      description:
        "Quickly capture table data from documents and import it into Excel.",
      image: "../src/assets/images/table-snip.avif",
    },
  };

  return (
    <div className="solution-section">
      <div className="solution-header">
        <span className="solution-badge">Solution</span>
        <h2>Reduce risk</h2>
        <h2>Maximize productivity</h2>
        <p>
          Extract, cross-reference and verify data like never before. Win back
          time to focus on discrepancies and high-value activities.
        </p>
      </div>

      <div className="feature-tabs">
        {Object.keys(features).map((key) => (
          <button
            key={key}
            className={activeTab === key ? "active" : ""}
            onClick={() => setActiveTab(key)}
          >
            {features[key].title}
          </button>
        ))}
      </div>

      <p className="feature-description">{features[activeTab].description}</p>

      <div className="feature-image">
        <img src={features[activeTab].image} alt={features[activeTab].title} />
      </div>

      <a href="#" className="explore-link">
        Explore platform →
      </a>
    </div>
  );
};

export default Solution;
