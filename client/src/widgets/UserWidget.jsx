import {
  ManageAccounts,
  EditOutlined,
  LocationOnOutlined,
  BusinessOutlined,
  LocationOn,
  ManageAccountsOutlined,
  FemaleOutlined,
  MaleOutlined,
  CheckCircle,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "../components/UserImage";
import FlexBetween from "../components/FlexBetween";
import WidgetWrapper from "../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/${userId}`,
        {
          withCredentials: true,
        }
      );
      const userInfo = response.data;
      setUser(userInfo);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    gender,
    location,
    occupation,
    age,
    impressions,
    viewprofile,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Box display="flex" alignItems="center" gap="0.5rem" mb="0.5rem">
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName} {lastName}
              </Typography>
              <CheckCircle style={{ color: "#A4BE7B" }} />
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <Typography corlor={medium}>24</Typography>
              <Typography corlor={medium}>
                {gender === "M" ? (
                  <MaleOutlined style={{ color: "#2192FF" }} />
                ) : (
                  <FemaleOutlined style={{ color: "#CE7777" }} />
                )}
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined style={{ color: "#3C4048" }} />
      </FlexBetween>
      <Divider />

      <Divider />
      {/*  SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: main }}
            style={{ color: "#829460" }}
          />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <BusinessOutlined
            fontSize="large"
            sx={{ color: main }}
            style={{ color: "#90A17D" }}
          />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />
      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewprofile ? viewprofile : 0}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions ? impressions : 0}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />
      {/* CONTACT INFO */}
      <Box p="1rem">
        <FlexBetween>
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Contact Me
          </Typography>
          <EditOutlined
            sx={{ color: main }}
            style={{ color: "#3C4048" }}
            align="top"
          />
        </FlexBetween>
        {/* SOCIAL MEDIA ACCOUNTS */}
        <Box display="flex" gap="0.8rem" mb="0.5rem">
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src="../assets/twitter.png"
              alt="twitter"
              width="25px"
              height="25px"
              onClick={() => (window.location.href = "https://twitter.com/")}
            />
          </Typography>
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src="../assets/linkedin.png"
              alt="linkedin"
              width="25px"
              height="25px"
              onClick={() =>
                (window.location.href = "https://www.linkedin.com/")
              }
            />
          </Typography>
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src="../assets/youtube.png"
              alt="facebook"
              width="25px"
              height="25px"
              onClick={() =>
                (window.location.href = "https://www.youtube.com/")
              }
            />
          </Typography>
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src="../assets/instagram.png"
              alt="instagram"
              width="25px"
              height="25px"
              onClick={() =>
                (window.location.href = "https://www.instagram.com/")
              }
            />
          </Typography>
          <Typography
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <img
              src="../assets/facebook.png"
              alt="tiktok"
              width="25px"
              height="25px"
              onClick={() =>
                (window.location.href = "https://www.facebook.com/")
              }
            />
          </Typography>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
