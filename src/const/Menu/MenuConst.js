export const menuItemsId = {
  Lobby: 1,
  Audi: 4,
  bdr: 2,
  Networking: 3,
  rescen: 5,
  exibooth: 6,
  ProductReview: 7,
  TeamBuilding: 8,
  MyProfile: 9,
  // zoomMeeting: 8,
};

export const menuItemsIndex = {
  Lobby: 0,
  Audi: 1,
  rescen: 2,
  exibooth: 3,
  Networking: 4,
  bdr: 5,
  ProductReview: 6,
  TeamBuilding: 7,
  MyProfile: 8,
  zoomMeeting: 9,
};

export const SubMenuId = {
  QNA: 1,
  POll: 2,
  GoToStage: 3,
  Call: 4,
  Chat: 5,
};

export const NetworkingSubmenuId = {
  Chat: 1,
};

export const DBRSubMenuIndex = {
  Call: 0,
  QNA: 1,
  POll: 2,
  GoToStage: 3,
};
export const rescenIndex = {};
export const menuItems = [
  {
    id: menuItemsId.Lobby,
    name: "Lobby",
    class: "icon-Lobby",
  },
  {
    id: menuItemsId.Audi,
    name: "Auditorium",
    class: "icon-peter-audi",
    subMenus: [
      { id: SubMenuId.QNA, name: "Comments", class: "icon-peter-comment2" },
      { id: SubMenuId.POll, name: "Poll", class: "icon-Poll" },
    ],
  },
  {
    id: menuItemsId.rescen,
    name: "Resource Centre",

    class: "icon-ResourceCenter",
    subMenus: [
      // { id: SubMenuId.Call, name: "Video Call", class: "icon-video" },
      // { id: SubMenuId.Chat, name: "Chat", class: "icon-chat" },
    ],
  },

  {
    id: menuItemsId.exibooth,
    name: "Breakout Rooms",
    disabled: true,

    class: "icon-exhibition-peter",
    subMenus: [
      // { id: SubMenuId.QNA, name: "Video Call", class: "icon-video" },
      // { id: SubMenuId.POll, name: "Chat", class: "icon-chat" },
    ],
  },

  {
    id: menuItemsId.Networking,
    name: "Lounge",
    disabled: true,
    class: "icon-lounge-peter",
    subMenus: [
      {
        id: NetworkingSubmenuId.Chat,
        name: "Private Chat",
        class: "icon-Chat",
      },
    ],
  },

  {
    id: menuItemsId.bdr,
    name: "SPEAKER LOUNGE",

    class: "icon-DBR",
    disabled: true,
    // get disabled(){
    //   return !window.isSpeaker
    // },
    room: {
      docName: "East&North",
      roomName: "bd-EastNorth",
    },
    subMenus: [
      { id: SubMenuId.GoToStage, name: "Go To Stage", class: "icon-Stage" },
    ],
  },
  {
    id: menuItemsId.ProductReview,
    name: "Product Preview",
    disabled: true,

    class: "icon-product-peter",
    subMenus: [
      // { id: SubMenuId.QNA, name: "Video Call", class: "icon-video" },
    ],
  },
  {
    id: menuItemsId.TeamBuilding,
    name: "Team Building Zone",

    class: "icon-DBR",
  },
  {
    id: menuItemsId.MyProfile,
    name: "Profile",
    class: "icon-Profile",
  },
];
