import React from "react";
import Card from "../common/Card";
import CenteredPageLayout from "../common/CenteredPageLayout";
import HomeContent from "./HomeContent";


const Home = () => {
  return (
    <CenteredPageLayout>
      <Card classes="card-medium">
        <HomeContent />
      </Card>
    </CenteredPageLayout>
  );
};

export default Home;
