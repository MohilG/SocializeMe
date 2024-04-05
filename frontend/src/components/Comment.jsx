import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
// import Actions from "./Actions"

const Comment = ({likes,comment,avatar,username}) => {
    const [liked,setLiked] =useState(false)
  return (
    <>
    <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={avatar} size={"sm"}/>
            <Flex gap={1} w={"full"} flexDirection={"column"} alignItems={"start"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.dark"}>2d</Text>
                    </Flex>
                </Flex>
                <Text>{comment}</Text>
                {/* <Actions setLiked={setLiked} liked={liked} /> */}
                <Text fontSize={"sm"} color={"gray.light"}>{likes+(liked?1:0)}likes</Text>
            </Flex>

    </Flex>
    <Divider my={4}/>
    </>
  )
}

export default Comment