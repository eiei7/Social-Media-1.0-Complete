import { Box } from "@mui/material";
import { styled } from "@mui/system/";

/* Create a new commponent class called FlexBetween cause it'll be used quiet often.*/
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
