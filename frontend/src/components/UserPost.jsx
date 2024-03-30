import {  Box, Flex, Text, VStack, Menu,Avatar,Image, MenuButton, Portal, MenuList, MenuItem, useToast } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import { CgMoreO } from "react-icons/cg";


const UserPost = ({likes,replies,title,postImg,avatar,username,verified}) => {
    // const [liked,setLiked]=useState()
    const toast=useToast()
    const shouldShowMoreIcon = () => {
        return location.pathname === '/markzuck/post/1';
    };
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
  return (
    <>
          <Link to={'/markzuck/post/1'}>
        <Flex gap={3} mb={4} py={5} >
            <Flex flexDirection={"column"} alignItems={"center"} >
                <Avatar size={"md"} name="Mark Zuck" src={avatar} />
                <Box w={"1px"} h={"full "} bg="gray.light" my={2}></Box>
                <Box position={"relative"} w={"full "}>
                <Avatar size={"xs"} src="https://bit.ly/dan-abraov" position={"absolute"} top={0} left={"15px"} padding={"2px"}/>
                <Avatar size={"xs"} src="https://bit.ly/dan-abraov" position={"absolute"} bottom={0} right={"-5px"} padding={"2px"}/>
                    <Avatar size={"xs"} src="https://bit.ly/dan-abraov" position={"absolute"} bottom={0} left={"4px"} padding={"2px"}/>
                </Box>
            </Flex>
        <Flex flex={1} alignItems={"start"} gap={2} flexDirection={"column"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize="sm" fontWeight={'bold'} >{username}</Text>
                   {verified && <Image src="/verified.png" w={4} h={4} ml={1}/>}

                </Flex>
                <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                {shouldShowMoreIcon() && (
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
                                )}
                </Flex>
            </Flex>
      

            <Text fontSize={"sm"}>{title}</Text>
            {postImg &&(
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>
                <Image src={postImg}  w={"full"}/>
            </Box>)}
            <Flex gap={3} my={1}>
                {/* <Actions liked={liked} setLiked={setLiked} /> */}
            </Flex>
            <Flex gap={2}  alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                <Text color={"gray.light"}>{likes} likes</Text>
            </Flex>
        </Flex>
        </Flex>
            </Link>
        <Box w={'100%'}  border={"1px solid black"}>
             
        </Box>
    </>
  )
}

export default UserPost