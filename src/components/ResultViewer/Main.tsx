import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { IState } from "../../Store";
import { IImageLoaderState, IResults } from "../../slice/ImageLoaderReducer";
import { ColorMode, IResultViewerState } from "../../slice/ResultViewerReducer";
import { rgb2hsv } from "../../img/color";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
      text: "",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Colors"];

const createData = (datasets: IResults, mode: ColorMode = "rgb") => {
  const data = {
    labels,
    datasets: [] as {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[],
  };

  let counts = 0;
  Object.keys(datasets).map((key) => {
    counts += datasets[Number(key)].count;
  });

  Object.keys(datasets).map((key) => {
    console.log(datasets[Number(key)]);
    let label: string = "";
    const color = datasets[Number(key)].rgb;
    const rgb = `rgb(${color.toString()})`;
    if (mode === "rgb") {
      label = `rgb(${color.toString()})`;
    } else if (mode === "hsv") {
      label = `hsv(${rgb2hsv(color).toString()})`;
    }
    data.datasets.push({
      label: label,
      data: [datasets[Number(key)].count / counts],
      borderColor: rgb,
      backgroundColor: rgb,
    });
  });

  return data;
};

const initialData = {
  labels,
  datasets: [
    {
      label: "rgb(37,107,167)",
      data: labels.map(() => 22),
      borderColor: "rgb(37,107,167)",
      backgroundColor: "rgba(37,107,167)",
    },
    {
      label: "rgb(84,154,209)",
      data: labels.map(() => 22),
      borderColor: "rgb(84,154,209)",
      backgroundColor: "rgba(84,154,209)",
    },
    {
      label: "rgb(17,40,57)",
      data: labels.map(() => 20),
      borderColor: "rgb(17,40,57)",
      backgroundColor: "rgba(17,40,57)",
    },
    {
      label: "rgb(160,203,232)",
      data: labels.map(() => 20),
      borderColor: "rgb(160,203,232)",
      backgroundColor: "rgba(160,203,232)",
    },
    {
      label: "rgb(117,90,41)",
      data: labels.map(() => 16),
      borderColor: "rgb(117,90,41)",
      backgroundColor: "rgba(117,90,41)",
    },
  ],
};

export const Main: React.FC = () => {
  const imageLoaderState = useSelector<IState, IImageLoaderState>(
    (a) => a.imageLoader
  );
  const resultViewerState = useSelector<IState, IResultViewerState>(
    (a) => a.resultViewer
  );
  const data = useMemo(() => {
    if (!imageLoaderState.results) {
      return initialData;
    }
    return createData(imageLoaderState.results, resultViewerState.colorMode);
  }, [imageLoaderState.results, resultViewerState.colorMode]);
  return (
    <React.Fragment>
      <Bar options={options} data={data} />
    </React.Fragment>
  );
};
