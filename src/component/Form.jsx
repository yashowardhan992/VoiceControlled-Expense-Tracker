import React, { useContext, useEffect, useState } from "react";
import { Card, Input, Button } from "@material-tailwind/react";
import { ExpenseTrackerContext } from "../context/context";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../utils/formatDate";
import { incomeCategories, expenseCategories } from "../constants/categories";
import { useSpeechContext } from "@speechly/react-client";

const initialState = {
  amount: "",
  category: "",
  type: "",
  date: formatDate(new Date()),
};
const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();

  const createTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };
    addTransaction(transaction);
    setFormData(initialState);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value
          .slice(1)
          .toLowerCase()}`;

        switch (s.type) {
          case "amount":
            setFormData({ ...formData, amount: s.value });
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;
          case "date":
            setFormData({ ...formData, date: s.value });
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <Card color="transparent" shadow={false} className="p-2  m-2 h-fit ">
      <form className="flex flex-col justify-center">
        <div className="mb-2 flex flex-col justify-center gap-3">
          <div className="flex flex-row justify-around p-2 gap-2">
            <select
              className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 sm:max-w-xs sm:text-sm sm:leading-6 justify-around"
              name="type"
              value={formData.type}
              label="Type"
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="" disabled selected>
                Select Type
              </option>
              <option>Income</option>
              <option>Expense</option>
            </select>
            <select
              className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 sm:max-w-xs sm:text-sm sm:leading-6"
              name="category"
              value={formData.category}
              label="Category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="" disabled selected>
                Select Category
              </option>
              {selectedCategories.map((c) => (
                <option key={c.type} value={c.type}>
                  {c.type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-2 pt-3 pb-0 px-1.5  justify-around  text-center">
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7   text-gray-900  placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Amount"
              value={formData.amount}
              variant="standard"
              label="Amount"
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            />
            <input
              value={formData.date}
              className="block w-full rounded-md border-0 py-1.5 pl-7  text-gray-900  placeholder:text-gray-400  focus:ring-indigo-600 sm:text-sm sm:leading-6"
              variant="standard"
              type="date"
              label="Date"
              onChange={(e) =>
                setFormData({ ...formData, date: formatDate(e.target.value) })
              }
            />
          </div>
        </div>
        <Button className="mt-1" onClick={createTransaction}>
          Create
        </Button>
      </form>
    </Card>
  );
};

export default Form;
