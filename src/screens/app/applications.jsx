import React, { useEffect, useState } from 'react';
import { Grid, Container, Typography, Backdrop, CircularProgress } from '@mui/material';
import ApplicationTile from '../../components/applicatiom_tile';
import AppBarCus from '../../components/appbar_custom';
import DrawerCus from '../../components/drawer_custom_freelancer';
import { fetchMyApplications } from "../../api/posts";

const JobApplicationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchApplications() {
      const response = await fetchMyApplications();
      console.log(response)
      if (response.status) {
        setApplications(response.data);
      } else {
        console.log("Error fetching posts:", response.message);
      }
      setIsLoading(false);
    }
    fetchApplications();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <AppBarCus onMenuIconClick={toggleMenu} showMenuIcon />
      <DrawerCus open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

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
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Job Applications
          </Typography>
          <Grid container spacing={2}>
            {isLoading ? (
              <Backdrop open={isLoading}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              applications.map((job, index) => (
                <Grid item key={index}>
                  <ApplicationTile id = {job.id} jobTitle={job.job_title} jobStatus={job.status} companyName={job.company_name} clientId={job.author_id} myId={job.applicant} paymentStatus={job.payment_status} amount={job.amount}/>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default JobApplicationsPage;
