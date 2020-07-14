import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserInfo = props => {
  return (
    <Link to={`user/${props.displayName}`}>
      <div className="user-info">
        <Avatar user={props.user} avatarClasses={props.avatarClasses} />
        <div className="user-info-name">{props.user.displayName}</div>
      </div>
    </Link>
  );
};

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.string.isRequired)
};

export default UserInfo;
