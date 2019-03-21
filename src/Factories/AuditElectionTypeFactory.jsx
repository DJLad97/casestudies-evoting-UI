import FirstPastThePost from "../components/AuditVotingTypes/FirstPastThePost";
import React, { Component } from "react";
import PreferentialVoting from "../components/AuditVotingTypes/PreferentialVoting";
import SingleTransferrableVote from "../components/AuditVotingTypes/SingleTransferrableVote";

/*
 *
 * ElectionTypeFactory implements the Factory design pattern
 * and upon request returns the class that matches the electionType
 * passed into the function.
 *
 * This factory is only used in audit.js but allows us to call only audit.js and still render any
 * of the voting type calculations rather than just one at a time
 *
 *
 */
export default class ElectionTypeFactory {
  /*
   *
   *
   * build is a static function thats the core of the factory, anything passed as data, in the correct format will return
   * the corresponding component to be rendered, with the data object passed into the component to render dynamically
   * @param {data} parameter requires electionType as a parameter, other data parameters vary by voting type
   *
   */
  static build(data) {
    console.log("Built Election");
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
