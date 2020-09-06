import React from "react";
import PropTypes from "prop-types";
import Avatar from "./Avatar";

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
