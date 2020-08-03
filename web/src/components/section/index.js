import React from "react";
import SectionContent from "./section-content";

const Section = ({ name, ...rest }) => (
  <div {...rest} data-section-name={name} />
);

export { Section };
export { SectionContent };
export { SectionContentAdminHeader } from './section-admin-header'