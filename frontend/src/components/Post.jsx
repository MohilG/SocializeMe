import React, { useEffect, useState } from 'react'
import {  Box, Flex, Text, VStack, Menu,Avatar,Image, MenuButton, Portal, MenuList, MenuItem, useToast } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import {DeleteIcon} from '@chakra-ui/icons'
import { CgMoreO } from "react-icons/cg";
import axios from 'axios';
import {formatDistanceToNow} from 'date-fns'
import Actions from './Actions.jsx';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom.js';
const Post = ({post}) => {
    const navigate=useNavigate()
    const postedById=post.postedBy
    const curUser=useRecoilValue(userAtom)
    const shouldShowMoreIcon = () => {
        return location.pathname === '/markzuck/post/1';
    };
    const handleDelete=async(e)=>{
        e.preventDefault()
        try {
            if(!window.confirm("Are you sure you want to delete the post?"))return
            const response=await axios.delete(`http://localhost:4000/api/posts/${post._id}`,{withCredentials:true});
            if (response.data.error) {
                console.log(response.data.error);
                toast({
                    title: 'Error',
                    description: response.data.error,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                });
                return;
            }
            toast({
                title: 'Success',
                description: response.data.message,
                duration: 3000,
                isClosable: true
            });

        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: error.message ,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    }
    const copyUrl=()=>{
        
        const curUrl=window.location.href;
        navigator.clipboard.writeText(curUrl).then(()=>{toast({
            title: 'Link Copied.',
            // description: "We've copied your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })})
    }
    const [user,setUser]=useState(null)
    const toast=useToast()
    useEffect(() => {
        const getUser = async () => {
            try {
                // console.log(post);
                // console.log(postedById);
    
                const response = await axios.get(`http://localhost:4000/api/users/profile/${postedById}`, {}, {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },  withCredentials: true });
    
                // console.log("hi", response);
                if (response.data.error) {
                    console.log(response.data.error);
                    toast({
                        title: 'Error',
                        description: response.data.error,
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                    });
                    return;
                }
                setUser(response.data);
            } catch (error) {
                console.log(error);
                toast({
                    title: 'Error',
                    description: error.message || "An error occurred while fetching user data",
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                });
                setUser(null);
            }
        }
        getUser();
    }, [postedById, toast]);
    
    if(!user)return null
    return (
        <>
              <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5} >
                <Flex flexDirection={"column"} alignItems={"center"} >
                    <Avatar size={"md"} name={user?.name} onClick={(e)=>{
                        e.preventDefault() 
                        navigate(`/${user.username}`)
                    }} src={user?.profilePic || 'https://avatar.iran.liara.run/public/boy'} />
                    <Box w={"1px"} h={"full "} bg="gray.light" my={2}></Box>
                    <Box position={"relative"} w={"full "}>
                        {post.replies.length===0 && (<Text textAlign={'center'}>🥱</Text>)}
                        {post.replies[0] &&(
                            <Avatar size={"xs"} src={post.replies[0].userProfile || 'https://avatar.iran.liara.run/public/36'} position={"absolute"} top={0} left={"15px"} padding={"2px"}/>

                        )}
                        {post.replies[1] &&(
                            <Avatar size={"xs"} src={post.replies[1].userProfile || "https://avatar.iran.liara.run/public/girl"} position={"absolute"} top={0} left={"15px"} padding={"2px"}/>

                        )}
                        {post.replies[2] &&(
                            <Avatar size={"xs"} src={post.replies[2].userProfile || "https://avatar.iran.liara.run/public/boy"} position={"absolute"} top={0} left={"15px"} padding={"2px"}/>

                        )}
                      </Box>  
                </Flex>
            <Flex flex={1} alignItems={"start"} gap={2} flexDirection={"column"}>
                <Flex justifyContent={'space-between'} w={"full"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize="sm" fontWeight={'bold'} >{user?.username}</Text>
                       {/* {verified &&
                        <Image src="/verified.png" w={4} h={4} ml={1}/>
                        } */}
                        <Image src="/verified.png" w={4} h={4} ml={1}/>

    
                    </Flex>
                    <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"xs"} width={36} textAlign={'right'} color={"gray.light"}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</Text>         
                    {curUser?._id===user._id && <DeleteIcon size={20} onClick={handleDelete}/> }
                                {/* {shouldShowMoreIcon() && (
                                        <Box className="icon-container">
                                            <Menu>
                                                <MenuButton>
                                                    <CgMoreO size={24} cursor={"pointer"} />
                                                </MenuButton>
                                                <Portal>
                                                    <MenuList bg={"gray.dark"}>
                                                        <MenuItem bg={"gray.light"} onClick={copyUrl}>Copy Link</MenuItem>
                                                    </MenuList>
                                                </Portal>
                                            </Menu>
                                        </Box>
                                    )} */}
                                  
                    </Flex>
                </Flex>
          
    
                <Text fontSize={"sm"}>{post.title}</Text>
                {post.img &&(
                <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>
                    <Image src={post.img}  w={"full"}/>
                </Box>)}
                <Flex gap={3} my={1}>
                    <Actions post={post} />
                </Flex>
            </Flex>
            </Flex>
                </Link>
            <Box w={'100%'}  border={"1px solid black"}>
                 
            </Box>
        </>
      )
}

export default Post