import React from "react";
import { connect } from "react-redux";

import { makeDate } from "../../../_helpers";
import { selectShop, selectDate } from "../../../_actions";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import "./sass/ShopCard.css";
class ShopCard extends React.Component {
  handleSelectDateChange = e => {
    const newDate = new Date(e.target.value);
    this.props.selectDate(newDate);
  };

  renderSelectInputOptions = () => {
    return (
      <React.Fragment>
        {/* <option value="text_label" disabled>
          --请选择--
        </option> */}
        {this.props.shop.open.map((ele, index) => {
          return (
            <option value={makeDate(ele)} key={`eleOption${index}`}>
              {ele}
            </option>
          );
        })}
        ;
      </React.Fragment>
    );
  };

  renderDatePicker = () => {
    const picked_location = this.props.selectedShop.location_id;
    const component_location = this.props.shop.location_id;
    if (!picked_location || picked_location !== component_location) {
      return null;
    }
    return (
      <label
        onClick={e => {
          e.stopPropagation();
        }}
        className="component-shop-card__date-picker__label"
      >
        <span>请选择取货时间: </span>
        <select
          className="component-add-option-to-new-product-form__selector"
          value={makeDate(this.props.pickedDate)}
          onChange={this.handleSelectDateChange}
        >
          {this.renderSelectInputOptions()}
        </select>
        {/* <i className="material-icons">date_range</i> */}
      </label>
    );
  };

  pickStore = () => {
    this.props.selectShop(this.props.shop);
  };
  renderShopContact = () => {
    const picked_location = this.props.selectedShop.location_id;
    const component_location = this.props.shop.location_id;
    if (!picked_location) {
      return (
        <>
          <div className="component-shop-card__name">
            {this.props.shop.name}
          </div>
          <div className="component-shop-card__telephone">
            {this.props.shop.telephone}
          </div>
        </>
      );
    }
    if (picked_location && picked_location === component_location) {
      return null;
    }

    return (
      <>
        <div className="component-shop-card__name">{this.props.shop.name}</div>
        <div className="component-shop-card__telephone">
          {this.props.shop.telephone}
        </div>
      </>
    );
  };
  render() {
    return (
      <div className="component-shop-card" onClick={this.pickStore}>
        <div className="component-shop-card__address">
          {this.props.shop.address}
        </div>
        <div className="component-shop-card__name-telephone">
          {this.renderShopContact()}
          {this.renderDatePicker()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ pickedDate, selectedShop, selectedDate }) => {
  return { pickedDate, selectedShop, selectedDate };
};

export default connect(
  mapStateToProps,
  { selectShop, selectDate }
)(ShopCard);
