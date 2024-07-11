import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const useGetProfile = () => {
  const [user,setUser]=useState(null)
  const [loading,setLoading]=useState(true)
  const toast=useToast()
    const {username}=useParams()
  useEffect(()=>{
    const getUser = async () => {
        try {
          const response = await axios.get(
            `https://socializeme-2.onrender.com/api/users/profile/${username}`,{withCredentials: true}
          );
          console.log(response);
          if (response.data.error) {
            toast({
              title: "Error",
              description: response.data.error,
              duration: 3000,
              isClosable: true,
            });
            return;
          }
          if(response.data.isFrozen){
            setUser(null)
              return
          }
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast({
            title: "Error",
            description: "Error Fetching Data",
            duration: 3000,
            isClosable: true,
          });
        }finally{
          setLoading(false)
        }
      };
      getUser()
  },[username])
  return  { user , loading}
}

export default useGetProfile