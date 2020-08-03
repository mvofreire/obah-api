import React from "react";

const Section = ({ children, position, color }) => (
  <section
    style={{
      background: color,
      padding: "20px",
      minHeight: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: position === "left" ? "flex-start" : "flex-end",
    }}
  >
    {children}
  </section>
);

const Home = ({ props }) => (
  <div>
    <Section position="left" color="#f1f1f1">
      a
    </Section>
    <Section position="right" color="#fff">
      b
    </Section>
    <Section position="left" color="#f1f1f1">
      c
    </Section>
    <Section position="right" color="#fff">
      d
    </Section>
  </div>
);

export default Home;
