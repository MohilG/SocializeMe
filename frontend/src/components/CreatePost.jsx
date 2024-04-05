import { AddIcon } from '@chakra-ui/icons'
import { Button,CloseButton,Flex,FormControl,Image,Input,Text,Textarea,useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import usePreviewImage from '../hooks/usePreviewImage'
import { BsFillImageFill } from 'react-icons/bs'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom.js'
import postsAtom from '../atoms/postAtom.js'

const CreatePost = () => {
    const toast=useToast()
    const user=useRecoilValue(userAtom)
    const [posts,setPosts]=useRecoilState(postsAtom)
    const {handleImg,imgUrl,setImgUrl}=usePreviewImage()
    const fileRef=useRef(null)

    const [postText,setpostText]=useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [remainChar,setRemainChar]=useState(500)
    const [loading,setLoading]=useState(false)
    const handleTextChange=async(e)=>{
        const inputText=e.target.value
        // console.log(inputText);
        if(inputText.length>500){
            const trunc=inputText.slice(0,500)
            setpostText(trunc)
            setRemainChar(0)
        }else{
            setpostText(inputText)
            setRemainChar(500-inputText.length)
        }
        
    }

    const handleCreatePost = async () => {
        setLoading(true)
        try {
          const response = await axios.post(
            'http://localhost:4000/api/posts/create',
            { postedBy: user._id, title: postText, img: imgUrl || '' },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              withCredentials:true
            }
          );
      
          if (response.data.error) {
            toast({
              title: 'Error',
              description: response.data.error,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } else {
            if(username=user.username){
            setPosts([response.data,...posts])
            }
              
            onClose();
            toast({
              title: 'Success',
              description: 'Post created successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setpostText('')
            setImgUrl('')
          }
        } catch (error) {
          console.log(error);
          toast({
            title: 'Error',
            description: 'Failed to create post.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }finally{
            setLoading(false)
        }
      };
      
  return (
    <div>
        <Button onClick={onOpen} position={"fixed"} bottom={10} right={10} leftIcon={<AddIcon/>} bg={useColorModeValue('gray.300','gray.dark')}>
        Create Post
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
                <Textarea onChange={handleTextChange} value={postText} placeholder='Post content goes here.'>
                </Textarea>
                <Text fontSize="xs" fontWeight="bold" textAlign="right" m={'1'} color={'gray.800'} >{remainChar}/500</Text>
                <Input type='file' hidden ref={fileRef} onChange={handleImg}/>
                <BsFillImageFill size={16} onClick={()=>fileRef.current.click()} style={{marginLeft:"5px",cursor:"pointer"}} />
            </FormControl>
            {imgUrl && (
                <Flex mt={5} w={"full"} position={"relative"}>
                    <Image  alt='Selected Image' src={imgUrl} />
                    <CloseButton onClick={()=>setImgUrl('')} bg={"gray.600"} position={"absolute"} top={1} right={1}/>
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' size={{base:'sm',sm:'md'}} mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreatePost