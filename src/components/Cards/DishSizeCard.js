import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
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
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#E3581C",
    // backgroundColor: "#b64616",
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const DishSizeCard = (props) => {
  return (
    <FormControl fullWidth>
      <RadioGroup
        value={
          props.dish.selectedSize
            ? props.dish.selectedSize.size
            : props.dish.sizes[0].size
        }
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(e) =>
          props.setDish((prevState) => {
            let foundIndex = prevState.sizes.findIndex(
              (f) => f.size === e.target.value
            );
            prevState.selectedSize = prevState.sizes[foundIndex];
            return { ...prevState };
          })
        }
      >
        {props.dish.sizes.map((size, index) => (
          <Box
            key={index}
            onClick={() =>
              props.setDish((prevState) => {
                prevState.selectedSize = size;
                return { ...prevState };
              })
            }
          >
            <Grid container sx={{ cursor: "pointer" }}>
              <Grid item xs={6}>
                <FormControlLabel
                  sx={{ width: "100%" }}
                  value={size.size}
                  control={<BpRadio />}
                  label={size.size[0].toUpperCase() + size.size.substring(1)}
                />
              </Grid>
              <Grid item xs={6}>
                {props.discount && props.discount > 0 ? (
                  <Typography
                    variant="body2"
                    textAlign="right"
                    mr={1.5}
                    sx={{ textDecoration: "line-through" }}
                  >
                    +GHC{size.additionalAmount.toFixed(2)}
                  </Typography>
                ) : (
                  ""
                )}

                <Typography textAlign="right">
                  <Chip
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        +GHC
                        {(
                          size.additionalAmount -
                          size.additionalAmount * props.discount
                        ).toFixed(2)}
                      </Typography>
                    }
                    color="secondary"
                  />
                </Typography>
              </Grid>
            </Grid>

            {index === props.dish.sizes.length - 1 ? (
              ""
            ) : (
              <Divider sx={{ my: 1 }} />
            )}
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default DishSizeCard;
