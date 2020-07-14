import React from "react";
import PropTypes from "prop-types";

const Avatar = props => {
  return (
    <img
      className={props.avatarClasses}
      src={props.user.photoUrl}
      alt={props.user.displayName}
    />
  );
};

Avatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string.isRequired),
  avatarClasses: PropTypes.string.isRequired
};

export default Avatar;
