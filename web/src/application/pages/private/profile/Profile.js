import React, { Fragment } from "react";
import { SectionContentAdminHeader } from "components";
import { useAppContext } from "contexts/app";

export default () => {
  const { identity } = useAppContext();
  const { session } = identity;

  return (
    <Fragment>
      <SectionContentAdminHeader title={session.name} />
      profile
    </Fragment>
  );
};
