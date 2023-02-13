import { useMutation } from "react-query"
import axios from "axios"
import { useLocalStorage, useMount, useUnmount } from "react-use"

const [authenticated, setAuthenticated, removeAuthenticated] =
  useLocalStorage<boolean>("authenticated", false, { raw: true })
const createProfile = () => axios.post(`/users/create`).then((res) => res.data)

const useCreateProfile = () => {
  return useMutation("createProfile", () => createProfile(), {
    onSuccess: () => {
      setAuthenticated(true)
    },
  })
}

export default useCreateProfile
