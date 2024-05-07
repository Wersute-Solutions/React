import { useEffect, useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import Tile from "../../components/request_tile";
import { fetchMyPosts } from "../../api/posts";
import { CircularProgress, Backdrop } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Requests() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchMyPosts();
      if (response.status) {
        setPosts(response.data);
        console.log(response.data);
      } else {
        console.log("Error fetching posts:", response.message);
      }
      setIsLoading(false);
    }
    fetchPosts();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const dateOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
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
        {isLoading ? (
          <Backdrop open={isLoading}>
          <CircularProgress color="primary" />
        </Backdrop>
        ) : posts.length === 0 ? (
          <Typography variant="body1" style={{ marginTop: "250px" }}>your posts dont have any applicants yet.</Typography>
        ) : (
          posts.map((post, idx) => (
            <div key={idx} className="">
              <Tile
                key={idx}
                title={post.title}
                status={post.assigned_to ? "Assigned" : "Unassigned"}
                date={new Date(post.created_at).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}
                applications={post.assigned_to ? [] : post.applications}
                assignedTo={post.assigned_to}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
