import { Box, Typography, TextField, Button, Stack } from "@mui/material"
import Appbar from "../components/toolbar"

const home = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <Appbar />
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", mt: 20 }}
      >
        <TextField variant="outlined" sx={{ backgroundColor: "white" }} />
        <Button variant="contained" sx={{ borderRadius: 50 }}>
          Search
        </Button>
      </Stack>
    </Box>
  )
}
export default home
