import React from "react";
import { connect } from "react-redux";
import { makeDate } from "../../_helpers";

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
        style={{ transform: `translateY(-${this.state.displayHeight}px)` }}
      >
        {this.props.orders.map(order => {
          const { customer_name, date, total } = order;
          return (
            <div key={`order${order.order_id}`} className={`display-order`}>
              <span className={`name`}>{customer_name}</span>
              <span className={`date`}>{makeDate(date)}</span>
              <span className={`total`}>${total}</span>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return <div className="display-orders">{this.renderDisplayOrders()}</div>;
  }
}

const mapStateToProps = ({ display_orders }) => {
  return { orders: display_orders };
};

export default connect(mapStateToProps)(ScrollNotification);
