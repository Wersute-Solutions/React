import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AppBarCus from "../../components/appbar_custom";
import { FaUserTie, FaUserFriends } from "react-icons/fa";

export default function Choice() {
  const navigate = useNavigate();

  const handleFreelancerClick = () => {
    navigate("/completefreelancerprofile");
  };

  const handleClientClick = () => {
    navigate("/completeclientprofile");
  };

  // Sample dynamic content
  const freelancerBio = "Skilled professional with expertise in project management and problem-solving.";
  const clientBio = "Entrepreneur seeking reliable partners to bring innovative ideas to life.";

  return (
    <>
      <AppBarCus />
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
        <Typography variant="h4" align="center" gutterBottom>
          Choose Your Role
        </Typography>
        <div style={{ margin: "50px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Grid container justifyContent="center" spacing={4}>
            <Grid item>
              <Card
                onClick={handleFreelancerClick}
                sx={{
                  cursor: "pointer",
                  width: 300,
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent style={{ height: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                  <FaUserTie size={48} style={{ marginBottom: "10px" }} />
                  <Typography variant="h5" component="div" gutterBottom>
                    Freelancer
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: "1.1rem", textAlign: "center" }}>
                    {freelancerBio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card
                onClick={handleClientClick}
                sx={{
                  cursor: "pointer",
                  width: 300,
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent style={{ height: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                  <FaUserFriends size={48} style={{ marginBottom: "10px" }} />
                  <Typography variant="h5" component="div" gutterBottom>
                    Client
                  </Typography>
                  <Typography variant="body1" style={{ fontSize: "1.1rem", textAlign: "center" }}>
                    {clientBio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
