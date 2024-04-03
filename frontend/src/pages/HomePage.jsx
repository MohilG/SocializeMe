import { Button, Flex, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import axios from 'axios'

const HomePage = () => {
  const toast =useToast()
  const [posts,setPosts]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    const getFeed=async()=>{
      try {
        setLoading(true)
        const response=await axios.get('http://localhost:4000/api/posts',{withCredentials: true})
        // console.log(response)
        if(response.data.error){
          toast({
            title: 'Error',
            description: response.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true
          });
        }
        else{
          toast({
            title: 'Success',
            description: response.data.message,
            duration: 3000,
            isClosable: true
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      }finally{
        setLoading(false)
      }
    }
    getFeed()
  },[])
  const username = JSON.parse(localStorage.getItem('userInfo')).username;
  console.log(username);
  return (
    <Link to={`/${username}`}>
        <Flex w={"full"} justifyContent={"center"}>
            <Button mx={"auto"}>Visit Profile Page</Button>
        </Flex>
    </Link>
  )
}

export default HomePage