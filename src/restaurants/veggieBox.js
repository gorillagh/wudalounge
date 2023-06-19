const veggieBox = {
  name: "Veggie Box",
  nameEqualsLogo: false,
  shortName: "Veggie Box",
  path: "veggie",
  nameExtension: "",
  website: "https://www.veggieboxgh.com",
  backgroundPic:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  orderDuration: 5,
  branches: [
    {
      name: "dansoman",
      address: {
        description: "Dansoman High Street, Accra, near Tanko's Kitchen",
        shortDescription: "Dansoman, Sakaman",
        googleAddress: {
          lng: -0.2706717944753955,
          lat: 5.569252300035966,
          description:
            "Near Tanko’s Kitchen Dansoman, Dansoman High Street, Accra, Ghana",
          matched_substrings: [
            {
              length: 5,
              offset: 0,
            },
          ],
          place_id: "ChIJ9fvJ1vCZ3w8RiahloP5ZVkM",
          reference: "ChIJ9fvJ1vCZ3w8RiahloP5ZVkM",
          structured_formatting: {
            main_text: "Veggie Box",
            main_text_matched_substrings: [
              {
                length: 5,
                offset: 0,
              },
            ],
            secondary_text: "Dansoman High Street, Accra, Ghana",
          },
          terms: [
            {
              offset: 0,
              value: "Veggie Box Dansoman",
            },
            {
              offset: 26,
              value: "Dansoman High Street",
            },
            {
              offset: 48,
              value: "Accra",
            },
            {
              offset: 55,
              value: "Ghana",
            },
          ],
          types: ["restaurant", "point_of_interest", "food", "establishment"],
        },
      },
      workingHours: [
        { day: "Monday", start: "8:30", close: "23:00" },
        { day: "Tuesday", start: "8:30", close: "23:00" },
        { day: "Wednesday", start: "8:30", close: "23:00" },
        { day: "Thursday", start: "8:30", close: "23:00" },
        { day: "Friday", start: "8:30", close: "23:00" },
        { day: "Saturday", start: "12:30", close: "23:00" },
        { day: "Sunday", start: "12:30", close: "23:00" },
      ],
      contact: {
        email: "support@veggieboxgh.com",
        phoneNumber: "+233245782965",
      },
    },
  ],

  socials: {
    facebook: {
      url: "https://www.facebook.com/chanchoman1",
      webUrl: "fb://profile/chanchoman1",
    },
    instagram: {
      webUrl: "instagram://user?username=veggiebox_gh",
      url: "https://www.instagram.com/governor_narh",
    },
    twitter: {
      webUrl: "twitter://user?screen_name=governornarh",
      url: "https://www.twitter.com/governornarh",
    },
    snapchat: {
      webUrl: "snapchat://add/wudalounge",
      url: "https://www.snapchat.com/add/chancho",
    },
    whatsapp: { number: "+233244885739" },
    boltFood: {
      url: "https://food.bolt.eu/en-US/137/p/38734-veggie-box",
    },
  },

  menu: {
    categories: [
      {
        name: "salad",
        description: "Fresh Salad",
        dishes: [],
      },
      {
        name: "breakfast",
        description: "VeggieBox Breakfast",
        dishes: [],
      },
      {
        name: "combo",
        description: "VeggieBox Combo",
        dishes: [],
      },
      { name: "juice", description: "Fresh Pressed Juices", dishes: [] },
      {
        name: "pastries",
        description: "Pastries",
        dishes: [],
      },
    ],
  },
  about: {
    texts: [
      "At Veggie Box, we're passionate about crafting fresh and delicious salads that celebrate nature's flavors.",
      "Our menu offers a wide variety of thoughtfully curated options for every taste and dietary preference.",
      "We source the finest ingredients from local farmers who share our commitment to sustainability.",
      "With customization options and friendly service, we invite you to indulge in a guilt-free, nourishing meal that's convenient and satisfying.",
      " Join us at Veggie Box and experience salads reimagined with love and care.",
    ],
    photos: [
      "https://res.cloudinary.com/gorillasystemsgh/image/upload/v1687096078/IMG-1601_gydrws.jpg",
    ],
  },

  theme: {
    palette: {
      mode: "light",
      primary: {
        light: "#76c479",
        main: "#4caf50",
        dark: "#3d8c40",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffc56f",
        main: "#ffa726",
        dark: "#ea8b00",
        contrastText: "#fff",
      },
      highlight: "#FFEB3B ",
      error: {
        main: "#ce0018",
        light: "#ff0220",
        dark: "#a50013",
        contrastText: "#fff",
      },
      info: {
        main: "#2196f3",
        light: "#62b5f7",
        dark: "#0b7ad1",
        contrastText: "#fff",
      },
      divider: "rgba(0, 0, 0, 0.08)",
    },

    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: [
        // "Ubuntu",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      h5: {
        fontFamily: "Ubuntu",
      },
      h4: {
        fontFamily: "Ubuntu",
      },
      body2: {
        fontSize: "0.8rem",
        color: "text.secondary",
        fontWeight: "300",
      },
    },
  },
};

export default veggieBox;
