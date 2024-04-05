import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import Actions from "../components/Actions";
import Comment from "../components/Comment.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import useGetProfile from "../hooks/useGetProfile";

const PostPage = () => {
    const { pid } = useParams();
    const toast = useToast();
    const { loading, user } = useGetProfile();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/posts/${pid}`, { withCredentials: true });
                console.log(response);
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
                setPost(response.data);
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
    }, [pid, toast]);

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
            {/* Your post page JSX */}
        </>
    );
};

export default PostPage;
