"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";

const EchartsComponent = () => {
  useEffect(() => {
    const chartDom = document.getElementById("chart");
    const myChart = echarts.init(chartDom!);
    let option: echarts.EChartsOption;

    let base = +new Date(2000, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    let data: [number, number][] = [[base, Math.random() * 300]];

    for (let i = 1; i < 720; i++) {
      let now = new Date((base += oneDay));
      data.push([
        +now,
        Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]),
      ]);
    }

    option = {
      tooltip: {
        trigger: "axis",
        position: function (pt) {
          return [pt[0], "10%"];
        },
      },
      title: {
        left: "center",
        text: "Large Area Chart",
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
      } as any,
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        axisLabel: {
          formatter: function (value) {
            return "$" + value.toFixed(8); // Format the value with a dollar symbol and two decimal places
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 20,
        },
        {
          start: 0,
          end: 20,
        },
      ],
      series: [
        {
          name: "Fake Data",
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
      myChart.dispose(); // Dispose of the chart when the component unmounts
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <div id="chart" style={{ width: "auto", height: "400px" }} />;
};

export default EchartsComponent;
