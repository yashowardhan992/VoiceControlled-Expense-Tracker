import React from "react";

import Details from "./component/Details";
import Main from "./component/Main";

const App = () => {
  return (
    <div className="flex flex-row justify-center align-items-center py-5 w-screen min-h-screen  bg-blue-gray-900 p-2  shadow sm:p-6 md:p-3 md:w-screen h-fit ">
      <div className="container flex flex-col mt-2 p-1 lg:flex-row justify-evenly min-h-screen md:w-screen ">
        <div className="item p-1 min-w-[3/4] h-fit">
          <Main />
        </div>
        <div className="flex flex-col lg:flex-col xl:flex-row h-fit">
          <div className="item h-1/2 p-2">
            <Details title="Income" />
          </div>
          <div className="item h-1/2 p-2">
            <Details title="Expense" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
