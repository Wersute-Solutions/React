import React from "react";
import { styled } from "@mui/system";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { acceptApplication } from "../api/posts";
import { useNavigate } from "react-router-dom";

const AvatarContainer = styled('div')(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  marginRight: '-16px',
}));

const EditButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: '8px',
  right: '8px',
  transform: "translate(50%, 50%)",
  backgroundColor: "blue",
  color: "white",
}));

const HiddenInput = styled('input')({
  display: "none",
});

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 450,
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SummaryContent = styled('div')({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const DetailsContent = styled('div')({
  display: "flex",
  flexDirection: "column",
});

const ApplicantDetails = styled('div')(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  marginRight: theme.spacing(2),
  width: theme.spacing(8),
  height: theme.spacing(8),
  border: `2px solid ${theme.palette.primary.main}`,
}));

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));

const ViewProfileButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
}));

const ApplicationCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const CoverLetterContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
});

const CoverLetterChunk = styled(Typography)({
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  overflowWrap: "break-word",
});

const splitTextIntoChunks = (text, chunkSize) => {
  const regex = new RegExp(`.{1,${chunkSize}}`, "g");
  return text.match(regex) || [];
};

const Tile = ({ title, status, date, applications, assignedTo }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleViewProfile = (freeId) => {
    navigate(`/profilepagefreelancer/${freeId}`);
  };

  const handleChat = (freelancerId) => {
    navigate(`/chatscreen/${user.user_id}/${freelancerId}/`);
  };

  const handleAcceptApplication = async (applicationId, profileId) => {
    await acceptApplication(applicationId, profileId);
    window.location.reload();
  };

  return (
    <StyledCard>
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <SummaryContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Status: {status}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Date: {date}
            </Typography>
          </SummaryContent>
        </AccordionSummary>
        <AccordionDetails>
          <DetailsContent>
            {status === "Assigned" && (
              <ApplicantDetails>
                <AvatarStyled src={assignedTo?.avatar} />
                <div>
                  <Typography variant="body1">
                    Assigned to: {assignedTo?.username}
                  </Typography>
                  <ViewProfileButton
                    variant="outlined"
                    onClick={() => handleViewProfile(assignedTo?.id)}
                  >
                    View Profile
                  </ViewProfileButton>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: "secondary.main", color: "secondary.main" }}
                    onClick={() => handleChat(assignedTo?.id)}
                  >
                    Chat
                  </Button>
                </div>
              </ApplicantDetails>
            )}

            {applications?.map((application, index) => (
              <ApplicationCard variant="outlined" key={index}>
                <CardContent>
                  <ApplicantDetails>
                    <AvatarStyled src={application.applicant_profile?.avatar} />
                    <div>
                      <Typography variant="body1">
                        {application.applicant.username}
                      </Typography>
                      <CoverLetterContainer>
                        {splitTextIntoChunks(application.cover_letter, 30).map((chunk, idx) => (
                          <CoverLetterChunk key={idx} variant="body2">
                            {chunk}
                          </CoverLetterChunk>
                        ))}
                      </CoverLetterContainer>
                    </div>
                  </ApplicantDetails>
                </CardContent>
                <ButtonContainer>
                  <Button
                    onClick={() =>
                      handleAcceptApplication(application.id, application.applicant.id)
                    }
                    variant="contained"
                    color="primary"
                  >
                    Accept
                  </Button>
                  <ViewProfileButton
                    variant="outlined"
                    onClick={() => handleViewProfile(application.applicant.id)}
                  >
                    View Profile
                  </ViewProfileButton>
                  <Button
                    variant="outlined"
                    sx={{ borderColor: "secondary.main", color: "secondary.main" }}
                    onClick={() => handleChat(application.applicant.id)}
                  >
                    Chat
                  </Button>
                </ButtonContainer>
              </ApplicationCard>
            ))}
          </DetailsContent>
        </AccordionDetails>
      </StyledAccordion>
    </StyledCard>
  );
};

export default Tile;
