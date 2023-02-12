import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  InputBase,
  Card,
} from "@mui/material"

import Appbar from "../components/toolbar"

const home = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", backgroundColor: "black" }}>
      <Appbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            backgroundColor: "white",
            mt: 20,
            p: 2,
            height: 110,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Search Now
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", justifyContent: "center", mt: 5 }}
          >
            <InputBase
              sx={{
                backgroundColor: "white",
                borderRadius: 50,
                boxShadow: 2,
                px: 2,
              }}
              placeholder="Enter Zip Code"
            />
            <Button variant="contained" sx={{ borderRadius: 50 }}>
              Search
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  )
}
export default home
