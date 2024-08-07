import { useState, useEffect, useRef, useCallback } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom_freelancer";
import Post from "../../components/post";
import { fetchPosts, fetchTags } from "../../api/posts";
import Typography from "@mui/material/Typography";
import { Select, MenuItem, Button, FormControl } from "@mui/material";

export default function HomePageFreelancer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const loadMoreTrigger = useRef(null);

  const fetchPostsData = async (cursor = '', tagId = '') => {
    try {
      const { status, data } = await fetchPosts(cursor, tagId);
      if (status) {
        setPosts((prevPosts) => cursor ? [...prevPosts, ...data.results] : data.results);
        setNextCursor(data.next ? data.next.split('cursor=')[1] : null);
      } else {
        setError(data.message);
      }
      setIsLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Error fetching posts. Please try again later.");
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const fetchTagsData = async () => {
    try {
      const { status, data } = await fetchTags();
      console.log(data)
      if (status) {
        setTags([{ id: 'all', name: 'All' }, ...data]);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchPostsData();
    fetchTagsData();
  }, []);

  const loadMorePosts = useCallback(() => {
    if (nextCursor && !isLoadingMore) {
      setIsLoadingMore(true);
      fetchPostsData(nextCursor, selectedTag !== "all" ? selectedTag : '');
    }
  }, [nextCursor, isLoadingMore, selectedTag]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreTrigger.current) {
      observer.observe(loadMoreTrigger.current);
    }

    return () => {
      if (loadMoreTrigger.current) {
        observer.unobserve(loadMoreTrigger.current);
      }
    };
  }, [loadMoreTrigger, loadMorePosts]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const filterPostsByTag = () => {
    setIsLoading(true);
    setPosts([]);
    fetchPostsData('', selectedTag !== "all" ? selectedTag : '');
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
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <FormControl style={{ minWidth: 200, marginRight: "10px" }}>
  <Select value={selectedTag} onChange={handleTagChange}>
    {tags.map((tag) => (
      <MenuItem key={tag.id} value={tag.id}>
        {tag.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>
          <Button variant="contained" color="primary" onClick={filterPostsByTag}>
            Filter
          </Button>
        </div>
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
          <>
            {posts.map((post, idx) => (
              <Post
                id={post.id}
                key={post.id} // Use post.id as the key to avoid issues with indexing
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
                profilePic={post.avatar}
              />
            ))}
            <div ref={loadMoreTrigger} style={{ height: "20px" }} />
            {isLoadingMore && (
              <Typography variant="body1" style={{ marginTop: "20px" }}>
                Loading more...
              </Typography>
            )}
          </>
        )}
      </div>
    </>
  );
}
