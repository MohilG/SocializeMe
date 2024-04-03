import { Button, useToast } from '@chakra-ui/react'
import React from 'react'
import userAtom from '../atoms/userAtom.js'
import { useSetRecoilState } from 'recoil'
import axios from 'axios'

const LogOut = () => {
    const toast = useToast(); // Initialize the toast notification

    const setUser=useSetRecoilState(userAtom)
    const handleLogOut=async()=>{
        try {
            const response = await axios.post('http://localhost:4000/api/users/logout',{}, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            // console.log(response.data);  
            localStorage.removeItem('userInfo')
            setUser(null)
            toast({
              title: 'Success',
              description: response.data.message,
              duration: 3000,
              isClosable: true
            });
            window.location.href='/'
          } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: error.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true
              });
              return
          }
    }
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogOut}>LogOut</Button>
  )
}

export default LogOut