import { useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

const usePreviewImage = () => {
  const [imgUrl,setImgUrl]=useState(null)
  const toast=useToast()
  const handleImg=(e)=>{
    const file=e.target.files[0]
    if(file && file.type.startsWith('image/')){
        const reader=new FileReader()
        reader.onloadend=()=>{
            setImgUrl(reader.result)
        }
        console.log('hello')
        reader.readAsDataURL(file)
    }
    else{
        toast({
            title: 'File Error',
            description: 'File should be image type.',
            // status: 'error',
            duration: 3000,
            isClosable: true
          });
    }
  }
//   console.log(imgUrl);
  return {handleImg,imgUrl,setImgUrl}
}

export default usePreviewImage