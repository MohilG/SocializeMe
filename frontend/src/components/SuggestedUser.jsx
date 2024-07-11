import React, { useState } from 'react';
import { Avatar, Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

const SuggestedUser = ({ user }) => {
  // const following = true;
  // const updating = false;
  const toast=useToast()
  const curUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(user.followers.includes(curUser?._id));
  const [updating, setUpdating] = useState(false);
  const handlefollowUnfollow = async () => {
    try {
      setUpdating(true)
      if(!curUser){
          toast({
              title: "Error",
              description: 'Login to  follow/unfollow this user',
              duration: 3000,
              isClosable: true,
            });
      }
      // console.log(user.followers)
      console.log(`https://socializeme-2.onrender.com/api/users/follow/${user._id}`);
      const response = await axios.post(`https://socializeme-2.onrender.com/api/users/follow/${user._id}`, {}, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true

      });
      // console.log(response);
      toast({
          title: "Success",
          description: response.data.message+` ${user.username}`,
          duration: 3000,
          isClosable: true,
        });
      if (response.data.error) {
        toast({
          title: "Error",
          description: response.data.error,
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if(following){
          user.followers.pop(curUser?._id)
      }
      else{
          user.followers.push(curUser?._id)
      }
      setFollowing(!following);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error following/unfollowing user.",
        duration: 3000,
        isClosable: true,
      });
    }finally{
      setUpdating(false)
    }
  };

  return (
    <>
      <Flex gap={2} justifyContent="space-between" alignItems="center">
        {/* left side */}
        <Flex gap={2} as={Link} to={`/${user.username}`}>
          <Avatar src={user.profilePic} />
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              {user.username}
            </Text>
            <Text color="gray.light" fontSize="sm">
              {user.name}
            </Text>
          </Box>
        </Flex>
        {/* right side */}
        <Button
          size="sm"
          color={following ? "black" : "white"}
          bg={following ? "white" : "blue.400"}
          onClick={handlefollowUnfollow}
          isLoading={updating}
          _hover={{
            color: following ? "black" : "white",
            opacity: "0.8",
          }}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      </Flex>
    </>
  );
};

export default SuggestedUser;
