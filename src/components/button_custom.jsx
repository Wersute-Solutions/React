import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function ButtonCus({ pad, text, onClick }) {
  return (
    <div>
      <Grid container justifyContent="center" sx={{ py: pad }}>
        <Grid item>
          <Button variant="contained" onClick={onClick}>
            {text}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
