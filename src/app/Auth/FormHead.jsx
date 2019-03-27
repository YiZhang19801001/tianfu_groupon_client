import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../../history";

const FormHead = () => {
  return (
    <div className="component-form-head">
      <Link
        className={`component-from-head__nav left${
          history.location.pathname === "/register" ? " active" : ""
        }`}
        to={`${process.env.PUBLIC_URL}/register`}
      >
        {this.props.labels.auth_form_head_signup}
      </Link>
      <Link
        className={`component-from-head__nav right${
          history.location.pathname === "/login" ? " active" : ""
        }`}
        to={`${process.env.PUBLIC_URL}/login`}
      >
        {this.props.labels.auth_form_head_signin}
      </Link>
    </div>
  );
};

const mapStateToProps = ({ labels }) => {
  return { labels };
};

export default connect(mapStateToProps)(FormHead);
