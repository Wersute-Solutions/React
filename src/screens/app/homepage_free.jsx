import { useState, useEffect } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import Post from "../../components/post";
import { fetchPosts } from "../../api/posts";

export default function HomePageFreelancer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPostsData() {
      try {
        const { data } = await fetchPosts(); // Destructure 'data' property from the response
        setPosts(data); // Set the posts array to the state
      } catch (error) {
        console.error("Error fetching posts:", error);
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
        {posts.map((post, idx) => (
          <Post
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
          />
        ))}
      </div>
    </>
  );
}
