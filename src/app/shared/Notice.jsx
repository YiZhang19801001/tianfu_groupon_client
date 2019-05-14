import React from "react";
import { connect } from "react-redux";
import { makeDate } from "../../_helpers";
import moment from "moment";

const Notice = ({ app_status, labels }) => {
  const { isOpen, start_date, end_date } = app_status;

  const renderContent = () => {
    if (isOpen) {
      return (
        <span className="primary">
          {labels.notice_primary_open}：{moment(end_date, "DD-MMM")}
        </span>
      );
    }
    return (
      <>
        <span className="primary">{labels.notice_primary_close}</span>
        <span className="secondary">
          {labels.notice_secondary}:{moment(start_date, "DD-MMM")}
        </span>
      </>
    );
  };

  return (
    <div className={`component-notice ${isOpen ? "open" : "close"}`}>
      {renderContent()}
    </div>
  );
};

const mapStateToProps = ({ app_status, labels }) => {
  return { app_status, labels };
};

export default connect(mapStateToProps)(Notice);
