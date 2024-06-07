
import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";




const items = [
  {
    title: "Integrating MongoDB with Next.js",
    description: "Learn how to set up and use MongoDB in a Next.js application.",
    id:'66432c04aeb6dd48c1af168f'
  },
  {
    title: "Building RESTful APIs with Express and MongoDB",
    description: "Create robust RESTful APIs using Express.js and MongoDB.",
    id:'66630cfb8e2964f1814d9836'
  },
  {
    title: "Setting Up a React Frontend for a MERN Stack App",
    description: "Step-by-step guide to integrating React with a MERN stack backend.",
    id:'66630d948e2964f1814d9839'
  },
  {
    title: "Implementing User Authentication in a MERN App",
    description: "Secure your MERN stack application with user authentication.",
    id:'66630df68e2964f1814d983c'
  },
  {
    title: "Using Mongoose for Data Modeling in Node.js",
    description: "Understand how to define and use schemas with Mongoose.",
    id:'66630e528e2964f1814d983f'
  },

  {
    title: "Building a REST API with Go and Gin",
    description: "Create a simple REST API using the Gin framework in Go.",
    id:'66630ed08e2964f1814d9842'
  },


  {
    title: "Creating REST APIs with Flask and Python",
    description: "Develop a RESTful API using Flask in Python.",
    id:'666310008e2964f1814d9865'
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
          id={item.id}
          description={item.description}
          className={i === 3 || i === 6 ? "md:col-span-2 h-48 sm:w-[330px] md:w-auto" : "h-48 sm:w-[330px] md:w-auto"}
        />
      ))}
    </BentoGrid>
  

    </div>
  )
}
