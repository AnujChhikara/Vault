import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Why() {
  return (
    <div className='flex justify-center items-center sm:pt-12 md:pt-20'>

  
     <div className="md:w-[800px] sm:w-[360px]">
      <h2 className="md:text-2xl sm:text-xl font-bold mb-4">What&lsquo;s the Need of This Website?</h2>
       <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Why Not GitHub?</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc ml-6">
          <li>Provides an intuitive interface for easy navigation and search, making it simple to find the code you need.</li>
          <li>Enables users to explore and utilize others code snippets, fostering collaboration and learning.</li>
        </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why Not Storage them Locally?</AccordionTrigger>
        <AccordionContent>
         <ul className="list-disc ml-6">
          <li>Accessible from anywhere with an internet connection.</li>
          <li>Eliminates the risk of data loss due to hardware failure or device loss.</li>
          <li>Provides a platform for discovering and learning from others&lsquo; code snippets.</li>
        </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Why not Notion like apps?</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc ml-6">
          <li>To be honest, mastering Notion feels like trying to understand hieroglyphics, but hey, we&apos;re developers, we create apps for the most basic to basic needs!</li>
          <li>While Notion may be great for organizing your thoughts and tasks, our website focuses specifically on providing a simple and efficient platform for developers to find and share code snippets.</li>
          <li>We&apos;d rather spend our time coding than deciphering a labyrinth of nested pages and blocks in Notion!</li>
        </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      
    </div>  </div>
  )
}
