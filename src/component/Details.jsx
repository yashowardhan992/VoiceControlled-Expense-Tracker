import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import useTransactions from "../useTransactions";
ChartJS.register(ArcElement, Tooltip, Legend);
const Details = ({ title }) => {
  const { total, chartData } = useTransactions(title);
  return (
    <Card className="lg:max-w-[24rem] overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-1 p-2 rounded-none"
      >
        <Typography variant="h5" align="center" color="blue-gray">
          {title}
        </Typography>
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" color="blue-gray">
          {`\u20B9${total}`}
        </Typography>
        {/*Chart*/}
        <Doughnut data={chartData} />
      </CardBody>
      <CardFooter
        className={title === "Income" ? "bg-green-400" : "bg-red-400"}
      ></CardFooter>
    </Card>
  );
};

export default Details;
