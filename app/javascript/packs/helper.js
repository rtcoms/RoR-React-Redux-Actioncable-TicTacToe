import axios from 'axios'
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export function useUser () {
  const { data, error } = useSWR('/api/v1/current_user', fetcher)

  return {
    currentUser: data,
    isLoading: !error && !data,
    isError: error
  }
}
