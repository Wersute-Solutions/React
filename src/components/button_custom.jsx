import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function ButtonCus({ pad, text, onClick, color }) {
  return (
    <div>
      <Grid container justifyContent="center" sx={{ py: pad }}>
        <Grid item>
          <Button
            variant="contained"
            onClick={onClick}
            color={color || "primary"}
          >
            {text}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
