import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  MaleOutlined,
  FemaleOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriendship } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState } from "react";

const Friendship = ({
  friendId,
  name,
  subtitle,
  gender,
  userPicturePath,
  friendShipMode,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.users);
  const friendshipMode = useSelector((state) => state.friendshipMode);
  const friendship = useSelector((state) => state.friendship);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFollowedInit = friendship
    .map((friendInfo) => {
      return JSON.stringify(friendInfo).id === friendId ? 1 : 0;
    })
    .includes(1)
    ? 1
    : 0;

  const [isFollowed, setIsFollowed] = useState(isFollowedInit);

  const handleFriendship = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/${id}/${isFollowed}/${friendId}`,
        {
          withCredentials: true,
        }
      );

      setIsFollowed(!isFollowed);
      console.log(isFollowed);
    } catch (err) {
      return err;
    }
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              width="6rem"
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem" alignItems="center">
              {subtitle}
            </Typography>
            <Typography color={medium}>
              {gender === "M" ? (
                <MaleOutlined style={{ color: "#2192FF" }} />
              ) : (
                <FemaleOutlined style={{ color: "#CE7777" }} />
              )}
            </Typography>
          </Box>
        </FlexBetween>
        {friendShipMode && (
          <IconButton
            onClick={handleFriendship}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {isFollowed ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>
    </>
  );
};

export default Friendship;
