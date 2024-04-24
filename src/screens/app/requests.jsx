import { useEffect, useState } from "react";
import AppBarCus from "../../components/appbar_custom";
import DrawerCus from "../../components/drawer_custom";
import Tile from "../../components/request_tile";
import { fetchMyPosts } from "../../api/posts";

export default function Requests() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    async function fetchPosts(){
      const response = await fetchMyPosts();
      if(response.status){
        setPosts(response.data);
      }else{
        console.log("Error fetching posts:", response.message);
      }
    }
    fetchPosts();
  },[])
  const handleAccept = (application) => {
    console.log("Accepted application:", application.name);
  };
  const jobData = {
    title: "Software Engineer",
    status: "Unassigned",
    date: "2024-04-18",
    applications: [
      {
        name: "John Doe",
        profilePic: "john-doe-profile.jpg",
        coverLetter:
          "Experienced software engineer with expertise in JavaScript and React.",
      },
      {
        name: "Jane Smith",
        profilePic: "jane-smith-profile.jpg",
        coverLetter:
          "Passionate software developer with strong problem-solving skills.",
      },
      {
        name: "Michael Johnson",
        profilePic: "michael-johnson-profile.jpg",
        coverLetter:
          "Recent graduate with a degree in Computer Science, eager to learn and contribute.",
      },
    ],
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const { title, status, date, applications } = jobData;

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

        {
          posts.map((post, idx) => (
            <div key={idx} className="">
              <Tile
                key={idx}
                title={post.title}
                status={post.status}
                date={post.date}
                applications={post.applications}
                onAccept={handleAccept}
                assignedTo={post.assignedTo}
              />
            </div>
          ))
        }
      </div>
      
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
        <Tile
          title={title}
          status={"Unassigned"}
          date={date}
          applications={applications}
          onAccept={handleAccept}
          assignedTo={"byjus"}
        />
        <Tile
          title="Software Engineer"
          status="Assigned"
          date="2024-04-18"
          onAccept={handleAccept}
          assignedTo={{
            name: "Byju's",
            profilePic: "byjus-profile.jpg",
          }}
        />
      </div>
    </>
  );
}
