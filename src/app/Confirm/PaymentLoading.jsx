import React from "react";
import { connect } from "react-redux";
import { baseUrl } from "../../_apis";
const PaymentLoading = ({ paymentMethod, setShowPaymentLoading }) => {
  const close = () => {
    setShowPaymentLoading(false);
  };

  return (
    <div className="payment-loading">
      <div className="content">
        <div className="header">
          <span className="left">正在创建</span>
          <span className="image-container">
            <img src={`${baseUrl}${renderImageUrl(paymentMethod)}`} alt="" />
          </span>
          <span className="right">支付链接</span>
        </div>
        <div className="loader">
          <span>请稍后</span>
          <div class="loading-dots">
            <div class="loading-dots--dot" />
            <div class="loading-dots--dot" />
            <div class="loading-dots--dot" />
          </div>
        </div>
        <button onClick={close}>取消支付</button>
        <div className="footer">
          <i>Supported by</i>
          <img src={`${baseUrl}/images/redpayments.png`} alt="" />
        </div>
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
