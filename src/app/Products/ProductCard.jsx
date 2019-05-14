import React from "react";

import {
  addToShoppingCartList,
  decreaseFromShoppingCartList,
  showModal
} from "../../_actions";
import { connect } from "react-redux";

import ChoiceForm from "./ChoiceForm";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { showChoiceForm: false, showDetail: false };
  }

  componentDidMount() {
    console.log(this.myRef.current.offsetTop);
  }
  getQuantity = () => {
    let counter = 0;
    this.props.shoppingCartList.map(orderItem => {
      if (
        orderItem.item &&
        orderItem.item.product_id === this.props.product.product_id
      ) {
        counter += orderItem.quantity;
      }
    });

    return counter;
  };

  toggleOptionForm = () => {
    this.setState({ showChoiceForm: !this.state.showChoiceForm });
    // this.props.showModal();
  };

  renderGroupOnTag = () => {
    if (!this.props.product.isDiscount) {
      return null;
    }
    return <span className="groupon-tag">团</span>;
  };
  decrease = () => {
    this.props.decreaseFromShoppingCartList(this.props.product);
  };
  add = () => {
    this.props.addToShoppingCartList(this.props.product);
  };
  renderProductDetail = () => {
    if (!this.state.showDetail) {
      return null;
    }
    return (
      <div
        className="pop-up-product-detail"
        onClick={() => {
          this.setState({ showDetail: false });
        }}
      >
        <div className="content">
          <img src={`${this.props.product.image}`} alt="" />
          <div className="product-info">
            <div className="name">{this.props.product.name}</div>
            <div className="price">${this.props.product.price}</div>
          </div>
        </div>
      </div>
    );
  };
  renderQuantity = () => {
    if (!this.props.app_status.isOpen) {
      return (
        <div className="component-product-card__quantity">
          <span className="component-product-card__quantity__close-tag">
            CLOSE
          </span>
        </div>
      );
    }
    if (!this.props.product.isDiscount) {
      return null;
    }
    if (
      this.props.product.isDiscount &&
      parseInt(this.props.product.discountQuantity) === 0
    ) {
      return (
        <div className="component-product-card__quantity">
          <span className="component-product-card__quantity__close-tag">
            CLOSE
          </span>
        </div>
      );
    }
    return (
      <div className="component-product-card__quantity">
        {this.props.product.stock_status_id -
          this.props.product.discountQuantity}
        /{this.props.product.stock_status_id}
      </div>
    );
  };
  renderButtonGroup = () => {
    if (!this.props.app_status.isOpen) {
      return null;
    }
    if (
      this.props.product.isDiscount &&
      parseInt(this.props.product.discountQuantity) === 0
    ) {
      return null;
    }
    const quantity = this.getQuantity();
    const withOptions = this.props.product.options.length > 0;
    if (!withOptions && quantity > 0) {
      return (
        <div className="component-product_card__button-group">
          <i onClick={this.decrease} className="material-icons">
            remove_circle
          </i>
          <span className="component-product-card__product-quantity">
            {quantity}
          </span>
          <i onClick={this.add} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else if (!withOptions) {
      return (
        <div className="component-product_card__button-group-init">
          <i onClick={this.add} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else if (withOptions && quantity == 0) {
      return (
        <div className="component-product_card__button-group-init">
          <i onClick={this.toggleOptionForm} className="material-icons">
            add_circle
          </i>
        </div>
      );
    } else {
      return (
        <div className="component-product_card__button-group">
          <i className="material-icons disable">remove_circle</i>
          <span className="component-product-card__product-quantity">
            {quantity}
          </span>
          <i onClick={this.toggleOptionForm} className="material-icons">
            add_circle
          </i>
        </div>
      );
    }
  };
  render() {
    return (
      <div
        className="component-product-card"
        data-test="component-product-card"
        ref={this.myRef}
      >
        {this.renderProductDetail()}
        {this.renderGroupOnTag()}
        <div className="component-product-card__header">
          <div
            className="component-product-card__image-container"
            onClick={() => {
              this.setState({ showDetail: true });
            }}
          >
            <img src={`${this.props.product.image}`} alt="" />
          </div>
          <div className="component-product-card__info">
            <div className="component-product-card__info__header">
              <div
                className="component-product-card__name"
                data-test="product-name"
              >
                {this.props.product.name}
              </div>
              <div className="component-product-card__price">
                ${this.props.product.price}
              </div>
            </div>
            <div className="component-product-card__info__footer">
              {this.renderQuantity()}
              {this.renderButtonGroup()}
            </div>
          </div>
        </div>

        {this.state.showChoiceForm ? (
          <React.Fragment>
            <div
              onClick={this.toggleOptionForm}
              className="componente_product-card__cover"
            />
            <ChoiceForm
              toggleOptionForm={this.toggleOptionForm}
              product={this.props.product}
            />
          </React.Fragment>
        ) : null}

        {/* {this.props.product.quantity === 0 ? (
          <div className="component-product-cover" />
        ) : null} */}
      </div>
    );
  }
}

const mapStateToProps = ({ shoppingCartList, app_status }) => {
  return { shoppingCartList, app_status };
};

export default connect(
  mapStateToProps,
  { addToShoppingCartList, decreaseFromShoppingCartList, showModal }
)(ProductCard);
