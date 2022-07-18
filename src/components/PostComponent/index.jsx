import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DeleteButton, Post, PostLink } from "./style";
import { Link } from "react-router-dom";

const PostComponent = ({ post, key, deleteRequest }) => {
  return (
    <Post key={key}>
      <>
        <DeleteButton onClick={(e) => deleteRequest(post.id, e)}>
          <DeleteIcon />
        </DeleteButton>

        <PostLink to={`${post.id}`}>{post?.title}</PostLink>

        <Link to={`${post.id}`}>
          <ArrowForwardIosIcon />
        </Link>
      </>
    </Post>
  );
};

export default PostComponent;
