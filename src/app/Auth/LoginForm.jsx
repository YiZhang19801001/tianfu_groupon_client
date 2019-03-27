import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { login } from "../../_actions";
class LoginForm extends React.Component {
  renderInput = ({ input, placeholder, type }) => {
    return (
      <input
        {...input}
        type="text"
        className="component-form__input"
        placeholder={placeholder}
        type={type}
      />
    );
  };
  onSubmit = () => {
    this.props.login();
  };
  render() {
    return (
      <div className="component-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">phone</i>
              <Field
                name="phone"
                component={this.renderInput}
                placeholder={this.props.labels.login_form_placeholder_phone}
                type="text"
              />
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">lock</i>
              <Field
                name="password"
                component={this.renderInput}
                placeholder={this.props.labels.login_form_placeholder_password}
                type="password"
              />
            </label>
          </div>

          <button className="component-form__submit-button">
            {this.props.labels.login_form_submit_button}
          </button>
        </form>
      </div>
    );
  }
}
const reduxFormWrapper = reduxForm({ form: "loginForm" })(LoginForm);
const mapStateToProps = ({ labels }) => {
  return { labels };
};
export default connect(
  mapStateToProps,
  { login }
)(reduxFormWrapper);
