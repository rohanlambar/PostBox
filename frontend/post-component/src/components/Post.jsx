import React, { useState } from 'react';
import { CiHeart } from "react-icons/ci";
import { TfiComment } from "react-icons/tfi";
import { RiSendPlaneLine } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";

const Post = ({ postId, username, profilePic, imageUrl, caption, likes, initialComments,userId }) => {
  const [liked, setLiked] = useState(false);  // Track if the user liked the post
  const [likeCount, setLikeCount] = useState(likes.length); // Track the like count
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');

  const handleCommentToggle = () => {
    setShowComments(!showComments);
  };

  const handleLikeToggle = async () => {
    try {
      const response = await fetch(`http://localhost:8000/post/like/${postId}`, {
        method: "PUT",
        credentials: "include",  // Make sure to send cookies
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setLiked(!liked);  // Toggle the like state
        setLikeCount(updatedPost.likes.length); // Update the like count
      } else {
        console.error("Failed to like/unlike the post");
      }
    } catch (error) {
      console.error("Error liking/unliking the post:", error);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { username, text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="min-w-md max-w-min mx-auto bg-white rounded-lg shadow-md overflow-hidden my-4">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={profilePic}
          alt={`${username}'s profile`}
        />
        <div className="ml-3 font-semibold text-sm">{username}</div>
        <div className="ml-auto text-gray-500 cursor-pointer">•••</div>
      </div>

      {/* Post Image */}
      <img
        className="w-full object-cover min-h-[500px]"
        src={imageUrl}
        alt={`Post by ${username}`}
      />

      {/* Action Buttons */}
      <div className="flex items-center p-4 space-x-4">
        {!liked ? 
          <CiHeart className='text-[30px] hover:text-red-500' onClick={handleLikeToggle} />
          :
          <FaHeart className='text-[30px] text-red-500' onClick={handleLikeToggle} />
        }
        
        {!showComments ? 
          <TfiComment 
            className='text-[27px] font-light hover:text-blue-500'
            onClick={handleCommentToggle} 
          />
          :
          <BiSolidComment 
            className='text-[27px] font-light text-blue-500'
            onClick={handleCommentToggle} 
          />
        }

        <RiSendPlaneLine className='text-[27px] font-light hover:text-violet-500' />
        <FaBookmark className="ml-auto text-[27px] font-light hover:text-slate-500" />
      </div>

      {/* Likes */}
      <div className="px-4 text-sm font-semibold">
        {likeCount} likes
      </div>

      {/* Caption */}
      <div className="px-4 pt-2 pb-4 text-lg mb-3 ">
        <span className="font-semibold ">{username}</span> {caption}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4">
          {/* Display previous comments */}
          <div className="space-y-2">
            {comments.map((comment, index) => (
              <div key={index} className="flex">
                <span className="block font-semibold mr-3">{comment.username}</span> <span>{comment.text}</span>
              </div>
            ))}
          </div>

          {/* Form to add a new comment */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-2 border rounded-md"
              placeholder="Add a comment..."
              rows="3"
            />
            <button 
              type="submit" 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Post Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
