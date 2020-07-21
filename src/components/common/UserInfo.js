import React from "react";
import Avatar from "./Avatar";
import PropTypes from "prop-types";

const UserInfo = props => {
  return (
    <div className="user-info">
      <Avatar user={props.user} avatarClasses={props.avatarClasses} />
      <div className="user-info-name">{props.user.displayName}</div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default UserInfo;
