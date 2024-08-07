import { useState, useRef, useEffect } from "react";
import {
  AppBar,
  Typography,
  Grid,
  IconButton,
  Stack,
  Alert,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  PhotoCamera as PhotoCameraIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { createPost, fetchTags } from "../../api/posts";
import { useNavigate } from "react-router-dom";
import AppBarCus from "../../components/appbar_custom";
import BoxCus from "../../components/box_custom";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import ButtonCus from "../../components/button_custom";
import DrawerCusClient from "../../components/drawer_custom_client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pay: "",
    skills: "",
    duration: "",
    responsibilities: "",
    tag: "",
  });
  const [durationUnit, setDurationUnit] = useState("weeks");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [showMoreFields, setShowMoreFields] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchTagsData = async () => {
      try {
        const response = await fetchTags();
        console.log("Fetched Tags:", response.data);
        setTags(response.data || []);
      } catch (error) {
        setAlert(<Alert severity="error">Failed to load tags.</Alert>);
      }
    };
    fetchTagsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const toggleShowMoreFields = () => {
    setShowMoreFields((prevShowMoreFields) => !prevShowMoreFields);
  };

  const handleSubmit = () => {
    setAlert(null);
    if (!formData.title.trim()) {
      setAlert(<Alert severity="error">Please enter the title.</Alert>);
      return;
    }
    if (!formData.description.trim()) {
      setAlert(<Alert severity="error">Please enter the description.</Alert>);
      return;
    }
    if (formData.description.trim().length > 500) {
      setAlert(
        <Alert severity="error">
          Description should be 500 characters or less.
        </Alert>
      );
      return;
    }
    setLoading(true);

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === "duration" && String(value) !== "") {
        const adjustedDuration = String(value) + " " + String(durationUnit);
        formDataToSend.append(key, adjustedDuration);
      } else {
        formDataToSend.append(key, String(value));
      }
    }
    if (formData.image) {
      formDataToSend.append("image", fileInputRef.current.files[0]);
    }
    setTimeout(async () => {
      const post = await createPost(formDataToSend);
      setLoading(false);
      if (post.status === false) {
        alert("There is an error");
      } else {
        navigate("/success");
      }
    }, 2000);
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        image: null,
      });
    }
  };

  const handleCameraButtonClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  return (
    <>
      <AppBarCus
        showMenuIcon
        showSearchBar
        showNotificationButton
        onMenuIconClick={toggleMenu}
      />
      <DrawerCusClient open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: isMobile ? "0px" : "100px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          marginTop={"20px"}
          marginBottom={"40px"}
        >
          Create a Post
        </Typography>
        {alert && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {alert}
          </Stack>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <input
              ref={fileInputRef}
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImagePreview}
              name="image"
            />
            <BoxCus
              element={
                formData.image ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ maxWidth: "100%" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        zIndex: 1,
                      }}
                    >
                      <IconButton
                        onClick={removeImage}
                        style={{ color: "white" }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <IconButton onClick={handleCameraButtonClick}>
                    <PhotoCameraIcon fontSize="large" />
                  </IconButton>
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputCus
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  width="350px"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Select
                    value={formData.tag || ""}
                    onChange={(e) =>
                      handleChange({
                        target: { name: "tag", value: e.target.value },
                      })
                    }
                    displayEmpty
                    sx={{ width: "350px" }}
                  >
                    <MenuItem value="" disabled>
                      Select a Tag
                    </MenuItem>
                    {tags.map((tag) => (
                      <MenuItem key={tag.id} value={tag.title}>
                        {tag.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <InputLargeCus
                  name={"description"}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={"Description"}
                  width={"811px"}
                />
              </Grid>
              {showMoreFields && (
                <>
                  <Grid item xs={12} sm={6}>
                    <InputCus
                      name={"pay"}
                      value={formData.pay}
                      placeholder={"Approximate Pay"}
                      onChange={handleChange}
                      fullWidth
                      width={"350px"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputCus
                      name={"skills"}
                      value={formData.skills}
                      placeholder={"Skills Required"}
                      onChange={handleChange}
                      fullWidth
                      width={"350px"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <InputCus
                          name={"duration"}
                          value={formData.duration}
                          placeholder={"Duration"}
                          onChange={handleChange}
                          fullWidth
                          width={"222px"}
                        />
                        <Select
                          value={durationUnit}
                          onChange={(e) => setDurationUnit(e.target.value)}
                          displayEmpty
                          inputProps={{ "aria-label": "Select Duration Unit" }}
                          sx={{ marginLeft: "8px" }}
                        >
                          <MenuItem value="weeks">Weeks</MenuItem>
                          <MenuItem value="months">Months</MenuItem>
                          <MenuItem value="years">Years</MenuItem>
                        </Select>
                      </div>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputCus
                      name={"responsibilities"}
                      value={formData.responsibilities}
                      placeholder={"Responsibilities"}
                      onChange={handleChange}
                      fullWidth
                      width={"350px"}
                    />
                  </Grid>
                </>
              )}
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <IconButton onClick={toggleShowMoreFields}>
                  {showMoreFields ? (
                    <ExpandLessIcon fontSize="large" />
                  ) : (
                    <ExpandMoreIcon fontSize="large" />
                  )}
                </IconButton>
                <Typography>
                  {showMoreFields ? "Show Less Fields" : "Show Optional Fields"}
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={"20px"}>
                <ButtonCus text={"Post"} onClick={handleSubmit} fullWidth />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>
    </>
  );
}
