import { useState, useEffect } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import Post from "../../components/post";
import { fetchPosts } from "../../api/posts";
import Typography from "@mui/material/Typography";

export default function HomePageFreelancer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPostsData() {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
        setIsLoading(false);
      }
    }

    fetchPostsData();
  }, []);

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
        {isLoading ? (
          <Typography variant="body1" style={{ marginTop: "250px" }}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="body1" style={{ marginTop: "250px" }}>
            {error}
          </Typography>
        ) : posts.length === 0 ? (
          <Typography variant="body1" style={{ marginTop: "250px" }}>
            No posts for now, check back later
          </Typography>
        ) : (
          posts.map((post, idx) => (
            <Post
              id={post.id}
              key={idx}
              title={post.title}
              description={post.description}
              username={post.user.username}
              date={post.created_at}
              pay={post.pay}
              skills={post.skills}
              duration={post.duration}
              responsibilities={post.responsibilities}
              image={post.image}
              user_id={post.user.id}
              profilePic={"profilepicture.png"}
            />
          ))
        )}
      </div>
    </>
  );
}
