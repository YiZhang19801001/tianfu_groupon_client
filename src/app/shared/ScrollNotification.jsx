import React from "react";
import { connect } from "react-redux";

class ScrollNotification extends React.Component {
  state = { order: {} };
  componentDidMount() {
    let index = 0;
    this.interval = setInterval(() => {
      this.setState({ order: this.props.orders[index] });
      if (index === this.props.orders.length - 1) {
        index = 0;
      } else {
        index++;
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderDisplayOrder = () => {
    return <div className="display-order">{this.state.order.order_id}</div>;
  };

  render() {
    return <div className="display-orders">{this.renderDisplayOrder()}</div>;
  }
}

const mapStateToProps = ({ display_orders }) => {
  return { orders: display_orders };
};

export default connect(mapStateToProps)(ScrollNotification);
