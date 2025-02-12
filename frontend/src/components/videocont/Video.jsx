import React from "react";
import "./Video.scss";

const Video = () => {
  return (
    <div className="video-section">
      <div className="container">
        <div className="video-container-first">
          <video className="video" autoPlay loop muted>
            <source
              src="../src/assets/images/automation-feature-demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="text-content">
            <h2>
              Maximize efficiency with{" "}
              <span className="highlight">automation</span>
            </h2>
            <p>
              Multiply your efforts, while staying in control. Eliminate
              repetitive tasks at scale.
            </p>
            <blockquote>
              "DataSnipper provides major efficiency improvements and is
              offering features that truly support our teams in delivering
              high-quality work."
            </blockquote>
            <p className="author">
              Mathias Bunge <br /> Partner, Deloitte.
            </p>
          </div>
        </div>

        <div className="video-container-second">
          <video className="video" autoPlay loop muted>
            <source
              src="../src/assets/images/collaboration-feature-demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="text-content">
            <h2>
              Drive impact with <span className="highlight">collaboration</span>
            </h2>
            <p>
              Drive collaboration with a single source of truth by connecting
              the dots in one workspace.
            </p>
            <blockquote>
              "DataSnipper consolidates my workpaper into a single Excel file
              which made the testing workpaper much more presentable to the
              reviewers."
            </blockquote>
            <p className="author">
              Jun Park <br /> International Auditor, MarketAxess.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
