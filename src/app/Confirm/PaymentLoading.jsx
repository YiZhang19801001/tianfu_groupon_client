import React from "react";
import { connect } from "react-redux";
import { baseUrl } from "../../_apis";
const PaymentLoading = ({ paymentMethod, setShowPaymentLoading }) => {
  const close = () => {
    setShowPaymentLoading(false);
  };

  return (
    <div className="payment-loading">
      <div
        className="content"
        style={{ backgroundImage: `url('${baseUrl}/images/spinner.svg')` }}
      >
        <h1>connect to {paymentMethod ? paymentMethod : "wechat"}</h1>
        <div className="image-container">
          <img src={`${baseUrl}${renderImageUrl(paymentMethod)}`} alt="" />
        </div>
        <button onClick={close}>cancel</button>
      </div>
    </div>
  );
};

const renderImageUrl = paymentMethod => {
  switch (paymentMethod) {
    case "WECHAT":
      return "/images/wechat.png";
    case "ALIPAY":
      return "/images/alipay.png";
    case "POLI":
      return "/images/poli.png";
    default:
      return "/images/wechat.png";
  }
};

const mapStateToProps = ({ paymentMethod }) => {
  return { paymentMethod };
};

export default connect(mapStateToProps)(PaymentLoading);
