import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text,Menu, MenuButton, Portal, MenuList, MenuItem,useToast} from "@chakra-ui/react";
import Actions from "../components/Actions";
import Comment from "../components/Comment.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { CgMoreO } from "react-icons/cg";
import axios from "axios";
import useGetProfile from "../hooks/useGetProfile";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import postsAtom from "../atoms/postAtom.js";

const PostPage = () => {
    const curUser=useRecoilValue(userAtom)
    const { pid } = useParams();
    const toast = useToast();
    const { loading, user } = useGetProfile();
    const [posts,setPosts]=useRecoilState(postsAtom)
    const post=posts[0]

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/posts/${pid}`, { withCredentials: true });
                console.log(response.data);
                if (response.data.error) {
                    toast({
                        title: 'Error',
                        description: response.data.error,
                        status: 'error',
                        duration: 3000,
                        isClosable: true
                    });
                    return;
                }
                setPosts([response.data]);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                });
            }
        };
        getPost();
    }, [pid, toast,setPosts]);

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
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            if (!window.confirm("Are you sure you want to delete the post?")) return;
            const response = await axios.delete(`http://localhost:4000/api/posts/${post._id}`, { withCredentials: true });
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
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    if (loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user) {
        return (
            <Flex justifyContent={"center"}>
                <Text>No user found.</Text>
            </Flex>
        );
    }

    if (!post) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
            
        );
    }

    return (
        <>
            <Flex>
                <Flex w={'full'} alignItems={'center'} gap={3}>
                    <Avatar src={user.profilePic} name={user.name} size={'md'}/>
                    <Flex>
                    <Text fontSize={'sm'} fontWeight={'bold'}>{user.username}</Text>
                    <Image src='/verified.png' w={4} h={4} ml={4}/>
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} width={36} textAlign={'right'} color={"gray.light"}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</Text>         
                    {curUser?._id===user._id && <DeleteIcon size={20} onClick={handleDelete}/> }
                            
                                        <Box className="icon-container">
                                            <Menu>
                                                <MenuButton>
                                                    <CgMoreO size={24} cursor={"pointer"} />
                                                </MenuButton>
                                                <Portal>
                                                    <MenuList bg={"gray.light"}>
                                                        <MenuItem bg={"gray.light"}  onClick={copyUrl}>Copy Link</MenuItem>
                                                    </MenuList>
                                                    
                                              </Portal>
                                            </Menu>
                                        </Box>
                                    
                                  
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
            
        <Divider my={4}/>
        <Flex justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
                <Text fontSize={'2xl'}> 👋 </Text>
                <Text color={'gray.light'}>Get the app to like ,reply and post.</Text>
            </Flex>
            <Button>Get</Button>
        </Flex>
        <Divider my={4}/>
        {post.replies.map((reply)=>{
            return <Comment key={reply._id} reply={reply}/>
        })}
            </>

    );
}

export default PostPage;
