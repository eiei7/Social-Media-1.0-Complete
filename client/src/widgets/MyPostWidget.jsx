import {
  EditOutlined,
  DeleteOutlined,
  AttachEmailOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import FlexBetween from "../components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "../components/UserImage";
import WidgetWrapper from "../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../state";
import axios from "axios";
import InputEmoji from "react-input-emoji";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { id } = useSelector((state) => state.users);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name); //reference to table's attr in mysql
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/posts/write",
        formData,
        {
          withCredentials: true,
        }
      );
      //await dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.25rem">
        <UserImage image={picturePath} />
        <InputEmoji
          value={post}
          onChange={setPost}
          cleanOnEnter
          placeholder="What's in your mind...(up to 200 words)"
          maxLength={200}
          onResize={200}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5PX"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography
                      style={{
                        color: "darkgreen",
                        "&:hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      Drop Any Picture Here / Click to drop your local picture
                      here (accept png, jpg and jpeg)
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.2rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="2rem">
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            onClick={() => {
              setIsImage(!isImage);
            }}
          >
            {isImage ? (
              <>
                <img
                  src="../assets/growth.png"
                  alt="imageIcon"
                  width="25px"
                  height="25px"
                />
              </>
            ) : (
              <>
                <img
                  src="../assets/down-arrow.png"
                  alt="imageIcon"
                  width="25px"
                  height="25px"
                />
              </>
            )}
          </Typography>

          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="2rem">
                <Typography
                  color={mediumMain}
                  onClick={() =>
                    (window.location.href = "https://pixabay.com/")
                  }
                >
                  <img
                    src="../assets/image.png"
                    alt="imageIcon"
                    width="25px"
                    height="25px"
                  />
                </Typography>

                <Typography color={mediumMain}>
                  <img
                    src="../assets/attachment.png"
                    alt="imageIcon"
                    width="25px"
                    height="25px"
                    onClick={() =>
                      (window.location.href = "https://www.google.com/drive/")
                    }
                  />
                </Typography>

                <Typography color={mediumMain}>
                  <img
                    src="../assets/audio-headset.png"
                    alt="imageIcon"
                    width="25px"
                    height="25px"
                    onClick={() =>
                      (window.location.href = "https://music.youtube.com/")
                    }
                  />
                </Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
        </FlexBetween>
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
