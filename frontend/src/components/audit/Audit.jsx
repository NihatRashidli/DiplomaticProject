import React from "react";
import "./Audit.scss";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CgInternal } from "react-icons/cg";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { VscSourceControl } from "react-icons/vsc";
import { RiGovernmentLine } from "react-icons/ri";
import { WiSmallCraftAdvisory } from "react-icons/wi";
import { GrOverview } from "react-icons/gr";

const Audit = () => {
  const auditCategories = [
    { name: "External Audit", icon:  <FaExternalLinkAlt /> },
    { name: "Internal Audit", icon: <CgInternal /> },
    { name: "Tax", icon: <HiOutlineReceiptTax /> },
    { name: "Financial Control", icon: <VscSourceControl /> },
    { name: "Government Audit", icon: <RiGovernmentLine /> },
    { name: "Advisory", icon: <WiSmallCraftAdvisory /> },
    { name: "Audit Overview", icon: <GrOverview /> },
  ];

  return (
    <div className="audit-section">
      <div className="audit-stats">
        <div className="stat">
          <h2>
            <span>3x</span>
          </h2>
          <p>Collaboration Efficiency</p>
        </div>
        <div className="stat">
          <h2>
            <span>90%</span>
          </h2>
          <p>Menial Tasks Eliminated</p>
        </div>
        <div className="stat">
          <h2>
            <span>50%</span>
          </h2>
          <p>Cost Reduction</p>
        </div>
      </div>

      <div className="audit-content">
        <h2>Audit and Finance teams excel with DataSnipper</h2>
        <div className="audit-cards">
          {auditCategories.map((category, index) => (
            <div key={index} className="audit-card">
              <div className="audit-icon">
                <i>
                  {category.icon}
                </i>
              </div>
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Audit;
