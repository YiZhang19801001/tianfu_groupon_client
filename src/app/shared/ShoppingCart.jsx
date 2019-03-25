import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import OrderItemCard from "./OrderItemCard";
import { history } from "../../history";
import { getTotal, getTotalPrice } from "../../_helpers";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showList: false };
  }

  /**
   * render quantity badge for shopping cart icon
   * @returns {JSX} badge of quantity
   */
  renderQuantityBadge = () => {
    const count = getTotal(this.props.shoppingCartList);
    if (count > 0) {
      return (
        <span className="component-shopping-cart__icon-quantity">{count}</span>
      );
    }
    return null;
  };

  /**
   * render jsx for shopping cart icon
   * @returns {JSX} icon of shopping cart and quantity badge
   */
  renderIcon = () => {
    if (this.state.showList) {
      return null;
    }
    return (
      <div className="component-shopping-cart__icon-container">
        <i className="material-icons">shopping_cart</i>

        {this.renderQuantityBadge()}
      </div>
    );
  };

  /**
   * route to Confirm.jsx programic
   * @param {Void}
   * @returns {Void}
   */
  navToConfirm = () => {
    history.push(`${process.env.PUBLIC_URL}/confirm`);
  };

  /**
   * render jsx for shopping cart list
   * @returns {JSX} list of OrderItemCard
   */
  renderList = () => {
    if (!this.props.labels.for_sure) {
      return <div>loading...</div>;
    }
    if (this.state.showList && this.props.shoppingCartList.length > 0) {
      return (
        <React.Fragment>
          <div
            className="component-shopping-cart__cover"
            onClick={this.toggleList}
          />
          <div className="component-shopping-cart__list">
            <div className="component-shopping-cart__list__header">
              <span className="component-shopping-cart__list__header-quantity">
                <i className="material-icons">shopping_cart</i>
                <span className="component-shopping-cart__list__header-quantity__number">
                  {getTotal(this.props.shoppingCartList)}
                </span>
              </span>
              <span className="component-shopping-cart__list__header-totoalPrice">
                {`$${getTotalPrice(this.props.shoppingCartList)}`}
              </span>
            </div>
            <div className="component-shopping-cart__list__body">
              {this.props.shoppingCartList.map((orderItem, index) => {
                return (
                  <OrderItemCard
                    orderItem={orderItem}
                    key={`orderItem${index}`}
                  >
                    {orderItem.item.name}
                  </OrderItemCard>
                );
              })}
            </div>
            <div className="component-shopping-cart__list__footer">
              <Link
                onClick={this.toggleList}
                to={`${process.env.PUBLIC_URL}/confirm`}
                className="component-shopping-cart__list__button-confirm"
              >
                {this.props.labels.confirm_order}
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  /**
   * control show / hide shopping cart list
   * @param {void}
   * @returns {void}
   */
  toggleList = () => {
    if (this.props.shoppingCartList.length > 0) {
      this.setState({ showList: !this.state.showList });
    }
  };
  render() {
    return (
      <div className="component-shopping-cart">
        {!this.state.showList ? (
          <div
            onClick={this.toggleList}
            className="component-shopping-cart__header"
          >
            {this.renderIcon()}
          </div>
        ) : null}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = ({ shoppingCartList, labels }) => {
  return { shoppingCartList, labels };
};

export default connect(mapStateToProps)(ShoppingCart);
