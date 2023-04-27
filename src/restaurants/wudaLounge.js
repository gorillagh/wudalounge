const wudaLounge = {
  name: "Wuda Lounge",
  nameEqualsLogo: false,
  shortName: "Wuda",
  path: "wuda",
  nameExtension: "Lounge",
  website: "https://www.wudalounge.com",
  orderDuration: 20,
  branches: [
    {
      name: "Osu",
      address: {
        googleAddress: { lng: -0.18671566160150527, lat: 5.569976708828936 },
        description: "Opposite Police Headquaters Gate 1, Ring Rd E, Accra",
        shortDescription: "Ring Rd E, Accra",
      },
      workingHours: [
        { day: "Monday", start: "11:00", close: "23:00" },
        { day: "Tuesday", start: "11:00", close: "23:00" },
        { day: "Wednesday", start: "11:00", close: "23:00" },
        { day: "Thursday", start: "11:00", close: "23:00" },
        { day: "Friday", start: "11:00", close: "23:00" },
        { day: "Saturday", start: "11:00", close: "23:00" },
        { day: "Sunday", start: "13:00", close: "23:00" },
      ],
      contact: {
        email: "support@wudalounge.com",
        phoneNumber: "+233244885739",
      },
    },
  ],

  socials: {
    facebook: {
      url: "https://www.facebook.com/chanchoman1",
      webUrl: "fb://profile/chanchoman1",
    },
    instagram: {
      webUrl: "instagram://user?username=governor_narh",
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
  },

  menu: {
    categories: [
      {
        name: "chicken",
        description: "Chicken Dishes",
        dishes: [],
      },
      {
        name: "pork",
        description: "Pork Dishes",
        dishes: [],
      },
      {
        name: "tilapia",
        description: "Tilapia Dishes",
        dishes: [],
      },
      { name: "juice", description: "Juices", dishes: [] },
      {
        name: "special",
        description: "Special Picks",
        dishes: [],
      },
    ],
  },
  about: {
    texts: [
      "Welcome to Wuda Lounge, a family-owned and operated restauran that offers delicious and fresh meals for dine-in and delivery. We believe in using only the finest ingredients and preparing each dish to perfection, ensuring that every bite is memorable. From classic comfort foods to contemporary cuisine, we have something for everyone.",
      "Let us bring our passion for food to your door, and experience the taste of Wuda Lounge in the comfort of your own home.",
    ],
    photos: [
      "https://res.cloudinary.com/dkxrwzp2d/image/upload/v1675981586/IMG-0735_g5fyvp.jpg",
    ],
  },

  theme: {
    palette: {
      mode: "light",
      primary: {
        // light: "#f8bd49",
        // dark: "#c68507",
        // main: "#f6a60b",
        light: "#ea8255",
        main: "#E3581C",
        dark: "#b64616",
        contrastText: "#fff",
      },
      secondary: {
        // light: "#f88054",
        // main: "#f65114",
        // dark:'#cd3d08',
        light: "#f8bd49",
        main: "#f6a60b",
        dark: "c68507",
        contrastText: "#fff",
      },
      highlight: "#fee5b9",
      error: {
        main: "#ce0018",
        light: "#ff0220",
        dark: "#a50013",
        contrastText: "#fff",
      },
      info: {
        main: "#784af4",
        light: "#b095f9",
        dark: "#4c0ff0",
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
      // body1: { fontSize: "0.9rem" },
      body2: {
        fontSize: "0.8rem",
        color: "text.secondary",
        fontWeight: "300",
      },
    },
  },
};

export default wudaLounge;
