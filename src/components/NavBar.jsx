import React from "react";

const NavBar = ({ children }) => {
  return (
    <div className="flex h-16 flex-wrap items-center bg-summer-100">
      <div className="container mx-auto flex h-full items-center justify-center lg:justify-between">
        <img src="/assets/fr_logo.png" alt="logo" className="h-full py-4" />
        {children}
      </div>
    </div>
  );
};

export default NavBar;
