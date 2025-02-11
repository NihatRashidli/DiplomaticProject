import React from "react";
import "./Hero.scss";

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <div className="container">
          <div className="row">
            <div className="hero-title">
              <div className="col-md-6">
                <h1>Accelerated productivity for Audit and Finance</h1>
              </div>
              <div className="col-md-6">
                <p>
                  Extract, cross-reference and verify data with the Intelligent
                  Automation Platform in Excel
                </p>
                <button className="btn btn-primary">Tax Calculate</button>
              </div>
            </div>

            <div className="hero-content">
              <div className="image-gallery">
                <div className="gallery-item">
                  <img src="../src/assets/images/Deloitte.svg" alt="Deloitte" />
                </div>
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/669e662873457bffd8de4b0a_Client_Siemens_Healthineers.svg"
                    alt="Siemens Healthineers"
                  />
                </div>
                <div className="gallery-item">
                  <img src="../src/assets/images/RSM.svg" alt="RSM" />
                </div>
                <div className="gallery-item">
                  <img src="../src/assets/images/BDO.svg" alt="BDO" />
                </div>
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/Grant_Thornton.svg"
                    alt="Grant Thornton"
                  />
                </div>
                <div className="gallery-item">
                  <img src="../src/assets/images/Barclays.svg" alt="Barclays" />
                </div>
              </div>
              <div className="additional-images">
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/The_ODP_Corporation.svg"
                    alt="The ODP Corporation"
                  />
                </div>
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/Morghan_Stanley.svg"
                    alt="Morgan Stanley"
                  />
                </div>
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/Kaiser_Permanente.svg"
                    alt="Kaiser Permanente"
                  />
                </div>
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/BlueCross_BlueShield.svg"
                    alt="BlueCross BlueShield"
                  />
                </div>
                <div className="gallery-item">
                  <img
                    src="../src/assets/images/Queensland_Audit_Office.svg"
                    alt="Queensland Audit Office"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
