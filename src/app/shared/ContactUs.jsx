import React from "react";
import { connect } from "react-redux";
class ContactUs extends React.Component {
  state = { showQrCode: false };

  renderQrCode = () => {
    const { labels } = this.props;
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
          <span>{labels.contact_us_message}</span>
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
const mapStateToProps = ({ labels, contact_qrcode }) => {
  return { labels, contact_qrcode };
};
export default connect(mapStateToProps)(ContactUs);
