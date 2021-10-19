const initialState = {
    activeScreen: "login",
    activeTab: 0,
    token: "",
    user: {},
    adminRequests: [],
    condos: [],
    currentCondo: {},
    isAdmin: null,
    sections: [],
    isExpired: false,
    pushPostId: "",
    oneSignalPlayerId: "",
    isWhiteLabel: false,
    monthsShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic"
    ],
    admins: [],
    employees: [],
    taskTypes: [],
    paymentAmount: 0,
    paymentAmountInput: 0,
    datePickedStart: "",
    datePickedEnd: "",
  };
  
  const SessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CHANGE_ACTIVE_SCREEN":
        return { ...state, activeScreen: action.payload.activeScreen };
      case "CHANGE_ACTIVE_TAB":
        return {
          ...state,
          activeScreen: action.payload.activeScreen,
          activeTab: action.payload.activeTab
        };
      case "CHANGE_USER":
        return { ...state, user: action.payload.user };
      case "CHANGE_ADMIN_REQUESTS":
        return { ...state, adminRequests: action.payload.adminRequests };
      case "CHANGE_SESSION_TOKEN":
        return { ...state, token: action.payload.token };
      case "CHANGE_CURRENT_CONDO":
        return { ...state, currentCondo: action.payload.currentCondo };
      case "CHANGE_CONDOS":
        return { ...state, condos: action.payload.condos };
      case "CHANGE_IS_ADMIN":
        return { ...state, isAdmin: action.payload.isAdmin };
      case "CHANGE_IS_EXPIRED":
        return { ...state, isExpired: action.payload.isExpired };
      case "CHANGE_SECTIONS":
        return { ...state, sections: action.payload.sections };
      case "CHANGE_ADMINS":
        return { ...state, admins: action.payload.admins };
      case "CHANGE_EMPLOYEES":
        return { ...state, employees: action.payload.employees };
      case "CHANGE_TASK_TYPES":
        return { ...state, taskTypes: action.payload.taskTypes };
      case "CHANGE_PUSH_POST_ID":
        return { ...state, pushPostId: action.payload.pushPostId };
      case "CHANGE_ONE_SIGNAL_PLAYER_ID":
        return { ...state, oneSignalPlayerId: action.payload.oneSignalPlayerId };
      case "CHANGE_PAYMENT_AMOUNT":
        return { ...state, paymentAmount: action.payload.paymentAmount };
      case "CHANGE_PAYMENT_AMOUNT_INPUT":
        return {
          ...state,
          paymentAmountInput: action.payload.paymentAmountInput
        };
      case "CHANGE_START_PICKED_DATE":
        return{
          ...state, datePickedStart: action.payload.datePickedStart
        };
      case "CHANGE_END_PICKED_DATE":
        return{
          ...state, datePickedEnd: action.payload.datePickedEnd
        };
      case "CHANGE_EMAIL_LIST":
        return{
          ...state, emailListSend: action.payload.emailListSend
        };
      default:
        return state;
    }
  };
  
  export default SessionReducer;
  