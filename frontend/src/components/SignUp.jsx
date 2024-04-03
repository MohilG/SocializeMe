'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import axios from 'axios';
import { useSetRecoilState } from 'recoil'
import authScreen from '../atoms/authAtom'
import userAtom from '../atoms/userAtom';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen=useSetRecoilState(authScreen)
    const [inputs,setInputs]=useState({name:"",username:"",password:"",email:""})
    const toast=useToast()
    const setUser=useSetRecoilState(userAtom)
    const handleSignUp = async () => {
    //   console.log(JSON.stringify(inputs));
      try {
        const response = await axios.post('http://localhost:4000/api/users/signUp', inputs, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        // console.log(response.data);
        
        localStorage.setItem("userInfo", JSON.stringify(response.data))
        setUser(response.data)
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'error',
          duration: 3000,
          isClosable: true
        });
      } catch (error) {
        toast({
            title: 'Error',
            description: error.response.data.error,
            status: 'error',
            duration: 3000,
            isClosable: true
          });
          return
      }

    };
    
  return (
    <Flex
      
      align={'center'}
      justify={'center'}
>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
         
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" value={inputs.name} onChange={(e)=>setInputs({...inputs,name:e.target.value})}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Username </FormLabel>
                  <Input type="text" value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={inputs.email} onChange={(e)=>setInputs({...inputs,email:e.target.value})}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.600','gray.700')}
                color={'white'}
                _hover={{
                    bg:useColorModeValue('gray.700','gray.800')

                }} onClick={handleSignUp}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} onClick={()=>{setAuthScreen('login')}} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}