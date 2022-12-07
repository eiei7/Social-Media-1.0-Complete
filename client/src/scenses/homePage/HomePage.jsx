import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import UserWidget from "../../widgets/UserWidget";
import MyPostWidget from "../../widgets/MyPostWidget";
import PostsWidget from "../../widgets/PostsWidget";
import FriendListWidget from "../../widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, profilePic } = useSelector((state) => state.users);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.8rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
          <UserWidget userId={id} picturePath={profilePic} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "55%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={profilePic} />
          <PostsWidget userId={id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="30%">
            <FriendListWidget userId={id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
