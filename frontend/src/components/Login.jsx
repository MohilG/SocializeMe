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
import { useSetRecoilState } from 'recoil'
import authScreen from '../atoms/authAtom.js'
import axios from 'axios'
import userAtom from '../atoms/userAtom.js'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const [inputs,setInputs]=useState({username:"",password:""})
  const toast=useToast()
  const setUser=useSetRecoilState(userAtom)
  const handleLogin=async()=>{
    try {
        const response = await axios.post('http://localhost:4000/api/users/login', inputs, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        localStorage.setItem('userInfo',JSON.stringify(response.data))
        setUser(response.data)
        toast({
          title: 'Success',
          description: response.data.message,
          // status: 'error',
          duration: 3000,
          isClosable: true
        });
        
      } catch (error) {
        toast({
            title: 'Login Error',
            description: error.response.data.error,
            // status: 'error',
            duration: 3000,
            isClosable: true
          });
      }
  }
    const setAuthScreen=useSetRecoilState(authScreen)
  return (
    <Flex
      
      align={'center'}
      justify={'center'}
>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
         
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark.700')}
          boxShadow={'lg'}
          p={8}
          w={{
            sm:"400px",
            base:"full",

          }}
          >
          <Stack spacing={4}>
           
            <FormControl  isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})}/>
            </FormControl>
            <FormControl  isRequired>
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

                }}
                onClick={handleLogin}>
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't Have an Account? <Link color={'blue.400'} onClick={()=>{setAuthScreen('signup')}}>Signup</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}