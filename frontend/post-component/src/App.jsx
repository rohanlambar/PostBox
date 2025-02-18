import Post from "./components/Post"
import egimg from "../src/assets/sign.jpg"
import Postlist from "./components/Postlist"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Createpost from "./components/Createpost"
import Loginpopup from "./components/Loginpopup"

const router = createBrowserRouter([
  {
    path:'/login',
    element:
       <>
           <Loginpopup/>
       </>
   
  },
  {
    path:'/createpost',
    element:
    <>
      <Createpost/>
    </>
  },
  {
    path:'/post',
    element:
    <>
      <Postlist/>
    </>
  },
    
  
])

function App() {

  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  )
}

export default App
