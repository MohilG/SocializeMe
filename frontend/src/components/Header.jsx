import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
    const {colormode,toggleColorMode}=useColorMode()
  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
        <Image cursor={"pointer"} alt={"logo"} w={6} onClick={toggleColorMode} src={colormode==='dark'?'/light-logo.svg':'/dark-logo.svg'} />
    </Flex>
  )
}

export default Header