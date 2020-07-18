import React from "react";
import PropTypes from "prop-types";

const CenteredPageLayout = props => {
  return (
    <div className="centered-page-layout text-center p-all-3">
      {props.children}
    </div>
  );
};

CenteredPageLayout.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default CenteredPageLayout;
