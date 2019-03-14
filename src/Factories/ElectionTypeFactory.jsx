import FirstPastThePost from "../components/VotingTypes/FirstPastThePost";
import React, { Component } from "react";
import PreferentialVoting from "../components/VotingTypes/PreferentialVoting";
import SingleTransferrableVote from "../components/VotingTypes/SingleTransferrableVote";

export default class ElectionTypeFactory {
  static build(data) {
    switch (data.votetype) {
      case "fptp":
        return <FirstPastThePost votedata={data} />;
      case "pv":
        return <PreferentialVoting votedata={data} />;
      case "stv":
        return <SingleTransferrableVote votedata={data} />;
      default:
        return undefined;
    }
  }
}
