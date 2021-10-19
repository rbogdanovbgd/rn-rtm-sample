import { Platform, Dimensions, PixelRatio } from "react-native";
// Responsive Const
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
  platform === "ios" && deviceHeight === 812 && deviceWidth === 375;

export const globalStyle = {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logoBig: {
    width: 280,
    height: 300
  },
  logoTag: {
    width: 212,
    height: 160
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
    // fontFamily: "Akkurat-Normal",
  },
  // For Views
  containerView: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  // Welcome Inputs
  formLabel: {
    color: "#241D1E",
    top: platform === "ios" ? 8 : 13,
    fontSize: 18
  },
  formInput: {
    height: 60,
    color: "#241D1E"
  },
  formItem: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    marginTop: 8
  },
  pickerIcon: {
    paddingTop: 0,
    marginTop: -4,
    marginLeft: 4,
    marginRight: 14
  }
};

export const colors = {
  brandPrimary: "#e48c25",
  brandSecondary: "#3d3e44",
  bradSecondaryAlter: "#7f7f7f",
  background: "#F5F2F9",
  errorText: "#FA3256",
  headerText: "#444444",
  buttonBackground: "#39BD98",
  buttonText: "#FFFFFF",
  inputBackground: "#FFFFFF",
  inputDivider: "#E4E2E5",
  // Brand Colors
  brandBlueDisabled: "#75BFB5",
  brandGreenDisabled: "#75BFB5",
  brandGreenDeep: "#68B143",
  brandWhite: "#ededed",
  brandBlack: "#1c1d1d",
  brandGrey: "#c2c1c0",
  brandDarkGrey: "#4b4b4b",
  brandLightGray: "#b5b5b5",
  brandGreen: "#00A1B4",
  brandGold: "#f1ac2f",
  brandGoldDisable: "#f1ac2f",
  brandRed: "#E8523F",
  brandOrange: "#F49B48",
  normalWhite: "#ffffff",
  brandLightBlack: "#241D1E",
  facebook: "#3b5998",
  gmail: "#CD5644",
  brandBlue: "#00A1B4",
  quizzesLineColor: '#E2E2E2',
  yellow: '#E5A955',
  // added colors
  black: '#000',
  textLight: '#808080',
  lightGrey: '#E6E6E6',
  callGray: '#E4DDD6',
  chatIcon: '#4F4F4F',
};
// HELPERS
// Padding-Margins
export const paddingHelpers = {
  SXS: platform === "ios" ? 4 : 6,
  XS: platform === "ios" ? 8 : 8,
  S: platform === "ios" ? 14 : 16,
  N: platform === "ios" ? 22 : 24,
  LG: platform === "ios" ? 24 : 26,
  XL: platform === "ios" ? 26 : 28,
  XL2: platform === "ios" ? 28 : 30,
  XL3: platform === "ios" ? 30 : 32,
  XL4: platform === "ios" ? 32 : 34,
  XL5: platform === "ios" ? 34 : 36,
  XL6: platform === "ios" ? 36 : 38,
  XL7: platform === "ios" ? 45 : 45
};

export const titleBarStyles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    fontSize: 20,
    textAlign: "center",
    color: colors.headerText,
    fontWeight: "400",
    fontStyle: "italic"
  },
  titleBarContent: {
    color: "white",
    fontWeight: "900"
  }
};

export const ImgDimensions = {
  DrawerIcons: {
    width: 25,
    height: 25
  }
};

export const ListStyles = {
  listItem: {
    marginLeft: 0,
    padding: paddingHelpers.S,
    borderColor: colors.brandBlueDisabled,
    borderBottomWidth: 1
  },
  listItemNoBorder: {
    marginLeft: 0,
    padding: paddingHelpers.S,
    borderBottomWidth: 0
  },
  listItemDarkBorder: {
    marginLeft: 0,
    padding: paddingHelpers.S,
    borderColor: "rgba(17, 17, 17, 0.4)",
    borderBottomWidth: 0.3
  }
};

export const buttonStyles = {
  roundIconBtn: {
    width: 35,
    height: 35,
    borderColor: colors.brandGreen,
    borderStyle: "solid",
    borderWidth: 1.3,
    borderRadius: 100 / 2,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  roundIconThumb: {
    width: 46,
    height: 46,
    borderColor: colors.brandBlueDisabled,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 100 / 2,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  badgeIcon: {
    backgroundColor: colors.brandBlueDisabled,
    width: undefined,
    height: undefined,
    alignItems: "center",
    alignSelf: "flex-end",
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    marginTop: -18
  },
  badgeStatus: {
    width: 10,
    height: 10,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginLeft: 10,
    position: "absolute",
    top: 6
  },
  roundArrow: {
    width: 35,
    height: 35,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};
