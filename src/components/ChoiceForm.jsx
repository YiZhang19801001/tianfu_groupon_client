import React from "react";
import { connect } from "react-redux";

import { addToShoppingCartList } from "../actions";

import "../css/ChoiceForm.css";
class ChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { choices: [] };
  }

  componentDidMount() {
    let newArray = [];
    this.props.product.options.map(option => {
      if (option.type === "radio") {
        newArray = [
          ...newArray,
          {
            productOption: option.product_option_id,
            productOptionValue: option.values[0].product_option_value_id
          }
        ];
      } else if (option.type === "checkbox") {
        newArray = [
          ...newArray,
          { productOption: option.product_option_id, productOptionValue: [] }
        ];
      }
    });

    this.setState({ choices: newArray });
  }

  /**
   * handle choice form value change update state
   * @param {Event} input - value, type ...
   * @returns {Void}
   */
  handleChange = e => {
    switch (e.target.type) {
      case "radio":
        const radioOptionObject = {
          name: e.target.getAttribute("data-option-value-name"),
          price: e.target.getAttribute("data-option-value-price"),
          product_option_value_id: e.target.value
        };
        this.radioButtonEvent(radioOptionObject, e.target.name);
        break;
      case "checkbox":
        const checkboxOptionObject = {
          name: e.target.getAttribute("data-option-value-name"),
          price: e.target.getAttribute("data-option-value-price"),
          product_option_value_id: e.target.name
        };
        this.checkboxEvent(
          checkboxOptionObject,
          e.target.getAttribute("data-group-product-option-id"),
          e.target.checked
        );
        break;
      default:
        break;
    }
  };

  /**
   * update state when radio button been clicked
   * @param {Integer} value - product_option_value_id
   * @returns {Voide} state updated
   */
  radioButtonEvent = (value, name) => {
    this.setState({
      choices: this.state.choices.map(ele => {
        if (ele.productOption == name) {
          return { ...ele, productOptionValue: value };
        } else {
          return ele;
        }
      })
    });
  };

  /**
   * update state when check box been checked
   * @param
   */
  checkboxEvent = (value, name, status) => {
    this.setState({
      choices: this.state.choices.map(ele => {
        if (ele.productOption == name && status) {
          return {
            ...ele,
            productOptionValue: [...ele.productOptionValue, value]
          };
        } else if (ele.productOption == name) {
          return {
            ...ele,
            productOptionValue: ele.productOptionValue.filter(
              item =>
                item.product_option_value_id === value.product_option_value_id
            )
          };
        } else {
          return ele;
        }
      })
    });
  };

  /**
   * make up price display format
   * @param {decimal} price
   * @returns {string} formatted price
   */
  makePrice = value => {
    if (value > 0) {
      return `$${value}`;
    }
    return "";
  };

  /**
   * render JSX for one single option choice
   * @param {Object} option
   * @returns {JSX}
   */
  renderOption = option => {
    switch (option.type) {
      case "radio":
        return option.values.map(option_value => {
          return (
            <label key={`optionValue${option_value.product_option_value_id}`}>
              <input
                name={option.product_option_id}
                type="radio"
                value={option_value.product_option_value_id}
                data-option-value-name={option_value.name}
                data-option-value-price={option_value.price}
                onChange={this.handleChange}
              />
              {option_value.name}
            </label>
          );
        });

      case "checkbox":
        return option.values.map(value => {
          return (
            <label key={`optionValue${value.product_option_value_id}`}>
              <input
                name={value.product_option_value_id + ""}
                data-option-value-name={value.name}
                data-option-value-price={value.price}
                type="checkbox"
                data-group-product-option-id={option.product_option_id}
                onChange={this.handleChange}
              />
              {value.name}
            </label>
          );
        });

      default:
        break;
    }
  };

  /**
   * render a frame which is container of multiple option choices
   * @param {Void}
   * @returns {JSX} a frame with title
   */
  renderOptions = () => {
    return this.props.product.options.map((option, index) => {
      return (
        <div className="component-choice-form__body" key={`option${index}`}>
          <div className="component-choice-form__option-name">
            {option.option_name}
          </div>
          {this.renderOption(option)}
        </div>
      );
    });
  };

  /**
   * submit choices - will call action to update shopplingCartList in redux store
   * @param {Event}
   * @returns {Void}
   */
  onSubmit = e => {
    e.preventDefault();

    const newOrderItem = {
      ...this.props.product,
      choices: this.state.choices
    };

    this.props.addToShoppingCartList(newOrderItem);
    this.props.toggleOptionForm();
  };

  render() {
    return (
      <div className="component-choice-form">
        <div className="component-choice-form__header">
          <div className="component-choice-form__header__image-container">
            <img src={this.props.product.image} alt={this.props.product.name} />
          </div>
          <div className="component-choice-form__header__product-info">
            <div className="component-choice-form__product-name">
              {this.props.product.name}
            </div>
            <div className="component-choice-form__product-price">
              ${this.props.product.price}
            </div>
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
          {this.renderOptions()}
          <div className="component-choice-form__footer">
            <div className="componente-choice-form__button-container">
              <button>确定</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addToShoppingCartList }
)(ChoiceForm);
