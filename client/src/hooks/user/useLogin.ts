import { useMutation } from "react-query"
import axios from "axios"
import { useLocalStorage } from "react-use"

// const [authenticated, setAuthenticated, removeAuthenticated] =
//   useLocalStorage<boolean>("authenticated", false, { raw: true })

const login = (data: { email: string; password: string }) =>
  axios.post(`http://localhost:5000/users/auth`, data)

const useLogin = () => {
  return useMutation(
    "login",
    (data: { email: string; password: string }) => login(data),
    {
      // onSuccess: () => {
      //   setAuthenticated(true)
      // },
    }
  )
}

export default useLogin
