import { Box, Typography } from "@mui/material";

const HelperText = () => {
  return (
    <Box gap="0.8rem">
      <Typography sx={{ fontSize: "22px" }}>What you can do? 📃</Typography>
      <Typography sx={{ fontSize: "14px" }}>
        👉Create a new post with text, emoji, or picture.
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        👉Click to dropzone to upload your local picture or pull an image from
        internet on dropzone.
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        👉Flip followedList to check your follwers.
      </Typography>
      <Typography>
        👉Your homepage shows all the posts include yours and your followed
        objects.
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        👉Click heart icon which represents like or remove like for any post.
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        👉Click message icon to check all the message of a post.(If there's no
        message left it won't react.)
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        👉Click your followed object's name, and then you'll be brought to your
        followed object's personal profile.
      </Typography>
      <Typography sx={{ fontSize: "14px" }}>
        <Typography style={{ color: "red" }}>Want to logout? 👣</Typography>
        👉Click menue item (top right).
      </Typography>

      <Typography sx={{ fontSize: "14px" }}>
        <Typography style={{ color: "red" }}>
          Want to explore more? 🤓
        </Typography>
        👉Try to click some unique icon.
      </Typography>

      <Typography sx={{ fontSize: "20px" }}>
        THE END🎉: Thank you for visiting my website ❗
        <Typography sx={{ fontSize: "20px" }}>
          I'll keep exploring more functions of a social network app.👍
        </Typography>
      </Typography>
    </Box>
  );
};

export default HelperText;
