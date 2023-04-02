import React from "react";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge } from "@mui/material";

const DishCard = (props) => {
  return (
    <Box>
      {props.dishes &&
        props.dishes.map((d, i) => {
          let selected = false;
          let dishNumber = 0;
          props.cart &&
            props.cart.dishes &&
            props.cart.dishes.length &&
            props.cart.dishes.map((cartDish, i) => {
              if (cartDish._id === d._id) {
                selected = true;
                dishNumber += cartDish.dishQuantity;
              }
            });
          return (
            <Box key={i}>
              <Grid
                sx={{ cursor: "pointer" }}
                container
                spacing={1}
                onClick={() => props.handleDishSelect(d)}
              >
                <Grid
                  item
                  xs={7}
                  // md={4}
                  sx={{
                    borderLeft: selected ? 4 : 0,
                    borderLeftColor: selected ? "primary.main" : "",
                    boxSizing: "border-box",
                  }}
                >
                  <Typography fontWeight={600}>{d.name}</Typography>

                  <Typography
                    maxHeight="36.60px"
                    my={0.5}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    variant="body2"
                    color="text.secondary"
                  >
                    {d.description}
                  </Typography>
                  {props.discount && props.discount > 0 ? (
                    <Typography
                      sx={{
                        fontWeight: 600,
                        py: 1,
                        mr: 1,
                        textDecoration: "line-through",
                      }}
                      variant="body2"
                      component="span"
                      color="text.secondary"
                    >
                      GHC{d.price}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Chip
                    label={
                      <Typography variant="body2" fontWeight={600}>
                        GHC{d.price - d.price * props.discount}
                      </Typography>
                    }
                    color="secondary"
                  />
                </Grid>

                <Grid item xs={5}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="right"
                    width="100%"
                  >
                    <Badge
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      badgeContent={dishNumber}
                      color="primary"
                    >
                      <Box height={{ xs: "100px", md: "120px" }}>
                        <img
                          style={{ borderRadius: "12px", height: "100%" }}
                          alt="pork dish"
                          src={d.image}
                          // width="100%"
                        />
                      </Box>
                    </Badge>
                  </Box>
                </Grid>
              </Grid>
              {i === props.dishes.length - 1 ? "" : <Divider sx={{ my: 2 }} />}
            </Box>
          );
        })}
    </Box>
  );
};

export default DishCard;
