
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import usePreviewImage from '../hooks/usePreviewImage.js'
import axios from 'axios'

export default function UpdateProfile() {
    const toast=useToast()
    const [user,setUser]=useRecoilState(userAtom)
    const [inputs,setInputs]=useState({name:user.name,usename:user.username,email:user.email,bio:user.bio,password:""})
    console.log(user);
    const fileRef=useRef(null)
    const {handleImg,imgUrl}=usePreviewImage()
    const handleSubmit=async(e)=>{
            e.preventDefault()
            try {
                const response=await axios.put(`https://socializeme-2.onrender.com/api/users/update/${user._id}`,{...inputs,profilePic: user.profilePic || imgUrl},{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true})
                  console.log(response);
                  toast({
                    title: 'Success',
                    description: 'User Updated Successfully',
                    // status: 'error',
                    duration: 3000,
                    isClosable: true
                  });
                  localStorage.setItem('userInfo',JSON.stringify(response.data))
                  setUser(response.data)
            } catch (error) {
                toast({
                    title: 'Updating Error',
                    // description: error.response.data.error,
                    // status: 'error',
                    duration: 3000,
                    isClosable: true
                  });
            }
    }
  return (
    <form onSubmit={handleSubmit}>
    <Flex
    my={6}
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" boxShadow={"md"} src={imgUrl || user.profilePic}>
              
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=>fileRef.current.click()}>Change Avatar</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImg}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl >
          <FormLabel>Name</FormLabel>
          <Input
          value={inputs.name}
          onChange={(e)=>setInputs({...inputs, name: e.target.value})}
            placeholder="Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl  >
          <FormLabel>User name</FormLabel>
          <Input
            // defaultValue={user.username}
          value={inputs.username}
          onChange={(e)=>setInputs({...inputs, username: e.target.value})}
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Email</FormLabel>
          <Input
          value={inputs.email}
          onChange={(e)=>setInputs({...inputs, email: e.target.value})}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Bio</FormLabel>
          <Input
            // defaultValue={user.bio}
          value={inputs.bio}
          onChange={(e)=>setInputs({...inputs, bio: e.target.value})}
            placeholder="Bio"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl  >
          <FormLabel>Password</FormLabel>
          <Input
          value={inputs.password}
          onChange={(e)=>setInputs({...inputs, password: e.target.value})}
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            type='submit'
            _hover={{
              bg: 'green.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}