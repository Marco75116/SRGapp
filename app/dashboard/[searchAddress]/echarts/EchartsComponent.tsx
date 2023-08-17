"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";
type EchartsComponentProps = {
  data: [number, number][];
};

const EchartsComponent = ({ data }: EchartsComponentProps) => {
  useEffect(() => {
    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom!);
    let option: echarts.EChartsOption;

    option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
        formatter: function (params: any) {
          const value: [number, number] = params[0].value;
          const date = new Date(value[0]);
          const formattedDate = date.toLocaleString();
          const formattedValue = "$" + value[1].toFixed(8);
          return `Date: ${formattedDate}<br />Price: ${formattedValue}`;
        },
      },

      xAxis: {
        type: "time",
        boundaryGap: [0, 0],
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, 0],
        axisLabel: {
          formatter: function (value) {
            return "$" + value.toFixed(value > 1 || value === 0 ? 0 : 8);
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: "Price",
          type: "line",
          smooth: true,
          symbol: "none",
          areaStyle: {},
          data: data,
        },
      ],
    };

    if (option) {
      myChart.setOption(option);
    }

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="chart" style={{ width: "auto", height: "400px" }} />;
};

export default EchartsComponent;
