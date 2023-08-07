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
      position: "right" as const,
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

const createData = (datasets: IResults) => {
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
    const rgb = `rgb(${datasets[Number(key)].rgb.toString()})`;
    data.datasets.push({
      label: rgb,
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
        label: "rgb(234,67,54)",
        data: labels.map(() => 40),
        borderColor: "rgb(234,67,54)",
        backgroundColor: "rgba(234,67,54)",
      },
      {
        label: "rgb(51,168,83)",
        data: labels.map(() => 30),
        borderColor: "rgb(51,168,83)",
        backgroundColor: "rgba(51,168,83)",
      },
      {
        label: "rgb(66,132,244)",
        data: labels.map(() => 15),
        borderColor: "rgb(66,132,244)",
        backgroundColor: "rgba(66,132,244)",
      },
      {
        label: "rgb(250,189,5)",
        data: labels.map(() => 10),
        borderColor: "rgb(250,189,5)",
        backgroundColor: "rgba(250,189,5)",
      },
      {
        label: "rgb(255,255,255)",
        data: labels.map(() => 5),
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(255, 255, 255)",
      },
    ],
  };

export const Main: React.FC = () => {
  const imageLoaderState = useSelector<IState, IImageLoaderState>(
    (a) => a.imageLoader
  );
  const data = useMemo(() => {
    if(!imageLoaderState.results){
        return initialData;
    }
    return createData(imageLoaderState.results);
  }, [imageLoaderState.results]);
  return (
    <React.Fragment>
      <Bar options={options} data={data} />
    </React.Fragment>
  );
};
