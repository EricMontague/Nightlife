import React, { useEffect } from "react";
import PropTypes from "prop-types";

const DocumentTitle = props => {
  useEffect(() => {
    document.title = props.title;
  }, [props.title]);
  return <>{props.children}</>;
};

DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default DocumentTitle;
