import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Icon, IconButton, Typography } from "@mui/material";
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
import LoadingBackdrop from "../../components/Feedbacks/LoadingBackdrop";

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

  const [dishToEdit, setDishToEdit] = useState(null);
  const [drinkToEdit, setDrinkToEdit] = useState(null);

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

  const handleEditDish = (dish) => {
    setDishToEdit(dish);
    console.log("dish to edit--->", dish);
    setOpenDish(true);
  };
  const handleEditDrink = (drink) => {
    setDrinkToEdit(drink);
    setOpenDrink(true);
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Subtitle my={1} title="Menu" />
            <IconButton size="small" onClick={loadMenu}>
              <Icon color="primary" fontSize="small">
                refresh
              </Icon>
            </IconButton>
          </Box>
          <MenuAdd
            setOpenDish={setOpenDish}
            setDishToEdit={setDishToEdit}
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

        {filteredMenu && filteredMenu.length
          ? filteredMenu.map((item, index) => (
              <Box key={index} sx={{ ...cardStyle }}>
                {selectedMenuType === "dishes" ||
                selectedMenuType === "drinks" ? (
                  <Grid container columnSpacing={1}>
                    <Grid item xs={5}>
                      <img
                        src={item.image}
                        alt="favorite"
                        width="100%"
                        // height="100%"
                        style={{
                          borderRadius: "12px",
                        }}
                      />
                    </Grid>

                    <Grid item xs={7}>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography>{item.name}</Typography>
                        <IconButton
                          color="info"
                          size="small"
                          onClick={() => {
                            if (selectedMenuType === "dishes")
                              handleEditDish(item);
                            else handleEditDrink(item);
                          }}
                        >
                          <Icon fontSize="small">edit</Icon>
                        </IconButton>
                      </Box>
                      <Typography variant="body2" fontWeight={500}>
                        GHC{item.price}
                      </Typography>

                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      {item.category ? (
                        <Typography variant="body2" fontWeight={400}>
                          Category: {item.category.name}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                ) : (
                  <Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography>{item.name}</Typography>
                      <IconButton color="info" size="small">
                        <Icon fontSize="small">edit</Icon>
                      </IconButton>
                    </Box>
                    {item.additionalAmount ? (
                      <Typography variant="body2" fontWeight={400}>
                        GHC{item.additionalAmount}
                      </Typography>
                    ) : (
                      ""
                    )}
                    {item.type ? (
                      <Typography variant="body2" fontWeight={400}>
                        Type: {item.type}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                )}
              </Box>
            ))
          : ""}
        <LoadingBackdrop open={loading} />
      </Box>
      <Dish
        dishToEdit={dishToEdit}
        user={props.user}
        open={openDish}
        onClose={() => setOpenDish(false)}
      />
      <Drink
        drinkToEdit={drinkToEdit}
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
