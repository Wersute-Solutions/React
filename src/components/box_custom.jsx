import Box from "@mui/material/Box";

export default function BoxCus({ element }) {
  return (
    <Box
      bgcolor="rgba(224, 224, 224, 0.8)"
      p={2}
      borderRadius={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      {element}
    </Box>
  );
}
