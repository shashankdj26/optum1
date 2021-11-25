export const HotspotType = {
  transition: "transition",
  iframe: "iframe",
  video: "video",
  image: "image",
  pdf: "pdf",
  anchor: "anchor",
  videoPlayer: "videoPlayer",
  imagePlayer: "imagePlayer",
  pdfPlayer: "pdfPlayer",
  inlineVideo: "inlineVideo",
  chatbot: "chatbot",
  custom: "custom",
  videoCall: "videoCall",
  stallChat: "stallChat",
};

export const TransitionType = {
  withInComponent: 0,
  changeComponent: 1,
  changeOverlayComponent: 2,
};

export const HotspotButtonType = {
  default: "default",
  named: "named",
};

export const AnalyticsLocations = {
  Lobby: "lobby",
  Audi: "audi",
  Networking: "networking",
  DBR: "speakers",
  Rencen: "rencen",
  ExiBooth: "exibooth",
  ProductReviewBooth: "product_Booth",
};

export const VideoType = {
  youtube: "youtube",
  vimeo: "vimeo",
};

export const PointType = {
  InfoDesk: "InfoDesk",
  Photobooth: "Photobooth",
  TeamBuilding: "TeamBuilding",
  Audi: "Audi",
  NetworkingConnect: "NetworkingConnect",
  NetworkingSession: "NetworkingSession",
  NetworkingSpeakerProfile: "NetworkingSpeakerProfile",
  NetworkingChat: "NetworkingChat",
  Game: "Game",
};
export const PointValues = {
  InfoDesk: { value: 50, oneTime: true },
  Photobooth: { value: 20, oneTime: false },
  TeamBuilding: { value: 100, oneTime: true },
  Audi: { value: 20, oneTime: false },
  NetworkingConnect: { value: 20, oneTime: false },
  NetworkingSession: { value: 20, oneTime: false },
  NetworkingSpeakerProfile: { value: 20, oneTime: false },
  NetworkingChat: { value: 20, oneTime: false },
  Game: { value: 20, oneTime: false },
};

export const StaticLinks = {
  stallChat: "/stallChat/index.html",
  publicChat: "/publicChatEmail/index.html",
  publicChatFirebase: "/firebase-chat2/index.html",

  leaderProfile: " https://lpsummit2021.vccevents.com/#speakers-2021",
  agenda: "https://lpsummit2021.vccevents.com/#agenda",
  twitter: "https://wall.vccevents.com/", // "/tweets.html",
  Game: "/game/index.html",
  Photobooth: "/photobooth/index.html",
  photoMosaic: "https://photomosaic8.djvirtualevents.com/",
  survey: "/",
};

export const InternetStatus = {
  slow: "slow",
  moderate: "moderate",
  fast: "fast",
};
