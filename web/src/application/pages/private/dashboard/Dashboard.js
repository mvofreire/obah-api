import React, { Fragment, Component } from "react";
import { SectionContentAdminHeader } from "components";

export default class Dashboard extends Component {
  state = {};

  render() {
    const { data } = this.state;

    return (
      <SectionContentAdminHeader title="Dashboard" justify="center">
        teste
      </SectionContentAdminHeader>
    );
  }
}
