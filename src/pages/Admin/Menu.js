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

const Menu = (props) => {
  const [openDish, setOpenDish] = useState(false);
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
            setOpenCategory={setOpenCategory}
            setOpenSubcategory={setOpenSubcategory}
            setOpenItem={setOpenItem}
          />
        </Box>
      </Box>
      <Dish open={openDish} onClose={() => setOpenDish(false)} />
      <Category open={openCategory} onClose={() => setOpenCategory(false)} />
      <Subcategory
        open={openSubcategory}
        onClose={() => setOpenSubcategory(false)}
      />
      <Item open={openItem} onClose={() => setOpenItem(false)} />
    </>
  );
};

export default Menu;
