import { Box, Typography, useTheme } from "@mui/material";
import Friendship from "../components/Friendship";
import WidgetWrapper from "../components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFriendship, setFrienshipMode } from "../state/index.js";
import ReactCardFlip from "react-card-flip";
import FlexBetween from "../components/FlexBetween";

const FriendListWidget = ({ userId }) => {
  const friendship = useSelector((state) => state.friendship);
  //const friendshipMode = useSelector((state) => state.friendshipMode);

  const [followers, setFollowers] = useState([]);
  const [flip, setFlip] = useState(false);
  const [friendShipMode, setFriendShipMode] = useState(true);

  const dispatch = useDispatch();
  const { palette } = useTheme();

  const getUserFollowed = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/${userId}/followed`,
        {
          withCredentials: true,
        }
      );
      dispatch(
        setFriendship({
          friendship: response.data.map((personalInfo) => {
            const {
              followedId,
              firstName,
              lastName,
              occupation,
              gender,
              profilePic,
            } = personalInfo;
            return {
              id: followedId,
              name: `${firstName} ${lastName}`,
              occupation: occupation,
              gender: gender,
              profilePic: profilePic,
            };
          }),
        })
      );
    } catch (err) {
      return err;
    }
  };

  const getUsersFollower = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/${userId}/follower`,
        {
          withCredentials: true,
        }
      );
      setFollowers(
        {
          data: response.data.map((personalInfo) => {
            const {
              followerId,
              firstName,
              lastName,
              occupation,
              gender,
              profilePic,
            } = personalInfo;
            return {
              id: followerId,
              name: `${firstName} ${lastName}`,
              occupation: occupation,
              gender: gender,
              profilePic: profilePic,
            };
          }),
        }.data
      );
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getUserFollowed();
    getUsersFollower();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        align="right"
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={async () => {
          await setFlip(!flip);
          setFriendShipMode(!friendShipMode);
        }}
      >
        <img
          src="../assets/change.png"
          alt="shiftFollowList"
          width="25px"
          height="25px"
        />
      </Typography>
      <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
        <Box>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
            fontSize="1.2rem"
            align="center"
          >
            Followed List
          </Typography>
          <Typography display="flex" flexDirection="column" gap="1.5rem">
            {friendship.map((friendInfo) => {
              return (
                <Friendship
                  key={friendInfo.id}
                  friendId={friendInfo.id}
                  name={friendInfo.name}
                  subtitle={friendInfo.occupation}
                  gender={friendInfo.gender}
                  userPicturePath={friendInfo.profilePic}
                  friendShipMode={friendShipMode}
                />
              );
            })}
          </Typography>
        </Box>

        <Box>
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            sx={{ mb: "1.5rem" }}
            fontSize="1.2rem"
            align="center"
          >
            Follower List
          </Typography>
          <Typography display="flex" flexDirection="column" gap="1.5rem">
            {followers.map((friendInfo) => {
              return (
                <Friendship
                  key={friendInfo.id}
                  friendId={friendInfo.id}
                  name={friendInfo.name}
                  subtitle={friendInfo.occupation}
                  gender={friendInfo.gender}
                  userPicturePath={friendInfo.profilePic}
                  friendShipMode={friendShipMode}
                />
              );
            })}
          </Typography>
        </Box>
      </ReactCardFlip>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
