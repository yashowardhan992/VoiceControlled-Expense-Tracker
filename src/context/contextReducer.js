const contextReducer = (state, action) => {
  let transactions;
  switch (action.type) {
    case "DELETE_TRANSACTION":
      transactions = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;

    case "ADD_TRANSACTION":
      // Format the amount with commas as thousands separators
      const formattedAmount = action.payload.amount.toLocaleString('en-IN');

      const newTransaction = {
        ...action.payload,
        amount: formattedAmount
      };

      transactions = [newTransaction, ...state];
      localStorage.setItem("transactions", JSON.stringify(transactions));
      return transactions;

    default:
      return state;
  }
};

export default contextReducer;
