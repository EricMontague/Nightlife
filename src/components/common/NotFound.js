import React from "react";
import pageNotFoundImage from "../../assets/page_not_found.jpg";

const NotFound = () => {
  return (
    <div className="centered-page-layout text-center p-all-3">
      <img src={pageNotFoundImage} alt="Page Not Found" />
    </div>
  );
};

export default NotFound;
