import { menuItems, menuItemsIndex } from "../../const/Menu/MenuConst";
import { VideoString } from "../../const/assets/VideoString";
import {
  TransitionType,
  HotspotType,
  HotspotButtonType,
  StaticLinks,
} from "../../const/fixed/Types";
import { ImageString } from "../../const/assets/ImageString";
import {
  LobbyStall1PdfPlayer,
  LobbyStall1VideoPlayer,
  LobbyStall1BusinessCardPlayer,
  VideoPlayerData,
  CoinDCXVideoPlayer,
} from "./realtimeData";
import { isMobileOnly, isIOS } from "react-device-detect";

//copy it and modify
export let Booth1Hotspot = {
  AUSSIE_KIWI_CATS_DOGS_stallChat: {
    id: "AUSSIE_KIWI_CATS_DOGS_stallChat",
    enabled: true,
    name: "Chat With Us",
    style: {
      margin: "3.4% 15.8%",
      background: "#8CCFE2",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "AUSSIE_KIWI_CATS_DOGS",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/AUSSIE_KIWI_CATS_DOGS_stall",
      id: "StallChat",
    },
  },
  AUSSIE_KIWI_CATS_DOGS_website: {
    id: "AUSSIE_KIWI_CATS_DOGS_website",
    enabled: true,
    name: "Aussie Kiwi",
    style: {
      margin: "3.4% -12.8%",
      background: "#8CCFE2",
    },
    hotspotType: HotspotType.pdf,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall1%2Fstall1_kiwi.pdf",
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/AUSSIE_KIWI_CATS_DOGS_stall",
      id: "Pdf_Aussie_Kiwi",
    },
  },
  AUSSIE_KIWI_CATS_DOGS_pdf: {
    id: "AUSSIE_KIWI_CATS_DOGS_pdf",
    enabled: true,
    name: "Cats & Dogs",
    style: {
      margin: "3.4% 1.8%",
      background: "#8CCFE2",
    },
    customAnalytics: {
      path: "/AUSSIE_KIWI_CATS_DOGS_stall",
      id: "Pdf_Cat_Dog",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall1%2Fstall1_cat_dog.pdf",
    // link: "/digitalRack/index.html?MIDC",
  },
  AUSSIE_KIWI_CATS_DOGS_video: {
    id: "AUSSIE_KIWI_CATS_DOGS_video",
    enabled: true,
    name: "Watch Me",
    style: {
      margin: "3.4% -23.5%",
      background: "#8CCFE2",
    },
    customAnalytics: {
      path: "/AUSSIE_KIWI_CATS_DOGS_stall",
      id: "video",
    },
    hotspotType: HotspotType.video,
    buttonType: HotspotButtonType.named,
    link: "https://vimeo.com/628829924/f84a99f866",
  },
};
export let Booth2Hotspot = {
  MAKE_IT_MATCH_stallChat: {
    id: "MAKE_IT_MATCH_stallChat",
    enabled: true,
    name: "Chat With Us",
    style: {
      margin: "3.4% 15.6%",
      background: "#f291bc",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "MAKE_IT_MATCH",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/MAKE_IT_MATCH_stall",
      id: "StallChat",
    },
  },
  MAKE_IT_MATCH_website: {
    id: "MAKE_IT_MATCH_website",
    enabled: true,
    name: "Matching Family",
    style: {
      margin: "3.4% -12.8%",
      background: "#f291bc",
    },
    hotspotType: HotspotType.pdf,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall2%2Fstall2_1.pdf",
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/MAKE_IT_MATCH_stall",
      id: "website",
    },
  },
  MAKE_IT_MATCH_Pdf: {
    id: "MAKE_IT_MATCH_Pdf",
    enabled: true,
    name: "Matching Family",
    style: {
      margin: "3.4% 1.6%",
      background: "#f291bc",
    },
    customAnalytics: {
      path: "/MAKE_IT_MATCH_stall",
      id: "PDF",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall2%2Fstall2_2.pdf",
    // link: "/digitalRack/index.html?MintStall",
  },
  MAKE_IT_MATCH_Video: {
    id: "MAKE_IT_MATCH_Video",
    enabled: true,
    name: "Watch Me",
    style: {
      margin: "3.4% -22.1%",
      background: "#f291bc",
    },
    customAnalytics: {
      path: "/MAKE_IT_MATCH_stall",
      id: "Video",
    },
    hotspotType: HotspotType.video,
    buttonType: HotspotButtonType.named,
    link: "https://vimeo.com/628831153/b652149d34",
  },
};
export let Booth3Hotspot = {
  GIFT_GIFT_GIFT_stallChat: {
    id: "GIFT_GIFT_GIFT_stallChat",
    enabled: true,
    name: "Chat With Us",
    style: {
      margin: "3.4% 16.7%",
      background: "#BF2A2A",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "GIFT_GIFT_GIFT",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/GIFT_GIFT_GIFT_stall",
      id: "StallChat",
    },
  },
  GIFT_GIFT_GIFT_website: {
    id: "GIFT_GIFT_GIFT_website",
    enabled: true,
    name: "Fashionistas & Luxury Lovers",
    style: {
      margin: "3.4% -14%",
      background: "#BF2A2A",
    },
    hotspotType: HotspotType.pdf,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall3%2Fstall3_1.pdf",
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/GIFT_GIFT_GIFT_stall",
      id: "website",
    },
  },
  GIFT_GIFT_GIFT_Pdf: {
    id: "GIFT_GIFT_GIFT_Pdf",
    enabled: true,
    name: "Merry Matchers & Superstars",
    style: {
      margin: "3.4% 2.4%",
      background: "#BF2A2A",
    },
    customAnalytics: {
      path: "/GIFT_GIFT_GIFT_stall",
      id: "PDF",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall3%2Fstall3_2.pdf",
  },
  // CoinDCX_QR_CODE: {
  //   id: "CoinDCX_QR_CODE",
  //   enabled: true,
  //   name: "QR Code",
  //   style: {
  //     margin: "10% 21%",
  //   },
  //   customAnalytics: {
  //     path: "/CoinDCX_Stall",
  //     id: "CoinDCX_QR_CODE",
  //   },
  //   hotspotType: HotspotType.image,
  //   buttonType: HotspotButtonType.named,
  //   link: "/assets/content/stall3/Qr-code.jpg",
  //   // link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall3%2FQr-code.pdf",
  // },
  GIFT_GIFT_GIFT_Video: {
    id: "GIFT_GIFT_GIFT_Video",
    enabled: true,
    name: `Watch Me`,
    style: {
      margin: "3.4% -22.6%",
      background: "#BF2A2A",
    },
    customAnalytics: {
      path: "/GIFT_GIFT_GIFT_stall",
      id: "Video",
    },
    hotspotType: HotspotType.video,
    link: "https://vimeo.com/628830465/cdc68c42a7",
    buttonType: HotspotButtonType.named,
  },
};

export let Booth4Hotspot = {
  VM_ME_stallChat: {
    id: "VM_ME_stallChat",
    enabled: true,
    name: "Chat With Us",
    style: {
      margin: "4% 15.7%",
      background: "#2A2776",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "VM_ME",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/VM_ME_stall",
      id: "StallChat",
    },
  },
  VM_ME_how_to: {
    id: "VM_ME_website",
    enabled: true,
    name: "How To",
    style: {
      margin: "4.0% -13.6%",
      background: "#2A2776",
    },
    hotspotType: HotspotType.video,
    link: "https://vimeo.com/628869412/d24743e35a",
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/VM_ME_stall",
      id: "how_to",
    },
  },
  VM_ME_Pdf: {
    id: "VM_ME_Pdf",
    enabled: true,
    name: "Prop Guide",
    style: {
      margin: "4% 1.2%",
      background: "#2A2776",
    },
    customAnalytics: {
      path: "/VM_ME_stall",
      id: "Pdf",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall4%2Fstall4_1.pdf",
  },
  // CoinDCX_QR_CODE: {
  //   id: "CoinDCX_QR_CODE",
  //   enabled: true,
  //   name: "QR Code",
  //   style: {
  //     margin: "10% 21%",
  //   },
  //   customAnalytics: {
  //     path: "/CoinDCX_Stall",
  //     id: "CoinDCX_QR_CODE",
  //   },
  //   hotspotType: HotspotType.image,
  //   buttonType: HotspotButtonType.named,
  //   link: "/assets/content/stall3/Qr-code.jpg",
  //   // link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fstall3%2FQr-code.pdf",
  // },
  VM_ME_Video: {
    id: "VM_ME_Video",
    enabled: true,
    name: `Watch Me`,
    style: {
      margin: "4% -23.3%",
      background: "#2A2776",
    },
    customAnalytics: {
      path: "/VM_ME_stall",
      id: "Video",
    },
    hotspotType: HotspotType.video,
    link: "https://vimeo.com/628831741/03d14b3f46",
    buttonType: HotspotButtonType.named,
  },
};
export let BreakoutRoomsHotspot = {
  QLD: {
    id: "QLD",
    enabled: true,
    name: "QLD",
    zoomLnk: true,
    style: {
      margin: "5.5% -22.5%",
    },
    hotspotType: HotspotType.anchor,
    buttonType: HotspotButtonType.default,
    link: "https://us02web.zoom.us/j/83716835306",
  },

  VIC_TAS: {
    id: "VIC_TAS",
    enabled: true,
    name: "VIC/TAS",
    zoomLnk: true,
    style: {
      margin: "5.5% -5.1%",
    },
    hotspotType: HotspotType.anchor,
    buttonType: HotspotButtonType.default,
    link: "https://us02web.zoom.us/j/89111134608",
  },
  NSW_ACT: {
    id: "NSW_ACT",
    enabled: true,
    name: "NSW/ACT",
    zoomLnk: true,
    style: {
      margin: "5.5% 11.8%",
    },
    hotspotType: HotspotType.anchor,
    buttonType: HotspotButtonType.default,
    link: "https://us02web.zoom.us/j/88479629795",
  },
  SA_FNQ: {
    id: "SA_FNQ",
    enabled: true,
    name: "SA/FNQ",
    zoomLnk: true,
    style: {
      margin: "-1.4% -19%",
    },
    hotspotType: HotspotType.anchor,
    buttonType: HotspotButtonType.default,
    link: "https://us02web.zoom.us/j/86551119239",
  },
  NZ: {
    id: "NZ",
    enabled: true,
    name: "NZ",
    zoomLnk: true,
    style: {
      margin: "-1.7% -5.2%",
    },
    hotspotType: HotspotType.anchor,
    buttonType: HotspotButtonType.default,
    link: "https://us02web.zoom.us/j/87998755887",
  },
  WA: {
    id: "WA",
    enabled: true,
    name: "WA",
    zoomLnk: true,
    style: {
      margin: "-1.7% 7.8%",
    },
    hotspotType: HotspotType.anchor,
    buttonType: HotspotButtonType.default,
    link: "https://us02web.zoom.us/j/82677721674",
  },
};
export let InfoHotspots = {
  Agenda: {
    id: "Agenda",
    enabled: true,
    name: "Agenda",
    desk_style: {
      margin: "2.4% -15%",
    },
    mobile_style: {
      margin: "3.5% -15.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },
    // style: {
    //   margin: "5.5% -13.5%",
    // },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.default,
    // link: StaticLinks.agenda,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Foptum-2021%2FAgenda.pdf",
    // link: "https://mintinvestmentsummit.com/#responsive",
  },
  helpdesk: {
    id: "HelpdeskChat",
    enabled: false,
    name: "Chat With Us",
    style: {
      margin: "5.8% -4.5%",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "Helpdesk",
    },
    buttonType: HotspotButtonType.named,
  },
  FAQ: {
    id: "FAQs",
    enabled: true,
    name: "FAQs",
    desk_style: {
      margin: "2.4% 7.7%",
    },
    mobile_style: {
      margin: "3.5% 7.4%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },
    // style: {
    //   margin: "5.6% 5.4%",
    // },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.default,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fdummy.pdf",
  },
};

export let BoothZoneHotSpot = {
  boothPhoto: {
    id: "photoBooth_zone",
    enabled: true,
    desk_style: {
      margin: "-1.6% -6%",
    },
    mobile_style: {
      margin: isIOS ? "-1.6% -6%" : "-1.6% -6%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },

    // hotspotType: HotspotType.iframe,
    // link: StaticLinks.Photobooth,
    hotspotType: HotspotType.transition,
    transitionVideo: null,
    transitionType: TransitionType.changeOverlayComponent,
    newItem: menuItems[menuItemsIndex.Photobooth],
  },
};

export let GameHotspot = {
  runner: {
    id: "runnerGame",
    name: "Game Zone",
    enabled: true,
    desk_style: {
      margin: "10.2% -7.2%",
    },
    mobile_style: {
      margin: "11.6% -7.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },
    hotspotType: HotspotType.iframe,
    link: "/InfiniteRunner/index.html",
  },
  cricket: {
    id: "wordScramble",
    enabled: true,
    name: "wordScramble",
    desk_style: {
      margin: "10.2% 2.4%",
    },
    mobile_style: {
      margin: "11.6% 2.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },
    hotspotType: HotspotType.iframe,
    link: "/wordScramble/index.html",
  },
};

//copy it and modify
export let LobbyStall1Hotspot = {
  AboutVCCIRCLE: {
    id: "AboutVCCIRCLE",
    enabled: true,
    name: "ABOUT VCCEDGE",
    style: {
      margin: "-6% -17.8%",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    // link: LobbyStall1PdfPlayer,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2FVCCEdgeBrandDeck.pdf",
    customAnalytics: {
      path: "/vccEdgeStall",
      id: "AboutVCCIRCLE",
    },
  },
  LP_Report_2020_Finalcomp: {
    id: "LP_Report_2020_Finalcomp",
    enabled: true,
    name: "LIMITED PARTNERS REPORT",
    style: {
      margin: "-2% -19.8%",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    // link: LobbyStall1PdfPlayer,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2FLP_Report_2020_Finalcomp.pdf",
    customAnalytics: {
      path: "/vccEdgeStall",
      id: "LP_Report_2020_Finalcomp",
    },
  },
  "ANNUAL_DEAL_REPORT.": {
    id: "ANNUAL_DEAL_REPORT",
    enabled: true,
    name: "ANNUAL DEAL REPORT",
    style: {
      margin: "2% -19.8%",
    },
    hotspotType: HotspotType.pdf,
    buttonType: HotspotButtonType.named,
    // link: LobbyStall1PdfPlayer,
    link: "/web/viewer.html?file=%2Fassets%2Fcontent%2FANNUAL_DEAL_REPORT.pdf",
    customAnalytics: {
      path: "/vccEdgeStall",
      id: "ANNUAL_DEAL_REPORT",
    },
  },
  stallChat: {
    id: "StallChat-1",
    enabled: true,
    name: "Live Chat",
    style: {
      margin: "8.5% -6.8%",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "LobbyStall1",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/vccEdgeStall",
      id: "LobbyStall1",
    },
  },
  stallCall: {
    id: "stallCall",
    enabled: true,
    name: "Video Call",
    style: {
      margin: "8.5% 2.2%",
    },

    hotspotType: HotspotType.videoCall,
    roomDetails: {
      // id: "vccedgeStall",
      id: "lobbystall1",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/vccEdgeStall",
      id: "stallCall",
    },
  },
};
export let ResourceCenterStalls = {
  stallChat: {
    id: "ResourceCenter_Chat",
    enabled: false,
    name: "Live Chat",
    style: {
      margin: "5.5% -7.5%",
    },
    hotspotType: HotspotType.stallChat,
    roomDetails: {
      id: "ResourceCenter",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/ResourceCenter_stall",
      id: "StallChat",
    },
  },
  stallCall: {
    id: "ResourceCenter_stallCall",
    enabled: false,
    name: "Video Call",
    style: {
      margin: "9.5% -7.5%",
    },

    hotspotType: HotspotType.videoCall,
    roomDetails: {
      id: "ResourceCenter",
    },
    buttonType: HotspotButtonType.named,
    customAnalytics: {
      path: "/ResourceCenter_stall",
      id: "StallCall",
    },
  },
  video: {
    id: "ResourceCenter_centerVideo",
    enabled: true,
    name: `video`,
    style: {
      margin: "-14% 28%",
    },
    hotspotType: HotspotType.video,
    buttonType: HotspotButtonType.default,
    link: "https://www.youtube.com/watch?v=huMorwstIpY",
    customAnalytics: {
      path: "/ResourceCenter_stall",
      id: "video",
    },
  },
  videoPlayer: {
    id: "ResourceCenter_videoPlayer",
    enabled: true,
    name: `Video Resources`,
    style: {
      margin: isMobileOnly ? "-4% -3%" : "-4% -3%",
    },
    hotspotType: HotspotType.videoPlayer,
    link: VideoPlayerData,
    buttonType: HotspotButtonType.default,
    customAnalytics: {
      path: "/ResourceCenter_stall",
      id: "Video_Resources",
    },
  },

  pdfPlayer: {
    id: "ResourceCenter_pdfPlayer",
    enabled: true,
    name: `Good Reads`,
    style: {
      margin: isMobileOnly ? "-3% -15%" : "-3% -14.2%",
    },
    hotspotType: HotspotType.pdfPlayer,
    link: LobbyStall1PdfPlayer,
    buttonType: HotspotButtonType.default,
    customAnalytics: {
      path: "/ResourceCenter_stall",
      id: "pdf_Resources",
    },
  },
  Resources: {
    id: "ResourceCenter_Resources",
    enabled: false,
    name: "PDF Resources",
    style: {
      margin: "8% 25.25%",
    },
    hotspotType: HotspotType.iframe,
    buttonType: HotspotButtonType.named,
    link: "/digitalRack/index.html?ResourceCenter",
    customAnalytics: {
      path: "/ResourceCenter_stall",
      id: "Resources",
    },
  },
};
export let zoomMeeting = {};
export let AudiData = {
  introVideo: VideoString.AUDITORIUM,
  link: "https://vimeo.com/event/473964",
  placementStyle: { margin: "10.8% 34.2%", width: "30.9%", height: "57%" },
};

export let AudiZoomLink = {
  link: "https://zoom.us/j/2324742936?pwd=N2gxVHRhdHg0dDJUYWVhN0NLdml6dz09",
};

export let DBRData = {
  introVideo: VideoString.DBRLOOP,
  link: "https://vimeo.com/event/473964",
  placementStyle: { margin: "10.9% 37.5%", width: "22.2%", height: "28.9%" },
  zoomlink: "",
};

export let TeamsData = {
  "pdf-1": {
    id: "pdf=1",
    name: "ABOUT THE ACTIVITY",
    description: "",
    link: "/assets/content/TeamBuildingInfo.pdf",
    button: "READ MORE",
  },
  link1: {
    id: "link1",
    name: "Team Leadership",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_ODFmOTI3MTUtZTFmNy00NTgwLWExMzItOTI2MzkyNmFmYTlk%40thread.v2/0?context=%7b%22Tid%22%3a%2225c1df4b-00ea-4e39-98bd-5f1143c5c5df%22%2c%22Oid%22%3a%22abcb8352-f7bf-475a-82d7-cb6c48c7d70f%22%7d",
  },
  link2: {
    id: "link2",
    name: "Team Mindset",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link3: {
    id: "link3",
    name: "Team Values",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link4: {
    id: "link4",
    name: "Team Rising",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link5: {
    id: "link5",
    name: "Team Leadership",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link6: {
    id: "link6",
    name: "Team Mindset",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link7: {
    id: "link7",
    name: "Team Values",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link8: {
    id: "link8",
    name: "Team Rising",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link9: {
    id: "link9",
    name: "Team Values",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
  link10: {
    id: "link10",
    name: "Team Rising",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    link: "https://www.r1rcm.com/",
  },
};
// /web/viewer.html?file=%2F
export const LobbyHotspotsId = {
  Survey: "Survey",
  Twitter: "Twitter",
  Audi: "Audi",
  Networking: "Networking",
  Infodesk: "Infodesk",
  Agenda: "Agenda",
  LobbyStall1: "LobbyStall1",
  LobbyStall2: "exibition__stall1",
  LobbyStall3: "exibition__stall2",
  LobbyStall4: "exibition__stall3",
  DBR: "DBR",
  LeadersProfile: "SpeakerProfile",
  ResourceCenter: "ResourceCenter",
  ExibitionHotspot: "ExibitionHotspot",
  zoomMeeting: "zoomMeeting",
  ProductReview: "ProductReview",
  TeamBuilding: "TeamBuilding",
  GameZone: "GameZone",
};

export let NetworkingHotspot = {
  [LobbyHotspotsId.Survey]: {
    id: LobbyHotspotsId.Survey,
    enabled: false,
    style: {
      margin: "-8% -10%",
    },
    hotspotType: HotspotType.iframe,
    link: StaticLinks.survey,
    buttonType: HotspotButtonType.default,
    name: "Survey",
  },
};

export let ProductReviewHotspots = {
  booth1: {
    id: "AUSSIE_KIWI_CATS_DOGS_stall",
    enabled: true,
    style: {
      margin: "-5% -29%",
      width: "10%",
      height: "auto",
    },
    hotspotType: HotspotType.transition,
    transitionVideo: null,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.stall1,
    hotspot: Booth1Hotspot,
    name: "AUSSIE KIWI CATS & DOGS",
  },
  booth2: {
    id: "MAKE_IT_MATCH_stall",
    enabled: true,
    style: {
      margin: "3% -20%",
      width: "10%",
      height: "auto",
    },
    hotspotType: HotspotType.transition,
    transitionVideo: null,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.stall2,
    hotspot: Booth2Hotspot,
    name: "MAKE IT MATCH",
  },
  booth3: {
    id: "GIFT_GIFT_GIFT_stall",
    enabled: true,
    style: {
      margin: "3% 9.5%",
      width: "10%",
      height: "auto",
    },
    hotspotType: HotspotType.transition,
    transitionVideo: null,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.stall3,
    hotspot: Booth3Hotspot,
    name: "GIFT GIFT GIFT",
  },
  booth4: {
    id: "VM_ME_stall",
    enabled: true,
    style: {
      margin: "-5.1% 17%",
      width: "10%",
      height: "auto",
    },
    hotspotType: HotspotType.transition,
    transitionVideo: null,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.stall4,
    hotspot: Booth4Hotspot,
    name: "VM ME",
  },
};
export let LobbyHotspots = {
  [LobbyHotspotsId.Survey]: {
    id: LobbyHotspotsId.Survey,
    enabled: false,
    style: {
      margin: "-2% -45%",
    },
    hotspotType: HotspotType.iframe,
    link: StaticLinks.survey,
    // hotspotType: HotspotType.custom,
  },
  [LobbyHotspotsId.Twitter]: {
    id: LobbyHotspotsId.Twitter,
    enabled: false,
    style: {
      margin: "-2% 37.5%",
    },
    hotspotType: HotspotType.iframe,
    link: StaticLinks.twitter,
  },
  [LobbyHotspotsId.Audi]: {
    id: LobbyHotspotsId.Audi,
    enabled: true,
    desk_style: {
      margin: "-5.4% -3.5%",
    },
    mobile_style: {
      margin: "-3.4% -3%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },

    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOBBYTOAudi,
    transitionType: TransitionType.changeComponent,
    newItem: menuItems[menuItemsIndex.Audi],
  },
  [LobbyHotspotsId.Networking]: {
    id: LobbyHotspotsId.Networking,
    enabled: false,
    desk_style: {
      margin: "-2.4% 13.5%",
    },
    mobile_style: {
      margin: "-2.4% 13.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },

    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOBBY_TO_NETWORKING,
    transitionType: TransitionType.changeComponent,
    newItem: menuItems[menuItemsIndex.Networking],
  },
  // [LobbyHotspotsId.LeadersProfile]: {
  //   id: LobbyHotspotsId.LeadersProfile,
  //   enabled: true,
  //   style: {
  //     margin: "9% 5.75%",
  //   },
  //   hotspotType: HotspotType.iframe,
  //   // link: StaticLinks.leaderProfile,
  //   // link: "/web/viewer.html?file=%2Fassets%2Fcontent%2Fsample.pdf",
  //   link: "https://mintinvestmentsummit.com/#team",
  // },

  [LobbyHotspotsId.GameZone]: {
    id: "GameZone",
    enabled: true,
    style: {
      margin: isMobileOnly ? "0.6% -13.4%" : "-0.4% -13.4%",
    },
    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOOBYTOGAMEZONE,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.GameZone,
    hotspot: GameHotspot,
    // buttonType: HotspotButtonType.named,
    //leaderboardPoint: PointType.Game,
  },

  [LobbyHotspotsId.Infodesk]: {
    id: LobbyHotspotsId.Infodesk,
    enabled: true,
    desk_style: {
      margin: "10% -2.5%",
    },
    mobile_style: {
      margin: "11% -2.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },

    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOOBYTOINFO,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.Infodesk,
    hotspot: InfoHotspots,
    name: LobbyHotspotsId.Infodesk,
  },

  [LobbyHotspotsId.TeamBuilding]: {
    id: "Meet_our_leaders",
    enabled: true,
    style: {
      margin: "-1.5% 23.5%",
    },
    hotspotType: HotspotType.transition,
    // transitionVideo: VideoString.LOBBY_TO_JURY,
    transitionVideo: null,
    transitionType: TransitionType.changeOverlayComponent,
    newItem: menuItems[menuItemsIndex.TeamBuilding],
  },

  [LobbyHotspotsId.ProductReview]: {
    id: LobbyHotspotsId.ProductReview,
    enabled: false,
    desk_style: {
      margin: "-2.4% -20.5%",
    },
    mobile_style: {
      margin: "-2.4% -20.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },

    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOBBY_TO_PRODUCT_REVIEW,
    transitionType: TransitionType.changeComponent,
    newItem: menuItems[menuItemsIndex.ProductReview],
    hotspot: ProductReviewHotspots,
    name: LobbyHotspotsId.ProductReview,
  },
  [LobbyHotspotsId.ExibitionHotspot]: {
    id: LobbyHotspotsId.ExibitionHotspot,
    enabled: false,
    desk_style: {
      margin: "-2.4% 4.5%",
    },
    mobile_style: {
      margin: "-2.4% 4.5%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },

    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOBBY_TO_EXHIBITION,
    transitionType: TransitionType.changeComponent,
    newItem: menuItems[menuItemsIndex.exibooth],
    hotspot: BreakoutRoomsHotspot,
  },
  // [LobbyHotspotsId.zoomMeeting]: {
  //   id: LobbyHotspotsId.zoomMeeting,
  //   get enabled() {
  //     return window.isSpeaker;
  //   },
  //   style: {
  //     margin: "-2.5% 16.5%",
  //   },
  //   hotspotType: HotspotType.transition,
  //   transitionVideo: VideoString.LOBBY_TO_SPEAKER,
  //   transitionType: TransitionType.changeComponent,
  //   hotspot: zoomMeeting,
  //   newItem: menuItems[menuItemsIndex.bdr],
  // },
  // [LobbyHotspotsId.DBR]: {
  //   id: LobbyHotspotsId.DBR,
  //   enabled: true,
  //   style: {
  //     margin: "-2.5% 16.5%",
  //   },
  //   hotspotType: HotspotType.transition,

  //   checkBeforeTransition: true,
  //   checkId: {
  //     docName: "East&North",
  //     roomName: "bd-EastNorth",
  //   },

  //   transitionVideo: VideoString.LOBBY_TO_SPEAKER,
  //   transitionType: TransitionType.changeComponent,
  //   newItem: menuItems[menuItemsIndex.bdr],
  // },

  photoMosaic: {
    id: "Say_Cheese",
    enabled: true,
    desk_style: {
      margin: "0.4% 7.4%",
    },
    mobile_style: {
      margin: "1.4% 8%",
    },
    get style() {
      return isMobileOnly ? this.mobile_style : this.desk_style;
    },
    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOOBYTOPHOTOBOOTH,
    transitionType: TransitionType.withInComponent,
    newItem: ImageString.PHOTOBOOTH,
    hotspot: BoothZoneHotSpot,
  },
  [LobbyHotspotsId.ResourceCenter]: {
    id: LobbyHotspotsId.ResourceCenter,
    enabled: true,
    style: {
      margin: "-2.6% -30%",
    },
    hotspotType: HotspotType.transition,
    transitionVideo: VideoString.LOBBY_TO_RESOURCE,
    transitionType: TransitionType.changeComponent,
    hotspot: ResourceCenterStalls,
    newItem: menuItems[menuItemsIndex.rescen],
  },
};

export let NetworkingLounge = {
  speakerPdf: "/web/viewer.html?file=%2Fassets%2Fcontent%2FSpeakers.pdf",
};
