import React from "react";
import Typography from "@mui/material/Typography";
import Link from "../Links/Link";
import { Container, Divider, Grid } from "@mui/material";

const footers = [
  {
    title: "Company",
    description: ["About Us", "Contact Us"],
  },

  {
    title: "Legal",
    description: ["Privacy policy", "Terms & conditions"],
  },
];

const Footer = (props) => {
  return (
    <>
      {/* <Container maxWidth="lg">
        <Divider sx={{ mt: 10, mb: 3 }} />
        <Grid container justifyContent="left">
          {footers.map((footer) => (
            <Grid item xs={3} sm={3} key={footer.title}>
              <Typography variant="body1" color="#f65114" gutterBottom>
                {footer.title}
              </Typography>
              {footer.description.map((item) => (
                <Typography variant="body2" lineHeight={2}>
                  <Link text={item} />
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container> */}
      <Typography variant="body2" align="center" sx={{ my: 4 }}>
        {"© "}
        <Link color="#f6a60b" text="Wuda Lounge" to="/" />{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
};

export default Footer;
