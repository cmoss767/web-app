import { useMutation } from "react-query"
import axios from "axios"
import { useLocalStorage } from "react-use"

const [authenticated, setAuthenticated, removeAuthenticated] =
  useLocalStorage<boolean>("authenticated", false, { raw: true })

const login = () => axios.post(`users/auth`)

const useLogin = () => {
  return useMutation("login", () => login(), {
    onSuccess: () => {
      setAuthenticated(true)
    },
  })
}

export default useLogin
