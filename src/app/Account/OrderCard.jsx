import React from "react";
import { connect } from "react-redux";

import { renderNewShoppingCart, deleteOrder } from "../../_actions";
import { makeDate } from "../../_helpers";

// import "./sass/OrderCard.css";

/**
 * main function to render JSX
 * @param {React.Props} props
 * @returns {JSX} order card component
 */
class OrderCard extends React.Component {
  state = { isShowDetail: false };
  /**
   * render list of order items for certain order
   * @param {Array} list
   * @returns {String}
   */
  renderOrderList = list => {
    let summary = "";
    list.map(orderItem => {
      summary += `${orderItem.name} x ${orderItem.quantity}, `;
    });
    return summary;
  };
  /**
   * get order total quantity of items
   * @param {Array} list
   * @returns {Integer} total_quantity
   */
  getTotalQuantity = list => {
    let count = 0;
    list.map(orderItem => {
      count += orderItem.quantity;
    });

    return count;
  };
  /**
   * get order status in text name
   * @param {Integer} order_status_id
   * @returns {JSX} name of status
   */
  getStatusName = id => {
    switch (parseInt(id)) {
      case 2:
        return <span className="status pending">{`待取货`}</span>;
      case 1:
        return (
          <span
            className="status saved"
            onClick={this.continueOrder}
          >{`继续>>`}</span>
        );
      case 3:
        return <span className="status complete">{`已完成`}</span>;
      default:
        break;
    }
  };

  /**
   * call action delete order by calling api
   * @param {void}
   * @returns {void}
   */

  deleteOrder = () => {
    this.props.deleteOrder(this.props.order);
  };
  /**
   * call aciont function to change state in redux store
   * @param {void}
   * @returns {Void} call action function
   */
  continueOrder = () => {
    this.props.renderNewShoppingCart(this.props.order);
  };

  render() {
    const order = this.props.order;
    return (
      <div className="component-order-card">
        <div
          className="header"
          onClick={() =>
            this.setState({ isShowDetail: !this.state.isShowDetail })
          }
        >
          <span className="information-row">
            <span className="title">订单号:</span>
            <span className="value">{order.invoice_no}</span>
          </span>
          <span className="toggle">
            <i className="material-icons">
              {this.state.isShowDetail
                ? `keyboard_arrow_down`
                : `keyboard_arrow_up`}
            </i>
          </span>
        </div>
        <div className="card-body">
          <div className="information">
            <span className="information-row">
              <span className="title">创建日期: </span>
              <span className="value"> {makeDate(order.create_date)}</span>
            </span>
            <span className="information-row">
              <span className="title">取货地点: </span>
              <span className="value"> {order.store_name}</span>
            </span>
            <span className="information-row">
              <span className="title">取货时间: </span>
              <span className="value"> {makeDate(order.picked_date)}</span>
            </span>
            <span className="information-row">
              <span className="title">产品明细: </span>
              <span className="value">
                {this.renderOrderList(order.order_items)}
              </span>
            </span>
          </div>
          <div className="quantity-status">
            {this.getStatusName(order.status_id)}

            <span className="quantity">
              <span className="value">
                {this.getTotalQuantity(order.order_items)}
              </span>
              <span className="unit">{`items`}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { renderNewShoppingCart, deleteOrder }
)(OrderCard);
