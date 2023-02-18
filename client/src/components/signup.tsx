import * as React from "react"
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Modal,
} from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { useForm, Controller } from "react-hook-form"
import useLogin from "../hooks/user/useLogin"

import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}
export interface SignupProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
interface LoginFields {
  email: string
  password: string
}

const SignUp = ({ open, setOpen }: SignupProps) => {
  const formMethods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const login = useLogin()

  const onSubmit = (data: { email: string; password: string }) => {
    login.mutateAsync(data)
  }

  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            maxWidth: 500,
            mx: "auto",
            mt: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formMethods.handleSubmit(onSubmit)}
            sx={{ mt: 3, px: 5 }}
          >
            <Controller
              name={"email"}
              control={formMethods.control}
              render={({ field: { onChange, value } }) => (
                <TextField onChange={onChange} value={value} label={"Email"} />
              )}
            />
            <Controller
              name={"password"}
              control={formMethods.control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  label={"Password"}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </>
    </Modal>
  )
}
export default SignUp
