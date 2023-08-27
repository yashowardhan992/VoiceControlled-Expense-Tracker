import React, { useContext } from "react";
import InfoCard from "./InfoCard";
import { ExpenseTrackerContext } from "../context/context";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Form from "./Form";
import List from "./List";
import { useSpeechContext } from "@speechly/react-client";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const Main = () => {
  const { listening, segment, attachMicrophone, start, stop } =
    useSpeechContext();
  const handleClick = async () => {
    if (listening) {
      await stop();
    } else {
      await attachMicrophone();
      await start();
    }
  };
  const { balance } = useContext(ExpenseTrackerContext);
  return (
    <div id="main-card-container" className="flex flex-col justify-center">
      <Card id="main-card" className=" flex flex-col justify-center h-fit">
        <CardHeader
          id="card-header"
          variant="h4"
          floated={false}
          shadow={false}
          color="transparent"
          className="md:m-2 md:p-2 rounded-none w-5/7 h-3/5"
        >
          <Typography variant="h5" align="center">
            Expense Tracker
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col justify-center text-center p-0 mt-0 mr-4 ml-4 pl-9 pr-9 h-fit">
          <Typography
            variant="h5"
            color="gray"
            className="mt-1 p-1 font-semibold"
          >
            Total Balance: {`\u20B9 ${balance}`}
          </Typography>
          <Typography
            variant="small"
            color="normal"
            className="mt-2 font-normal"
          >
            {/*InfoCard  */}
            <InfoCard />
          </Typography>

          <Typography
            align="center"
            variant="small"
            color="normal"
            className="mt-2 font-sans text-black text-xs font-semibold ml-10 max-w-[24rem] max-h-[24rem]"
          >
            {segment && segment.words.map((w) => w.value).join("  ")}
          </Typography>
          {/* Divider */}
          <hr className="mt-3" />
          {/* Form */}
          <Form />
        </CardBody>
        <CardBody className="flex flex-col justify-center p-3 pl-9 pr-9 gap-3 mb-4  text-center h-fit">
          {/* List */}
          <List />
          <div className="h-fit flex justify-center">
            <Button className="p-2 m-2 rounded-full " onClick={handleClick}>
              <IconButton>
                {listening ? (
                  <BsFillMicFill size="sm" />
                ) : (
                  <BsFillMicMuteFill size="sm" />
                )}
              </IconButton>
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <Typography variant="h6" align="center" color="gray">
            Powered By Speechly
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Main;
