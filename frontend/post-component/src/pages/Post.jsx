import React from 'react'
import CreatePost from '../components/Createpost'

const Post = () => {
  return (
    <div className="flex flex-row h-screen w-screen ">
       <div className=" min-h-full min-w-[20%]">
               
       </div>
       <div className="flex-1 min-h-full min-w-[40%]">
            <CreatePost/>
       </div>
       <div className="min-h-full min-w-[30%] ">

       </div>
    </div>
  )
}

export default Post