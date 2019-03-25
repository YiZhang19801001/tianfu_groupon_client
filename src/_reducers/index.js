import { combineReducers } from "redux";
import { actionTypes } from "../_actions";
import { reducer as formReducer } from "redux-form";
import shoppingCartListReducer from "./shoppingCartListReducer";

const productsReducer = (products = [], action) => {
  if (action.type === actionTypes.getProducts) {
    return action.payload;
  } else if (action.type === actionTypes.saveOrder) {
    return action.payload;
  }
  return products;
};

const languageIdReducer = (language_id = 2, action) => {
  if (action.type === actionTypes.switchLanguage) {
    localStorage.setItem("aupos_language_id", action.payload);
    console.log(localStorage.getItem("aupos_language_id"));
    return action.payload;
  } else if (
    action.type === actionTypes.initialApp &&
    !localStorage.getItem("aupos_language_id")
  ) {
    localStorage.setItem(
      "aupos_language_id",
      action.payload.custom_setting.default_language_id
    );
    return action.payload.custom_setting.default_language_id;
  }

  return localStorage.getItem("aupos_language_id")
    ? localStorage.getItem("aupos_language_id")
    : language_id;
};

const selectedShopReducer = (selectedShop = {}, action) => {
  if (action.type === actionTypes.selectedShop) {
    return action.payload;
  } else if (action.type === actionTypes.renderNewShoppingCart) {
    return action.payload.selectedShop;
  } else if (action.type === actionTypes.getShops) {
    return action.payload[0];
  }

  return selectedShop;
};

const pickedDateReducer = (pickedDate = "未选定日期", action) => {
  if (action.type === actionTypes.pickDate) {
    return action.payload;
  } else if (action.type === actionTypes.selectDate) {
    return action.payload;
  } else if (action.type === actionTypes.renderNewShoppingCart) {
    return action.payload.date;
  } else if (action.type === actionTypes.selectedShop) {
    return "未选定日期";
  }

  return pickedDate;
};

const shopsReducer = (shops = [], action) => {
  if (action.type === actionTypes.getShops) {
    return action.payload;
  }
  return shops;
};
const userReducer = (user = {}, action) => {
  if (action.type === actionTypes.login) {
    return action.payload;
  }
  return user;
};
const paymentMethodReducer = (paymentMethod = "", action) => {
  if (action.type === actionTypes.setPaymentMethod) {
    return action.payload;
  } else if (action.type === actionTypes.renderNewShoppingCart) {
    return action.payload.paymentMethod;
  }
  return paymentMethod;
};
const ordersReducer = (orders = [], action) => {
  if (action.type === actionTypes.setOrders) {
    return action.payload;
  }
  return orders;
};
const customSettingReducer = (customSetting = {}, action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.custom_setting;
  }
  return customSetting;
};
const labelsReducer = (labels = {}, action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.labels;
  }
  return labels;
};
const paidItemListReducer = (paidItemList = [], action) => {
  if (action.type === actionTypes.setPaidItemList) {
    return action.payload;
  }
  return paidItemList;
};
const paymentInformationReducer = (paymentInformation = [], action) => {
  if (action.type === actionTypes.setPaymentInformation) {
    return action.payload;
  }
  return paymentInformation;
};

const pickupAddressReducer = (pickupAddress = { dates: [] }, action) => {
  if (action.type === actionTypes.pickStore) {
    return action.payload;
  }
  return pickupAddress;
};
const toggleModalReducer = (modalStatus = false, action) => {
  if (action.type === actionTypes.hideModal) {
    return false;
  } else if (action.type === actionTypes.showModal) {
    return true;
  }

  return modalStatus;
};
const userAllowCashReducer = (userAllowCash = false, action) => {
  if (action.type === actionTypes.login) {
    const permissions = action.payload.permissions;
    let flag = false;
    permissions.map(element => {
      if (element.permission_id && parseInt(element.permission_id) === 1) {
        flag = true;
      }
    });
    return flag;
  }
  return userAllowCash;
};
const customerCommentsReducer = (customerComments = "", action) => {
  if (action.type === actionTypes.changeCustomerComments) {
    return action.payload;
  }
  return customerComments;
};
const app_statusReducer = (app_status = {}, action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.app_status;
  }
  return app_status;
};
const orderIdReducer = (order_id = "", action) => {
  if (action.type === actionTypes.renderNewShoppingCart) {
    return action.payload.order_id;
  } else if (action.type === actionTypes.saveOrder) {
    return "";
  }
  return order_id;
};
const display_ordersReducer = (display_orders = [], action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.display_orders;
  }
  return display_orders;
};
const contact_qrcodeReducer = (contact_qrcode = "", action) => {
  if (action.type === actionTypes.initialApp) {
    return action.payload.contact_qrcode;
  }
  return contact_qrcode;
};
export default combineReducers({
  order_id: orderIdReducer,
  app_status: app_statusReducer,
  products: productsReducer,
  language_id: languageIdReducer,
  form: formReducer,
  shoppingCartList: shoppingCartListReducer,
  selectedShop: selectedShopReducer,
  pickedDate: pickedDateReducer,
  shops: shopsReducer,
  user: userReducer,
  paymentMethod: paymentMethodReducer,
  orders: ordersReducer,
  customSetting: customSettingReducer,
  labels: labelsReducer,
  paidItemList: paidItemListReducer,
  paymentInformation: paymentInformationReducer,
  pickupAddress: pickupAddressReducer,
  modalStatus: toggleModalReducer,
  userAllowCash: userAllowCashReducer,
  customerComments: customerCommentsReducer,
  display_orders: display_ordersReducer,
  contact_qrcode: contact_qrcodeReducer
});
