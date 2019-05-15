import React from "react";
import { connect } from "react-redux";
import { uniqueId } from "lodash";
import moment from "moment";

class ScrollNotification extends React.Component {
  state = { displayHeight: 0, show: false };
  componentDidMount() {
    let index = 0;
    this.interval = setInterval(() => {
      if (index === this.props.orders.length - 1) {
        index = 0;
      } else {
        index++;
      }
      this.setState({ displayHeight: index * 25 });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderDisplayOrders = () => {
    return (
      <div
        className="list"
        style={{
          transform: `translateY(-${this.state.displayHeight}px)`,
          backgroundColor: this.props.backgroundColor,
          color: this.props.color
        }}
      >
        {this.props.orders.map(order => {
          const { customer_name, date, product_name, product_quantity } = order;
          return (
            <div
              key={uniqueId("notice")}
              className={`display-order`}
              style={{
                backgroundColor: this.props.backgroundColor,
                color: this.props.color
              }}
            >
              <span className={`name`}>{customer_name}</span>
              <span className={`date`}>{moment(date).format("DD MMM")}</span>
              <span className={`product_name`}>{product_name}</span>
              <span className={`quantity`}>x{product_quantity}</span>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div
        className="display-orders"
        style={{
          backgroundColor: this.props.backgroundColor,
          color: this.props.color
        }}
      >
        {this.renderDisplayOrders()}
      </div>
    );
  }
}

const mapStateToProps = ({ display_orders }) => {
  return { orders: display_orders };
};

export default connect(mapStateToProps)(ScrollNotification);
