import React from "react";
import PropTypes from "prop-types";

const Card = props => {
  return (
    <div className={"card" + " " + (props.classes ? props.classes : "")}>
      <div className="card-body">{props.children}</div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.element.isRequired
};

export default Card;
