import React, { useEffect, useState } from "react";
import Post from "./Post";

const Postlist = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/post", {
          credentials: "include", // Ensures cookies are sent
        });
        const data = await response.json();
        setPosts(data); // Store posts in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div className="flex flex-col gap-5">
      {posts.length > 0 ? (
        posts.map((item) => <Post key={item._id} imageUrl={item.image} caption={item.description} likes={item.likes} initialComments={item.comments} username={item.user?.username||"unknown user"} postId={item._id}/>)
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default Postlist;

