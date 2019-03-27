import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { register } from "../../_actions";

class RegisterForm extends React.Component {
  renderInput = ({ input, placeholder, type, meta }) => {
    return (
      <>
        <input
          {...input}
          type={type}
          className="component-form__input"
          placeholder={placeholder}
        />
        {this.renderError(meta)}
      </>
    );
  };
  onSubmit = () => {
    this.props.register();
  };
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="form-error-message">{error}</div>;
    }
  };
  render() {
    return (
      <div className="component-form">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">account_circle</i>
              <Field
                name="username"
                component={this.renderInput}
                placeholder={this.props.labels.signup_form_placeholder_username}
                type="text"
              />
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">phone</i>
              <Field
                name="phone"
                component={this.renderInput}
                placeholder={this.props.labels.signup_form_placeholder_phone}
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
                placeholder={this.props.labels.signup_form_placeholder_password}
                type="password"
              />
            </label>
          </div>
          <div className="component-form__input-container">
            <label className="component-form__form-field">
              <i className="material-icons">lock</i>
              <Field
                name="repeat_password"
                component={this.renderInput}
                placeholder={
                  this.props.labels.signup_form_placeholder_repeat_password
                }
                type="password"
              />
            </label>
          </div>
          <button className="component-form__submit-button">
            {this.props.labels.signup_form_submit_button}
          </button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.phone) {
    errors.phone = "您需要提供一个有效的电话号码";
  } else if (!/04+[0-9]{8}$/.test(formValues.phone)) {
    errors.phone = "电话号码格式错误，不要有空格";
  }
  if (!formValues.username) {
    errors.username = "您需要提供一个有效的用户名";
  }

  return errors;
};

const reduxFormWrapper = reduxForm({ form: "registerForm", validate })(
  RegisterForm
);

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(
  mapStateToProps,
  { register }
)(reduxFormWrapper);
