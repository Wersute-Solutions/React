import { useState, useRef } from "react";
import AppBarCus from "../../components/appbar_custom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import InputCus from "../../components/input_custom";
import InputLargeCus from "../../components/input_large_custom";
import ButtonCus from "../../components/button_custom";
import DrawerCus from "../../components/drawer_custom";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import BoxCus from "../../components/box_custom";
import { createPost } from "../../api/posts";
import { useNavigate } from "react-router-dom";

export default function HomePageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pay: "",
    skills: "",
    duration: "",
    responsibilities: "",
    image: null,
  });
  const navigate = useNavigate(); // Importing useNavigate hook

  const [showMoreFields, setShowMoreFields] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const fileInputRef = useRef(null);

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
    if (formData.description.trim().length > 100) {
      console.log("Description length:", formData.description.trim().length);
      setAlert(
        <Alert severity="error">
          Description should be 100 characters or less.
        </Alert>
      );
    } else {
      console.log(
        "Description length is within limit:",
        formData.description.trim().length
      );
    }
    setLoading(true);

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, String(value));
    }
    formDataToSend.append("image", fileInputRef.current.files[0], "image.jpeg");

    setTimeout(() => {
      createPost(formDataToSend);
      setLoading(false);

      navigate("/success");
    }, 2000);

    console.log(formData);
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
            {/* Image picker with preview */}
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
              {/* Form inputs */}
              <Grid item xs={12}>
                <InputCus
                  name={"title"}
                  onChange={handleChange}
                  placeholder={"Title"}
                  marginbottom={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputLargeCus
                  name={"description"}
                  onChange={handleChange}
                  placeholder={"Description"}
                />
              </Grid>
              {showMoreFields && (
                <>
                  <Grid item xs={6}>
                    <InputCus
                      name={"pay"}
                      placeholder={"Approximate Pay"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputCus
                      name={"skills"}
                      placeholder={"Skills Required"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputCus
                      name={"duration"}
                      placeholder={"Duration"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputCus
                      name={"responsibilities"}
                      placeholder={"Responsibilities"}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <IconButton
                  onClick={toggleShowMoreFields}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  {showMoreFields ? (
                    <ExpandLessIcon fontSize="large" />
                  ) : (
                    <ExpandMoreIcon fontSize="large" />
                  )}
                  <Typography>
                    {showMoreFields ? "Show Less Fields" : "Show More Fields"}
                  </Typography>
                </IconButton>
              </Grid>
              <Grid item xs={6} marginTop={"50px"}>
                <ButtonCus text={"Post"} onClick={handleSubmit} />
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
            <Typography variant="h5" style={{ color: "white" }}>
              Loading...
            </Typography>
          </div>
        )}
      </div>
    </>
  );
}
