import { Button, Divider, Flex, Text } from "@chakra-ui/react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import Comment from "../components/Comment"

const PostPage = () => {
  return (
    <div>        
   <UserPost likes={200} replies={70} title={"Yello Post"} postImg='/post2.png' avatar={'/zuck-avatar.png'} username={'mark-zuck'} verified={true}/>
   <Divider my={4} color={"gray.dark"}/>
<Flex justifyContent={"space-between"} >
  <Flex gap={2} alignItems={"center"}>
    <Text fontSize={"2xl"}> 👋 </Text>
    <Text  color={"gray.light"}>Like,Post and Reply</Text>

    <Button>
      Get
    </Button>
  </Flex> 

</Flex>
<Divider my={4}/>
<Comment username={"lalit"} likes={19} comment={"Nice Pic"} avatar={'/zack-avatar.png'} />
<Comment username={"Galit"} likes={4} comment={"Nice   "} avatar={'https://bit.ly/dan-abraov'} />
    </div>
  )
}

export default PostPage