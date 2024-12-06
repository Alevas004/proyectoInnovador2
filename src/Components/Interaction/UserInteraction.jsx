import { useState } from "react";
import ReactionSection from "./Reaction/ReactionSesion";
import CommentSection from "./Comment/CommentSection";
import "./UserInteraction.css";

const UserInteraction = ({ post }) => {
  const [comments, setComments] = useState(post.comments || []);
console.log("post", post)
  return (
    <div className="userInteraction">
      <ReactionSection post={post} />
      <CommentSection comments={comments} setComments={setComments} id={post.id} />
    </div>
  );
};

export default UserInteraction;
