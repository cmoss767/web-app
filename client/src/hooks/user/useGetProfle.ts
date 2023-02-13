import axios from "axios"
import { useQuery } from "react-query"

const getProfile = () => axios.get(`/users/me`).then((res) => res.data)

const useGetProfile = () => {
  return useQuery("getMe", () => getProfile())
}

export default useGetProfile
