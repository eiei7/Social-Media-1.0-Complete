import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state/index";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/${userId}/feed`,
        {
          withCredentials: true,
        }
      );
      const postsInfo = response.data;
      console.log(response);
      dispatch(setPosts({ posts: postsInfo }));
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/${userId}/posts`,
        {
          withCredentials: true,
        }
      );
      const userPostsInfo = response.data;
      console.log(response.data);
      dispatch(setPosts({ posts: userPostsInfo }));
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    } // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts.map(
        ({
          id,
          uid,
          firstName,
          lastName,
          date,
          gender,
          description,
          location,
          profilePic,
          picturePath,
        }) => (
          <PostWidget
            key={id}
            postId={id}
            postUserId={uid}
            name={`${firstName} ${lastName}`}
            date={date}
            gender={gender}
            description={description}
            location={location}
            userPic={profilePic}
            picturePath={picturePath}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
