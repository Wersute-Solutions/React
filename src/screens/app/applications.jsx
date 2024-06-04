import React, { useState } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import ApplicationTile from '../../components/applicatiom_tile';
import AppBarCus from '../../components/appbar_custom';
import DrawerCus from '../../components/drawer_custom_freelancer';
 
const jobs = [
  { title: 'Software Engineer', status: 'Accepted', company: 'Google' },
  { title: 'Product Manager', status: 'Rejected', company: 'Amazon' },
  { title: 'Data Scientist', status: 'Ongoing', company: 'Facebook' },
];

const JobApplicationsPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen((prevState) => !prevState);
    };
  return (<>
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
        {jobs.map((job, index) => (
          <Grid item key={index}>
            <ApplicationTile jobTitle={job.title} jobStatus={job.status} companyName={job.company} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </div></>
  );
};

export default JobApplicationsPage;
