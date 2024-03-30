import { Link, Box, Flex, Text, VStack, Menu, MenuButton, Portal, MenuList, MenuItem, useToast } from "@chakra-ui/react"
import  { Avatar } from '@chakra-ui/avatar'
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";


// import { Link } from "react-router-dom"
const UserHeader = () => {
    const toast=useToast()
    const copyUrl=()=>{
        const url=window.location.href;
        navigator.clipboard.writeText(url).then(()=>{toast({
            title: 'Link Copied.',
            // description: "We've copied your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })})
        
    }
  return (
    <>
       <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Text fontSize={"2xl"}>Mark Zuckenberg</Text>
                <Flex gap={2} alignItems={"center" }>
                    <Text fontSize={"sm"}>markzuck</Text>
                    <Text fontSize={"xs"} color={"gray.light"} p={1} borderRadius={"full"} bg={"gray.dark"}>thread.net</Text>
                </Flex>
            </Box>
            <Box>
                <Avatar name="Mark Zuck" src="/zuck-avatar.png" size={"xl"}/>
            </Box>
        </Flex>
        <Text>XJKHETFWHJHHHHWEJKC</Text>
        <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"}>3.2k followers</Text>
        <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
        <Link color={"gray.light"}>instagram.com</Link></Flex>
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
                            <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
                            {/* <MenuItem></MenuItem> */}

                        </MenuList>
                    </Portal>
                </Menu>
            </Box>
        </Flex>
        </Flex>
        <Flex w={"full"}>
            <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"} >Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={"1.5px solid gray"} color={"gray.light"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"bold"} >Replies</Text>
            </Flex>

        </Flex>
        </VStack> 
    </>
  )
}

export default UserHeader