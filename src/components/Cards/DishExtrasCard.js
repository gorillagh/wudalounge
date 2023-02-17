import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { Icon } from "@mui/material";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#E3581C",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#E3581C",
  },
});

// Inspired by blueprintjs
function BpCheckbox(props) {
  return (
    <Checkbox
      sx={{
        "&:hover": { bgcolor: "transparent" },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

const DishExtrasCard = (props) => {
  return (
    <FormGroup>
      {props.dish.extras.map((extra, index) => (
        <Box key={index}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box boxSizing="border-box">
                <FormControlLabel
                  key={index}
                  control={
                    <BpCheckbox
                      inputProps={{ "aria-label": "controlled" }}
                      size="small"
                      checked={extra.checked}
                      onChange={(e) =>
                        props.setDish((prevState) => {
                          let foundIndex = prevState.extras.findIndex(
                            (f) => f.item === extra.item
                          );
                          prevState.extras[foundIndex].checked =
                            e.target.checked;
                          return { ...prevState };
                        })
                      }
                    />
                  }
                  label={extra.item}
                />
                <Box
                  sx={{
                    width: "80%",
                    // display: "flex",
                    borderRadius: "12px",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    px: 2,
                    boxSizing: "border-box",
                    display: extra.checked ? "flex" : "none",
                    boxShadow:
                      "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid
                      item
                      xs={2}
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        if (extra.quantity === 1) return;

                        props.setDish((prevState) => {
                          let foundIndex = prevState.extras.findIndex(
                            (f) => f.item === extra.item
                          );
                          prevState.extras[foundIndex].quantity -= 1;
                          return { ...prevState };
                        });
                      }}
                    >
                      <Box
                        display="flex"
                        boxSizing="border-box"
                        justifyContent="center"
                      >
                        <Icon fontSize="small" color="primary">
                          remove
                        </Icon>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography textAlign="center">
                        {extra.quantity}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        props.setDish((prevState) => {
                          let foundIndex = prevState.extras.findIndex(
                            (f) => f.item === extra.item
                          );
                          prevState.extras[foundIndex].quantity += 1;
                          return { ...prevState };
                        })
                      }
                    >
                      <Box
                        display="flex"
                        boxSizing="border-box"
                        justifyContent="center"
                      >
                        <Icon fontSize="small" color="primary">
                          add
                        </Icon>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {props.discount && props.discount > 0 ? (
                <Typography
                  variant="body2"
                  textAlign="right"
                  mr={1.5}
                  sx={{ textDecoration: "line-through" }}
                >
                  +GHC
                  {(extra.additionalAmount * extra.quantity).toFixed(2)}
                </Typography>
              ) : (
                ""
              )}

              <Typography textAlign="right">
                <Chip
                  sx={{
                    p: 0,
                  }}
                  label={
                    <Typography variant="body2" fontWeight={500}>
                      +GHC
                      {(
                        extra.additionalAmount * extra.quantity -
                        extra.additionalAmount * extra.quantity * props.discount
                      ).toFixed(2)}
                    </Typography>
                  }
                  color="secondary"
                />
              </Typography>
            </Grid>
          </Grid>
          {index === props.dish.extras.length - 1 ? (
            ""
          ) : (
            <Divider sx={{ my: 1 }} />
          )}
        </Box>
      ))}
    </FormGroup>
  );
};

export default DishExtrasCard;
