import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { Code2Icon } from "lucide-react";


const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 "></div>
);
const items = [
  {
    title: "Integrating MongoDB with Next.js",
    description: "Learn how to set up and use MongoDB in a Next.js application.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Building RESTful APIs with Express and MongoDB",
    description: "Create robust RESTful APIs using Express.js and MongoDB.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Setting Up a React Frontend for a MERN Stack App",
    description: "Step-by-step guide to integrating React with a MERN stack backend.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Implementing User Authentication in a MERN App",
    description: "Secure your MERN stack application with user authentication.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Using Mongoose for Data Modeling in Node.js",
    description: "Understand how to define and use schemas with Mongoose.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Deploying a MERN Stack Application",
    description: "Best practices for deploying a MERN stack application to production.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Building a REST API with Go and Gin",
    description: "Create a simple REST API using the Gin framework in Go.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },

  {
    title: "Building Web Applications with Go and React",
    description: "Integrate a Go backend with a React frontend for a full-stack app.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Creating REST APIs with Flask and Python",
    description: "Develop a RESTful API using Flask in Python.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Deploying a Python Flask Application",
    description: "Learn the steps to deploy a Flask app to a production environment.",
    header: <Code2Icon/>,
    id:'66432c04aeb6dd48c1af168f'
  },
];


export default function CodeSnippets() {
  return (
    <div className="flex flex-col justify-center items-center space-y-8">
        <p className="text-3xl font-semibold">Get Started </p>
          
        <BentoGrid className="">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={i === 3 || i === 6 ? "md:col-span-2 h-48 sm:w-[360px] md:w-auto" : "h-48 sm:w-[360px] md:w-auto"}
        />
      ))}
    </BentoGrid>
  

    </div>
  )
}
