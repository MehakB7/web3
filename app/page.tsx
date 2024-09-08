"use client";
import { Icon } from "@/components/icons/helper";
import { Projects } from "@/utils/constant";

import Link from "next/link";

export default function Home() {
  
  return (
    <div className="flex flex-col m-auto gap-4">
      <h1 className="text-3xl font-bold text-center">Web3 sample projects</h1>
      <div className="flex rounded-md items-center justify-center m-auto w-full gap-4 p-4 flex-wrap">
        {Projects.map((project, index) => (
          <Link href={project.href} key={index}>
            <li
              key={index}
              className="flex flex-col gap-4 border border-input bg-popover rounded-md items-center p-4 w-[150px]  hover:bg-accent hover:text-accent-foreground group"
            >
              <Icon
                name={project.icon}
                className="group-hover:fill-background"
              />
              <h3 className="text-md font-medium">{project.name}</h3>
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
}
