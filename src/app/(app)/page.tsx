import CodeSnippets from "@/components/Sections/CodeSnippets";
import { EndingSection } from "@/components/Sections/EndingSection";
import MainSection from "@/components/Sections/MainSection";
import Why from "@/components/Sections/Why";



export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] flex flex-col space-y-12 antialiased text-white">
   <MainSection/>
   <CodeSnippets/>
   <Why/>
   <EndingSection/>
 
    </main>
  );
}
