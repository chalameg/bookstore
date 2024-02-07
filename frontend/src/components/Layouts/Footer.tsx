import React, { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="relative" >
      <div className="sm:px-32 px-4 text-black flex justify-between text-[16px] items-center h-[48px]">
        <span>Copyright @bookstore 2024. All rights reserved.</span>
        <span>Terms & Conditions  | Privacy Policy</span>
      </div>
    </div>
  );
};

export default Footer;
