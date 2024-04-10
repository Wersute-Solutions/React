import Box from "@mui/material/Box";

export default function BoxCus({ element }) {
  return (
    <Box
      sx={{
        backgroundColor: "#E0E0E0",
        width: "100%",
        height: "450px",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {element}
    </Box>
  );
}
