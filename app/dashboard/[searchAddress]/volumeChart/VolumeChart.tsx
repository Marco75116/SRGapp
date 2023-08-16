"use client";
import React, { useEffect } from "react";
import * as echarts from "echarts";

type VolumeChartProps = {
  dataVolume: {
    volumePeriod: [number, number][];
    swaps: [number, number][];
  };
};
const VolumeChart = ({ dataVolume }: VolumeChartProps) => {
  useEffect(() => {
    type EChartsOption = echarts.EChartsOption;

    var chartDom = document.getElementById("volumeChart")!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    myChart.showLoading();

    myChart.hideLoading();

    option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          label: {
            show: false,
          },
        },
      },

      calculable: true,
      legend: {
        data: ["Volume Period", "Swaps"],
        itemGap: 5,
      },
      grid: {
        top: "12%",
        left: "1%",
        right: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLabel: {
          formatter: (value) => {
            const date = new Date(value);
            return `${date.getUTCFullYear()}-${
              date.getUTCMonth() + 1
            }-${date.getUTCDate()}`;
          },
        },
      } as any,
      yAxis: [
        {
          type: "value",
          name: "Volume Period",
          axisLabel: {
            formatter: function (a: number) {
              return "$" + a.toFixed(2);
            },
          },
        },
      ],
      dataZoom: [
        {
          show: true,
          start: 94,
          end: 100,
        },
        {
          type: "inside",
          start: 94,
          end: 100,
        },
        {
          show: true,
          yAxisIndex: 0,
          filterMode: "empty",
          width: 30,
          height: "80%",
          showDataShadow: false,
          left: "93%",
        },
      ],
      series: [
        {
          name: "Swaps",
          type: "bar",
          data: dataVolume.swaps,
          itemStyle: {
            color: "rgb(176 242 182 / 0.5)",
          },
        },
        {
          name: "Volume Period",
          type: "bar",
          data: dataVolume.volumePeriod,
          itemStyle: {
            color: "rgb(59 130 246 / 0.5)",
          },
        },
      ],
    };
    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [dataVolume]);

  return <div id="volumeChart" style={{ width: "auto", height: "400px" }} />;
};

export default VolumeChart;
