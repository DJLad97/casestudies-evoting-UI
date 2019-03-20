import React, { Component } from "react";
import PieChartComponent from "../components/Charts/PieChart";
export default class ChartFactory {
  static build(data) {
    console.log("Built Chart");
    switch (data.ChartType) {
      case "PIE":
        return <PieChartComponent data={data} />;
      case "PV":
        return <PieChartComponent data={data} />;
      case "STV":
        return <PieChartComponent data={data} />;
      default:
        return undefined;
    }
  }
}
