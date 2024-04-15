import React, { useState, useRef } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import Post from "../../components/post";

export default function HomePageFreelancer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  return (
    <>
      <AppBarCus
        showMenuIcon
        showSearchBar
        showNotificationButton
        onMenuIconClick={toggleMenu}
      />
      <DrawerCus
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isfree={true}
      />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Post
          title={"Data Analyst - Social Impact (Entry Level)"}
          description={
            "We are seeking a motivated and detail-oriented Data Analyst to join our team in the Social Impact sector. As a Data Analyst, you will be responsible for collecting, analyzing, and interpreting data to help drive decision-making and improve outcomes for our organization. This is an entry-level position ideal for recent graduates or individuals looking to transition into the field of data analysis. Join us in making a positive impact on society!"
          }
          username={"bros"}
          date={"April 14, 2024"}
          pay={"$45,000 - $55,000 per year"}
          skills={"Data Analysis, Statistical Analysis, SQL, Excel"}
          duration={"Full-time"}
          image={"profilepicture.png"}
          responsibilities={
            "- Collect and analyze data from various sources\n- Prepare reports and presentations to communicate findings\n- Identify trends and patterns in data\n- Collaborate with team members to develop data-driven strategies\n- Continuously monitor and evaluate data quality and integrity\n- Stay up-to-date with industry trends and best practices"
          }
        />
        <Post
          username={"dude"}
          title={"job"}
          description={
            "We are seeking a motivated and detail-oriented Data Analyst to join our team in the Social Impact sector. As a Data Analyst, you will be responsible for collecting, analyzing, and interpreting data to help drive decision-making and improve outcomes for our organization. This is an entry-level position ideal for recent graduates or individuals looking to transition into the field of data analysis. Join us in making a positive impact on society!"
          }
          date={"April 14, 2024"}
        />
      </div>
    </>
  );
}
