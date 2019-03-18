import FirstPastThePost from "../components/AuditVotingTypes/FirstPastThePost";
import React, { Component } from "react";
import PreferentialVoting from "../components/AuditVotingTypes/PreferentialVoting";
import SingleTransferrableVote from "../components/AuditVotingTypes/SingleTransferrableVote";

export default class ElectionTypeFactory {
  static build(data) {
      console.log("Built Election")
    switch (data.electionType) {
        
      case "FPTP":
        return <FirstPastThePost election={data} />;
      case "PV":
        return <PreferentialVoting election={data} />;
      case "STV":
        return <SingleTransferrableVote election={data} />;
      default:
        return undefined;
    }
  }
}
