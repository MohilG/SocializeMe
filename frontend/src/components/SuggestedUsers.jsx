import { Box, Flex, Skeleton, SkeletonCircle, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SuggestedUser from './SuggestedUser.jsx'
import axios from 'axios'

const SuggestedUsers = () => {
    const [loading,setLoading]=useState(true)
    const [suggestedUsers,setSuggestedUsers]=useState([])
	const toast=useToast()
	useEffect(() => {
		const getSuggestedUsers = async () => {
		  try {
			setLoading(true);
			const response = await axios.post(`http://localhost:4000/api/users/suggested`, {}, {
				headers: {
				  Accept: "application/json",
				  "Content-Type": "application/json",
				},
				withCredentials: true
	  
			  });
			  	// console.log(response);
			if (response.data.error) {
			  toast({
				title: 'Error',
				description: response.data.error,
				status: 'error',
				duration: 3000,
				isClosable: true
			  });
			} else {
			  setSuggestedUsers(response.data);
			}
		  } catch (error) {
			toast({
			  title: 'Error',
			  description: error.message,
			  status: 'error',
			  duration: 3000,
			  isClosable: true
			});
		  } finally {
			setLoading(false);
		  }
		};
	  
		getSuggestedUsers();
	  }, [toast]);
	  
  return (
    <>
    <Text mb={4} align={'center'} fontWeight={'bold'}>
        Suggested Users
        </Text>
        <Flex direction={'column'}>
            {!loading && suggestedUsers.map(user=><SuggestedUser key={user._id} user={user}/>)}
        {loading &&
					[0, 1, 2, 3, 4].map((_, idx) => (
						<Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
							{/* avatar skeleton */}
							<Box>
								<SkeletonCircle size={"10"} />
							</Box>
							{/* username and fullname skeleton */}
							<Flex w={"full"} flexDirection={"column"} gap={2}>
								<Skeleton h={"8px"} w={"80px"} />
								<Skeleton h={"8px"} w={"90px"} />
							</Flex>
							{/* follow button skeleton */}
							<Flex>
								<Skeleton h={"20px"} w={"60px"} />
							</Flex>
						</Flex>
					))}
        </Flex>
        
        </>
  )
}

export default SuggestedUsers