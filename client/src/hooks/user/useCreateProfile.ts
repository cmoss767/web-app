import { useMutation } from "react-query"
import axios from "axios"

const createProfile = () => axios.post(`/users/create`).then((res) => res.data)

const useCreateProfile = () => {
  return useMutation("createProfile", () => createProfile())
}

export default useCreateProfile
