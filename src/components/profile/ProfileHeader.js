import React from "react";
import UserInfo from "../common/UserInfo";
import PropTypes from "prop-types";

const ProfileHeader = props => {
  return (
    <div className="profile-header">
      <UserInfo
        user={props.currentUser}
        avatarClasses="avatar-lg img-rounded"
      />
    </div>
  );
};

ProfileHeader.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.string.isRequired),
  isLoggedIn: PropTypes.bool.isRequired
};

export default ProfileHeader;
