import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import ShopSection from "./ShopSection";
import PaymentMethodSection from "./PaymentMethodSection";
import CustomerCommentsSection from "./CustomerCommentsSection";
import PaymentLoading from "./PaymentLoading";

import { Head } from "../shared";
import {
  setPaymentMethod,
  makePayment,
  saveOrder,
  fetchUser,
  changeCustomerComments
} from "../../_actions";

import { makeDate } from "../../_helpers";
class Confirm extends React.Component {
  state = {
    showShopListSection: true,
    showPaymentMethodSection: false,
    showCustomerCommentsSection: false,
    showPaymentLoading: false
  };

  /**
   * call api fetch shop list
   * @returns update state.shops in redux store
   */
  componentDidMount() {
    this.props.fetchUser();
  }

  /**
   * toggle section show shop list or show payment method
   * @param {Void}
   * @returns {Void} update this.state.showShopList
   */
  toggleSection = attributeName => {
    this.setState({ [attributeName]: !this.state[attributeName] });
  };
  /**
   * function - decide display/or not - "done" mark in front of each seciton header
   * @param {String} section_name
   * @return {Boolean} true - "done", false - "undone"
   */
  getIsDone = name => {
    let isDone = false;
    switch (name) {
      case "showShopListSection":
        if (this.props.selectedShop.name && makeDate(this.props.pickedDate)) {
          isDone = true;
        }
        break;
      case "showPaymentMethodSection":
        if (this.props.paymentMethod !== "") {
          isDone = true;
        }
        break;
      case "showCustomerCommentsSection":
        if (this.props.customerComments !== "") {
          isDone = true;
        }
        break;
      default:
        break;
    }

    return isDone;
  };
  /**
   * render JSX for section header
   * @param {string} content
   * @param {string} attributeName
   * @returns {JSX} header for each section
   */
  renderSectionHeader = (content, attributeName) => {
    const stateProperty = this.state[attributeName];
    const {
      showPaymentMethodSection,
      showShopListSection,
      showCustomerCommentsSection
    } = this.props.labels;
    let isDone = this.getIsDone(attributeName);
    const title = {
      showPaymentMethodSection,
      showShopListSection,
      showCustomerCommentsSection
    };
    return (
      <div
        onClick={() => {
          this.toggleSection(attributeName);
        }}
        className="component-confirm__section-header"
      >
        <span className="is-done">
          {isDone ? <i className="material-icons">done</i> : null}
        </span>
        <span className={`component-confirm__subtitle`}>
          <span className="title">{title[attributeName]}</span>
          <span className="detail">
            {this.getDetail(content, attributeName)}
          </span>
        </span>
        <i className="material-icons">
          {stateProperty ? `keyboard_arrow_up` : `keyboard_arrow_down`}
        </i>
      </div>
    );
  };
  /**
   * make section title
   * @param {string} content
   * @param {string} attributeName
   * @returns {string} title
   */
  getDetail = (content, attributeName) => {
    const { labels } = this.props;
    if (attributeName === "showShopListSection") {
      if (this.props.selectedShop.name && makeDate(this.props.pickedDate)) {
        return `${labels.confirm_address}：${this.props.selectedShop.name} ${
          labels.confirm_date
        }：${this.props.pickedDate}`;
      } else {
        return content;
      }
    }
    if (attributeName === "showPaymentMethodSection") {
      if (this.props.paymentMethod) {
        return `${labels.comfirm_paymentMethod}：${this.props.paymentMethod}`;
      } else {
        return content;
      }
    }
    if (attributeName === "showCustomerCommentsSection") {
      if (this.props.customerComments !== "") {
        return `${labels.comfirm_comments}：${this.props.customerComments}`;
      } else {
        return content;
      }
    }
    return content;
  };

  /**
   * call makepayment action to make payment
   */
  submitPayment = () => {
    this.setState({ showPaymentLoading: true });
    this.props.makePayment();
  };
  saveOrder = () => {
    this.props.saveOrder();
  };
  render() {
    if (!this.props.labels.app_head_title) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <Head title={this.props.labels.app_head_title} pageName="confirm" />
        {this.state.showPaymentLoading && (
          <PaymentLoading
            setShowPaymentLoading={value => {
              this.setState({ showPaymentLoading: value });
            }}
          />
        )}
        <div className="component-confirm">
          {this.renderSectionHeader(
            this.props.labels.subtitle_select_date,
            "showShopListSection"
          )}
          {this.state.showShopListSection ? (
            <ShopSection toggleSection={this.toggleSection} />
          ) : null}
          {this.renderSectionHeader(
            this.props.labels.subtitle_select_payment_method,
            "showPaymentMethodSection"
          )}
          {this.state.showPaymentMethodSection ? (
            <PaymentMethodSection toggleSection={this.toggleSection} />
          ) : null}
          {this.renderSectionHeader(
            this.props.labels.subtitle_customer_comments,
            "showCustomerCommentsSection"
          )}
          {this.state.showCustomerCommentsSection ? (
            <CustomerCommentsSection />
          ) : null}
          {/* footer: button group */}
          <div className="component-confirm__button-group">
            <button
              className="component-confirm__save-button"
              onClick={this.saveOrder}
            >
              {this.props.labels.save_order}
            </button>
            <button
              onClick={this.submitPayment}
              className="component-confirm__payment-button"
            >
              {this.props.labels.confirm_pay}
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({
  shops,
  paymentMethod,
  labels,
  selectedShop,
  pickedDate,
  userAllowCash,
  customerComments
}) => {
  return {
    shops,
    paymentMethod,
    labels,
    selectedShop,
    pickedDate,
    userAllowCash,
    customerComments
  };
};

export default connect(
  mapStateToProps,
  {
    setPaymentMethod,
    makePayment,
    saveOrder,
    fetchUser,
    changeCustomerComments
  }
)(Confirm);
