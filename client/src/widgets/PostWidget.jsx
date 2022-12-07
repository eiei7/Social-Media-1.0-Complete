import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friendship from "../components/Friendship";
import axios from "axios";
import UserImage from "../components/UserImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  date,
  gender,
  description,
  location,
  userPic,
  picturePath,
}) => {
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState({ likeState: false, likeCount: 0 });
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state.users.id);
  //const isLiked = Boolean(likes[loggedInUserId]);
  //const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getLikes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/singlepost/${postId}/like`,
        {
          withCredentials: true,
        }
      );
      const likedUsersId = response.data;

      if (likedUsersId) {
        setIsLiked({
          likeState: likedUsersId.includes(loggedInUserId) ? true : false,
          likeCount: likedUsersId.length,
        });
      }
    } catch (err) {
      return err;
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posts/${postId}/comments`,
        {
          withCredentials: true,
        }
      );
      const postComments = response.data;
      setComments(postComments);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getLikes();
    getComments();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const handleLike = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/singlepost/like/${postId}/${isLiked.likeState}/${loggedInUserId}`,
        {
          withCredentials: true,
        }
      );

      setIsLiked({
        likeCount: isLiked.likeCount + (isLiked.likeState ? -1 : 1),
        likeState: !isLiked.likeState,
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friendship
        friendId={postUserId}
        name={name}
        gender={gender}
        subtitle={location}
        userPicturePath={userPic}
      />

      <Typography color={main} sx={{ mt: "1rem", ml: "0.5rem" }}>
        {description}
      </Typography>

      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:8000/assets/${picturePath}`}
        />
      )}
      <Typography color={main} sx={{ mt: "1rem", ml: "0.5rem" }}>
        {date.slice(0, 10)}
      </Typography>
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={async () => {
                await handleLike();
              }}
            >
              {isLiked.likeState ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{isLiked.likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => {
                setIsComment(!isComment);
              }}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      <Box mt="0.5rem">
        {isComment &&
          comments.map(
            (
              { uid, firstName, lastName, profilePic, pid, date, content },
              i
            ) => (
              <Box key={`${firstName} ${lastName}-${i}`}>
                <Divider />
                <FlexBetween gap="1rem" alignItems="right">
                  <FlexBetween>
                    <UserImage image={profilePic} size="25px" />
                    <Typography
                      sx={{ color: main, m: "0.5rem 0", pl: "2rem" }}
                      align="left"
                    >
                      {content}
                    </Typography>
                  </FlexBetween>
                  <Typography>{date.slice(0, 10)}</Typography>
                </FlexBetween>
              </Box>
            )
          )}
        <Divider />
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
