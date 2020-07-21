import React from "react";
import PropTypes from "prop-types";
import defaultUserPhoto from "../../assets/default_avatar.png";

const Avatar = props => {
  return (
    <img
      className={props.avatarClasses}
      src={props.user.photoURL ? props.user.photoURL : defaultUserPhoto}
      alt={props.user.displayName}
    />
  );
};

Avatar.propTypes = {
  user: PropTypes.objectOf(PropTypes.string.isRequired),
  avatarClasses: PropTypes.string.isRequired
};

export default Avatar;
