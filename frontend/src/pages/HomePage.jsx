import { Button, Flex, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import axios from 'axios'
import Post from '../components/Post.jsx'
import postsAtom from '../atoms/postAtom.js'

const HomePage = () => {
  const toast =useToast()
  const [posts,setPosts]=useRecoilState(postsAtom)
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const getFeed=async()=>{
      try {
        setPosts([])
        setLoading(true)
        const response=await axios.get('http://localhost:4000/api/posts',{withCredentials: true})
        // console.log(response.data)
        setPosts(response.data)
        console.log(posts);
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
            description: 'Feed Updated',
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
  },[setPosts])
  return (
    <>
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
    </>
  )
  }
export default HomePage