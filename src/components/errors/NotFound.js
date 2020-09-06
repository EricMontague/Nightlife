import React from "react";

const NotFound = () => {
  return (
    <div className="centered-page-layout text-center p-all-3">
      <div className="flex-col">
        <h1 className="text-lg">404 - Page Not Found</h1>
        <p className="text-md">
          It looks like nothing was found at this location. Please navigate back
          to the home page or your profile
        </p>
      </div>
    </div>
  );
};

export default NotFound;
