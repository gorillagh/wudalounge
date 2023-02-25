import React, { useEffect, useState } from "react";
import { Box, Chip, Icon, IconButton } from "@mui/material";
import Dish from "../../components/PopUps/Admin/Dish";
import Subtitle from "../../components/Typography/Subtitle";
import ActionButton from "../../components/Buttons/ActionButton";
import CustomizedMenus from "../../components/Buttons/MenuAdd";
import MenuAdd from "../../components/Buttons/MenuAdd";
import Category from "../../components/PopUps/Admin/Category";
import Subcategory from "../../components/PopUps/Admin/Subcategory";
import Item from "../../components/PopUps/Admin/Item";
import Drink from "../../components/PopUps/Admin/Drink";

const Menu = (props) => {
  const [openDish, setOpenDish] = useState(false);
  const [openDrink, setOpenDrink] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  return (
    <>
      <Box px={2}>
        <Box
          my={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Subtitle my={1} title="Menu" />
          <MenuAdd
            setOpenDish={setOpenDish}
            setOpenDrink={setOpenDrink}
            setOpenCategory={setOpenCategory}
            setOpenSubcategory={setOpenSubcategory}
            setOpenItem={setOpenItem}
          />
        </Box>
      </Box>
      <Dish
        user={props.user}
        open={openDish}
        onClose={() => setOpenDish(false)}
      />
      <Drink
        user={props.user}
        open={openDrink}
        onClose={() => setOpenDrink(false)}
      />
      <Category
        user={props.user}
        open={openCategory}
        onClose={() => setOpenCategory(false)}
      />
      <Subcategory
        user={props.user}
        open={openSubcategory}
        onClose={() => setOpenSubcategory(false)}
      />
      <Item
        user={props.user}
        open={openItem}
        onClose={() => setOpenItem(false)}
      />
    </>
  );
};

export default Menu;
