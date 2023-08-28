import React, { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import {
  List as MList,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  ListItemSuffix,
  IconButton,
} from "@material-tailwind/react";
import { LuIndianRupee } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";

const List = () => {
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);

  return (
    <div className="flex flex-col justify-center ">
      <Card className="w-full shadow-none">
        <MList className="overflow-y-auto h-24  ">
          {transactions.map((transaction) => (
            <ListItem className="mt-1 shrink-0">
              <ListItemPrefix className="p-1 ">
                <LuIndianRupee
                  className={
                    transaction.type === "Income"
                      ? "bg-green-300 rounded-full p-1 w-full h-full"
                      : "bg-red-300 rounded-full p-1 w-full h-full"
                  }
                />
              </ListItemPrefix>
              <div>
                <Typography variant="h6" color="blue-gray">
                  {transaction.category}
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  {`\u20B9 ${transaction.amount} - ${transaction.date}`}
                </Typography>
              </div>
              <ListItemSuffix>
                <IconButton
                  variant="text"
                  color="blue-gray"
                  aria-label="delete"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <BsTrash3 size="medium" />
                </IconButton>
              </ListItemSuffix>
            </ListItem>
          ))}
        </MList>
      </Card>
    </div>
  );
};

export default List;
