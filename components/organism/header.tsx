import React from "react";
import { CustonConnectButton } from "../molecule/rainbowkitButton";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="flex p-4 justify-between items-center">
      <div>
        <Link href="/">
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="50" height="50" fill="none"></rect>
            <text
              x="10"
              y="65"
              font-family="'Brush Script MT', cursive"
              font-size="50"
              className="fill-foreground"
            >
              M
            </text>
            <text
              x="50"
              y="65"
              font-family="'Brush Script MT', cursive"
              font-size="50"
              className="fill-accent-foreground"
            >
              B
            </text>
          </svg>
        </Link>
      </div>
      <div className="flex">
        <CustonConnectButton />
      </div>
    </div>
  );
};
