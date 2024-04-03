import { Flex, Spinner, useToast } from "@chakra-ui/react";
import UserHeader from "../components/UserHeader.jsx";
import UserPost from "../components/UserPost.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const toast = useToast();
  const [user, setUser] = useState(null);
  const { username } = useParams();
const [loading,setLoading]=useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/users/profile/${username}`
        );

        if (response.data.error) {
          toast({
            title: "Error",
            description: response.data.error,
            duration: 3000,
            isClosable: true,
          });
          return;
        }
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Error Fetching Data",
          duration: 3000,
          isClosable: true,
        });
      }finally{
        setLoading(false)
      }
    };

    getUser();
  }, [username]);

  // console.log(user);

  // Conditional rendering based on the user state
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    )
  }
  if (!user && !loading) {
    return (
    <Flex justifyContent={"center"}>
      <h1>User Not Found.</h1>
    </Flex>
      )
  }

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={100}
        replies={10}
        title={"First Post"}
        postImg="/post1.png"
        avatar={"/zuck-avatar.png"}
        username={"mark-zuck"}
        verified={true}
      />
      <UserPost
        likes={200}
        replies={70}
        title={"Yello Post"}
        postImg="/post2.png"
        avatar={"/zuck-avatar.png"}
        username={"dark-zuck"}
        verified={false}
      />
      <UserPost
        likes={61}
        replies={13}
        title={"Jello Post"}
        postImg="/post3.png"
        avatar={"/zuck-avatar.png"}
        username={"lark-zuck"}
        verified={true}
      />
    </>
  );
};

export default UserPage;
