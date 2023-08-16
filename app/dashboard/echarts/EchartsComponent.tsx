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
  }, [data]); // Empty dependency array ensures the effect runs only once

  return <div id="chart" style={{ width: "auto", height: "400px" }} />;
};

export default EchartsComponent;
