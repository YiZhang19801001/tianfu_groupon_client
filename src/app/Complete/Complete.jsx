import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import { queryPayment } from "../../_actions";

import { Head } from "../shared/";
import { makeDate } from "../../_helpers";

class Complete extends React.Component {
  state = { paymentId: "" };

  componentDidMount() {
    const channel = this.props.match.params.channel;
    if (channel === "poli") {
      const paymentId = queryString.parse(this.props.location.search).token;
      this.setState({ paymentId });
      this.props.queryPayment(channel, paymentId);
    }

    if (channel === "paypal") {
    }

    if (channel === "wechant" || channel === "alipay") {
    }
  }

  renderPaymentInformation = () => {
    const {
      error_code,
      date_time,
      status,
      bill_amount,
      paid_amount,
      transaction_id
    } = this.props.paymentInformation;
    if (error_code) {
      return <p>支付失败，请重试</p>;
    }
    const labels = this.props.labels;
    return (
      <div className="component-complete__trasition-information">
        <div className="component-complete__trasition-information__row">
          <span className="component-complete__trasition-information__subtitle">
            {labels.complete_payment_id}
          </span>
          <span className="component-complete__trasition-information__value">
            {transaction_id}
          </span>
        </div>
        <div className="component-complete__trasition-information__row">
          <span className="component-complete__trasition-information__subtitle">
            {labels.complete_payable}
          </span>
          <span className="component-complete__trasition-information__value">
            ${bill_amount}
          </span>
        </div>
        <div className="component-complete__trasition-information__row">
          <span className="component-complete__trasition-information__subtitle">
            {labels.complete_payment_status}
          </span>
          <span className="component-complete__trasition-information__value">
            {status}
          </span>
        </div>
        <div className="component-complete__trasition-information__row">
          <span className="component-complete__trasition-information__subtitle">
            {labels.complete_paid_date}
          </span>
          <span className="component-complete__trasition-information__value">
            {makeDate(date_time)}
          </span>
        </div>
        <div className="component-complete__trasition-information__row">
          <span className="component-complete__trasition-information__subtitle">
            {this.props.labels.paid_amount}
          </span>
          <span className="component-complete__trasition-information__value">
            ${paid_amount}
          </span>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.paymentInformation.length === 0) {
      return <div>loading...</div>;
    }
    return (
      <React.Fragment>
        <Head title={this.props.labels.app_head_title} pageName="complete" />
        <div className="component-complete">
          <div className="component-complete__icon">
            <i className="material-icons">done_outline</i>
          </div>
          <div className="component-complete__title">
            {this.props.labels.thanks_for_payment}
          </div>
          {this.renderPaymentInformation()}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ paymentInformation, labels }) => {
  return { paymentInformation, labels };
};

export default connect(
  mapStateToProps,
  { queryPayment }
)(Complete);
