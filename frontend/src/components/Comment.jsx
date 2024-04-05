import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
// import Actions from "./Actions"

const Comment = ({reply}) => {
  return (
    <>
    <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfile} size={"sm"}/>
            <Flex gap={1} w={"full"} flexDirection={"column"} alignItems={"start"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
                   
                </Flex>
                <Text>{reply.text}</Text>
                     </Flex>

    </Flex>
    <Divider my={4}/>
    </>
  )
}

export default Comment