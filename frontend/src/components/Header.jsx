import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom'
import { FaUserFriends } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const curUser = useRecoilValue(userAtom)
  const handleToggleColorMode = () => {
    
    toggleColorMode(); // Make sure this function is being called when you expect it to be
  };
  return (
      <>
      <Flex justifyContent={"center"} mt={6} mb={12}>
              <Image
                  cursor={"pointer"}
                  alt={"logo"}
                  w={6}
                  onClick={handleToggleColorMode}
                  src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
              />
          </Flex>
          <Flex justifyContent={"space-between"} mt={6} mb={12}>
              {curUser && (
                  <Link to={'/'}>
                      <AiFillHome size={24} />
                  </Link>
              )}
          
          {curUser && (
              <Link to={`/${curUser.username}`}>
                  <RxAvatar size={24} /> {/* Adjusted to use MdAccountCircle */}
              </Link>
          )}
            
          {curUser && (

              <Link to={`/suggest`}>
                    <FaUserFriends cursor={'pointer'} size={24}/>
                </Link>
          )}

                    </Flex>

      </>
  )
}

export default Header