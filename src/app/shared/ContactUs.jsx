import React from "react";
import { connect } from "react-redux";
class ContactUs extends React.Component {
  state = { showQrCode: false };

  renderQrCode = () => {
    if (!this.state.showQrCode) {
      return null;
    }
    return (
      <div
        onClick={() => {
          this.setState({ showQrCode: false });
        }}
        className="qrcode-cover"
      >
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className="content"
        >
          <span>请扫码联系我们的客服</span>
          <div className="img-container">
            <img src={this.props.contact_qrcode} alt="" />
          </div>
        </div>
      </div>
    );
  };
  renderIconButton = () => {
    if (this.state.showQrCode) {
      return null;
    }
    return (
      <i
        className="material-icons"
        onClick={() => {
          this.setState({ showQrCode: true });
        }}
      >
        sms
      </i>
    );
  };
  render() {
    return (
      <div className="component-contact-us">
        {this.renderIconButton()}
        {this.renderQrCode()}
      </div>
    );
  }
}
const mapStateToProps = ({ contact_qrcode }) => {
  return { contact_qrcode };
};
export default connect(mapStateToProps)(ContactUs);
