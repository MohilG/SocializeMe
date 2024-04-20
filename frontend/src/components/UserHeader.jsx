import {
    Link,
    Box,
    Flex,
    Text,
    VStack,
    Menu,
    MenuButton,
    Portal,
    MenuList,
    MenuItem,
    useToast,
    Button,
    Divider,
  } from "@chakra-ui/react";
  import { Avatar } from "@chakra-ui/avatar";
  import { BsInstagram } from "react-icons/bs";
  import { CgMoreO } from "react-icons/cg";
  import { useRecoilValue } from "recoil";
  import userAtom from "../atoms/userAtom.js";


  import { Link as RouterLink } from "react-router-dom";
  import { useState } from "react";
  import axios from "axios";
import useLogout from "../hooks/useLogOut.js";
  

  const UserHeader = ({ user }) => {
    const curUser = useRecoilValue(userAtom);
    const [following, setFollowing] = useState(user.followers.includes(curUser?._id));
    const toast = useToast();
    const handleLogOut=useLogout()
    const handlefollowUnfollow = async () => {
      try {
        if(!curUser){
            toast({
                title: "Success",
                description: 'Login to  follow/unfollow this user',
                duration: 3000,
                isClosable: true,
              });
        }
        // console.log(user.followers)
        console.log(`http://localhost:4000/api/users/follow/${user._id}`);
        const response = await axios.post(`http://localhost:4000/api/users/follow/${user._id}`, {}, {
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
      }
    };
    const freezeAccount=async()=>{
try {
            if(!window.confirm("Are you sure you want to freeze your account?"))return
            const response=await axios.post(`http://localhost:4000/api/users/freeze`,{},{
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              withCredentials:true
            });
            // console.log(response);
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
              description: 'Account Frozen  Successfully!',
              duration: 3000,
              isClosable: true
          });
          await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 1 second (adjust as needed)

          await handleLogOut();
           

            

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
  
    const copyUrl = () => {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: "Link Copied.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      });
    };
  
    return (
      <>
        {user ? (
          <VStack gap={4} cursor={'pointer'} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Box>
                <Text fontSize={"5xl"} mr={3} mb={2}>
                  {user.name}
                </Text>
                <Flex gap={2} alignItems={"center"}>
                  <Text fontSize={"xl"}>@{user.username}</Text>
                  
                </Flex>
              </Box>
              <Box><Avatar name={user.name} src={user?.profilePic || 'https://avatar.iran.liara.run/public/boy'} size={"xl"} /></Box>
            </Flex>
            <Text>{user.bio}</Text>
            {curUser?._id !== user._id && (
             
                <Button size={"sm"} onClick={handlefollowUnfollow}>
                  {following ? "Unfollow" : "Follow"}
                </Button>
              
            )}
  
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"}>{user.followers.length} followers</Text>
                <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                {/* <Link color={"gray.light"}>instagram.com</Link> */}
              </Flex>
              <Flex>
                <Box className="icon-container">
                  <BsInstagram size={24} cursor={"pointer"} />
                </Box>
                <Box className="icon-container">
                  <Menu>
                    <MenuButton>
                      <CgMoreO size={24} cursor={"pointer"} />
                    </MenuButton>
                    <Portal>
                      <MenuList bg={"gray.dark"}>
                      <Divider/>

                        <MenuItem bg={"gray.dark"} color={'white'} onClick={copyUrl}>
                          Copy Link
                        </MenuItem>
                        <Divider/>
                        {curUser?._id === user._id && (
                            <MenuItem bg={"gray.dark"} color={'white'} onClick={freezeAccount}>
                            Freeze Account
                          </MenuItem>
                          
                                 )}
                        <Divider/>

                           {curUser?._id === user._id && (
                            <MenuItem bg={"gray.dark"} color={'white'} onClick={freezeAccount}>
                            <Link as={RouterLink} to={"/update"}>
                            Update Profile
                            </Link>
                            </MenuItem>
                          )}
                        <Divider/>

                        {/* <MenuItem></MenuItem> */}
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              </Flex>
            </Flex>
            <Flex w={"full"}>
              <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Threads</Text>
              </Flex>
              <Flex flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"}>Replies</Text>
              </Flex>
            </Flex>
          </VStack>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  };
  
  export default UserHeader;
  