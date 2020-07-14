import React from "react";
import PropTypes from "prop-types";

const Homepage = props => {
  console.log(props.children);
  return <div className="home">props.children</div>;
};

Homepage.propTypes = {
  children: PropTypes.element.isRequired
};

export default Homepage;
