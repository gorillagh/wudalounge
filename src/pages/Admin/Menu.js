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
import { getMenu } from "../../serverFunctions/menu";

const cardStyle = {
  p: 2,
  my: 3,
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(8.8px)",
  WebkitBackdropFilter: "blur(8.8px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
  webkitBackdropFilter: "blur(5px)",
  cursor: "pointer",
};

const Menu = (props) => {
  const [menuTypes, setMenuTypes] = useState([
    { label: "dishes", value: "dishes", count: 0 },
    { label: "drinks", value: "drinks", count: 0 },
    { label: "categories", value: "categories", count: 0 },
    { label: "subcategories", value: "subcategories", count: 0 },
    { label: "items", value: "items", count: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [openDish, setOpenDish] = useState(false);
  const [openDrink, setOpenDrink] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [openItem, setOpenItem] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menu, setMenu] = useState(null);
  const [filteredMenu, setFilteredMenu] = useState([]);

  const [selectedMenuType, setSelectedMenuType] = useState("dishes");

  const loadMenu = async () => {
    setLoading(true);
    setSelectedMenuType("dishes");
    try {
      const res = await getMenu(props.user.token);
      setMenu(res.data);
      setMenuTypes([
        { label: "dishes", value: "dishes", count: res.data.dishes.length },
        { label: "drinks", value: "drinks", count: res.data.drinks.length },
        {
          label: "categories",
          value: "categories",
          count: res.data.categories.length,
        },
        {
          label: "subcategories",
          value: "subcategories",
          count: res.data.subcategories.length,
        },
        { label: "items", value: "items", count: res.data.items.length },
      ]);
      setFilteredMenu(res.data.dishes);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleMenuFilter = async (value) => {
    setMenuLoading(true);
    try {
      if (menu) {
        setSelectedMenuType(value);
        switch (value) {
          case "dishes":
            setFilteredMenu(menu.dishes);
            break;
          case "drinks":
            setFilteredMenu(menu.drinks);
            break;
          case "items":
            setFilteredMenu(menu.items);
            break;
          case "categories":
            setFilteredMenu(menu.categories);
            break;
          case "subcategories":
            setFilteredMenu(menu.subcategories);
            break;
          default:
            setFilteredMenu(menu.dishes);
            break;
        }
        setMenuLoading(false);
      }
    } catch (error) {
      setMenuLoading(false);
      console.log(error);
    }
  };

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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={1}
        >
          {menuTypes.map((type, index) => (
            <Box key={index}>
              <ActionButton
                text={`${type.label} (${type.count})`}
                variant=""
                sx={{
                  textTransform: "capitalize",
                  py: 0,
                  fontSize: "0.85rem",
                  boxShadow:
                    "inset 0 0 0 1px rgba(16,22,26,.05), inset 0 -1px 0 rgba(16,22,26,.2)",
                  bgcolor: selectedMenuType === type.value ? "#fee5b9" : "#fff",
                  fontWeight: selectedMenuType === type.value ? 700 : "400",
                  color: selectedMenuType === type.value ? "primary.main" : "",
                  my: 1,
                  "&:hover": {
                    bgcolor: "#fee5b9",
                  },
                }}
                fullWidth={false}
                size="small"
                onClick={() => handleMenuFilter(type.value)}
              />
            </Box>
          ))}
        </Box>
        <Box>
          {filteredMenu.length
            ? filteredMenu.map((item, index) => (
                <Box
                  justifyContent="space-between"
                  alignItems="center"
                  key={index}
                >
                  {" "}
                  <Box
                    sx={{
                      ...cardStyle,
                    }}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {item.name}
                    </Box>
                  </Box>
                </Box>
              ))
            : ""}
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
