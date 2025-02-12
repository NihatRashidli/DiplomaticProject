import React from "react";
import "./Opportunity.scss";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegFolder } from "react-icons/fa6";
import { IoLayersOutline } from "react-icons/io5";

const Opportunity = () => {
  const challenges = [
    {
      title: "Repetitive tasks",
      description:
        "Audit and Finance teams waste valuable time on tedious and repetitive tasks",
      icon: <CiCircleCheck />,
    },
    {
      title: "Documentation chaos",
      description:
        "Sharing, reviewing, and validating financial evidence is complex and chaotic",
      icon: <FaRegFolder />,
    },
    {
      title: "Increased risk",
      description:
        "Mounting reporting needs and increasing demands drive error blindness",
      icon: <IoLayersOutline />,
    },
  ];

  return (
    <div className="opportunity-section">
      <div className="opportunity-header">
        <span className="opportunity-badge">OPPORTUNITY</span>
        <h2>Navigating key challenges</h2>
      </div>

      <div className="opportunity-content">
        <div className="challenges">
          {challenges.map((challenge, index) => (
            <div key={index} className="challenge-card">
              <div className="challenge-icon">{challenge.icon}</div>
              <div className="challenge-text">
                <h3>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="opportunity-image">
          <img
            src="../src/assets/images/audit-header.avif"
            alt="Person working on laptop"
          />
        </div>
      </div>
    </div>
  );
};

export default Opportunity;
