import React from "react";
import AppRoutes from "./routes/appRoutes";
import Background from "./components/background";

const App = () => {
  return (
    <div className=" relative background">
      {/* <div className=" fixed top-0 left-0 w-full h-full z-0 scale-100 origin-top-left bg-[#ffcc56]">
        <Background />
      </div> */}
      <div className=" relative z-10">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
