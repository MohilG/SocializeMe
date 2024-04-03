import { Flex, Image, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from 'react-router-dom'

const Header = () => {
  const { colormode, toggleColorMode } = useColorMode()
  const curUser = useRecoilValue(userAtom)
  return (
      <>
      <Flex justifyContent={"center"} mt={6} mb={12}>
              <Image
                  cursor={"pointer"}
                  alt={"logo"}
                  w={6}
                  onClick={toggleColorMode}
                  src={colormode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
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
                    </Flex>

      </>
  )
}

export default Header