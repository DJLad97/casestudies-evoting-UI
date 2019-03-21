import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

/*
 *
 * VoteConfirmed returns the message that is displayed when a vote is submitted
 * @props {match}
 *
 *
 */
const VoteConfirmed = props => {
  const electionName = props.match.params.name;
  const { t } = props;
  return (
    <div className="page-content-box confirm-info">
      <h2 id="confirm-header">
        {t("confirmText1")} <strong>{electionName}</strong> {t("confirmText2")}
      </h2>
      <Link to="/elections">
        <Button variant="primary" className="return-home-btn">
          {t("returnToElections")}
        </Button>
      </Link>
    </div>
  );
};

export default withTranslation()(VoteConfirmed);
