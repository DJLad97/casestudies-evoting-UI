import FirstPastThePost from "../components/VotingTypes/FirstPastThePost";
import React, { Component } from "react";
import PreferentialVoting from "../components/VotingTypes/PreferentialVoting";
import SingleTransferrableVote from "../components/VotingTypes/SingleTransferrableVote";

export default class ElectionTypeFactory {
  static build(data) {
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
