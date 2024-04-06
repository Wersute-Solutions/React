import AppBarCus from "../components/appbar_custom";
import ProfilePicture from "../components/profilepic";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function HomePageClient() {
  return (
    <>
      <AppBarCus />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          {/* First column */}
          <Grid item xs={3}>
            <Box bgcolor="#e0e0e0" p={2} borderRadius={4}>
              <ProfilePicture
                imageSrc={"profilepicture.png"}
                altText={"profile"}
                size={200}
              />
              <div>hello</div>
            </Box>
          </Grid>

          {/* Second column */}
          <Grid item xs={6} container justifyContent="center">
            <Box bgcolor="#e0e0e0" p={2} borderRadius={4}>
              <div>hello</div>
            </Box>
          </Grid>

          {/* Third column */}
          <Grid item xs={3}>
            <Box bgcolor="#e0e0e0" p={2} borderRadius={4}>
              <div>hellojhjk</div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
