import UserHeader from "../components/UserHeader.jsx"
import UserPost from "../components/UserPost.jsx"

const UserPage = () => {
  return (
    <>
    
   <UserHeader/>
   <UserPost likes={100} replies={10} title={"First Post"} postImg='/post1.png' avatar={'/zuck-avatar.png'} username={'mark-zuck'} verified={true}/>
   <UserPost likes={200} replies={70} title={"Yello Post"} postImg='/post2.png' avatar={'/zuck-avatar.png'} username={'dark-zuck'} verified={false}/>
   <UserPost likes={61} replies={13} title={"Jello Post"} postImg='/post3.png' avatar={'/zuck-avatar.png'} username={'lark-zuck'} verified={true}/>

   
   </>
  )
}

export default UserPage