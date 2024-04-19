import { Box, Button, Flex, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import axios from 'axios'
import Post from '../components/Post.jsx'
import postsAtom from '../atoms/postAtom.js'
import SuggestedUsers from '../components/SuggestedUsers.jsx'

const HomePage = () => {
  const toast =useToast()
  const [posts,setPosts]=useRecoilState(postsAtom)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const getFeed=async()=>{
      try {
        setPosts([]);
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/posts', { withCredentials: true });
        setPosts(response.data);
        if (response.data.error) {
          toast({
            title: 'Error',
            description: response.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message, // Display the error message
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
      
    }
    getFeed()
  },[setPosts])
  return (
    <Flex gap={10} alignItems={'flex-start'}>
   <Box flex={70}>
   {loading && (
    <Flex justify={'center'}>
      <Spinner  size="xl" />
    </Flex>
   )}
    {!loading && posts.length===0 && (
      <Flex justifyContent={'center'}>
        <h1>Follow some users to update feed.</h1>
      </Flex>
    )}
    {posts.map((post)=>{
      // console.log(post.postedBy);
      return <Post key={post._id}  post={post} />
    })}
   </Box>
   <Box flex={30}><SuggestedUsers/> </Box>
    </Flex>
  )
  }
export default HomePage