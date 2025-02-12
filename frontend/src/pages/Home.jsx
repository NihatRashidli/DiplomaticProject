import React from "react";
import Hero from "../components/hero/Hero";
import Audit from "../components/audit/Audit";
import Opportunity from "../components/opportunity/Opportunity";
import Solution from "../components/solution/Solution";
import Video from "../components/videocont/Video";

const Home = () => {
  return (
    <div>
      <Hero />
      <Audit />
      <Opportunity />
      <Solution />
      <Video />
    </div>
  );
};

export default Home;
