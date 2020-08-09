import React from "react";
import Card from "../common/Card";
import CenteredPageLayout from "../common/CenteredPageLayout";
import HomeContent from "./HomeContent";
import PropTypes from "prop-types";

const Home = props => {
  return (
    <CenteredPageLayout>
      <Card classes="card-medium">
        <HomeContent signInWithGoogleOAuth={props.signInWithGoogleOAuth} />
      </Card>
    </CenteredPageLayout>
  );
};

Home.propTypes = {
  signInWithGoogleOAuth: PropTypes.func.isRequired
};

export default Home;
