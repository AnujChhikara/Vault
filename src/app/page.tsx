import CodeSnippets from "@/components/Sections/CodeSnippets";
import Footer from "@/components/Sections/Footer";
import MainSection from "@/components/Sections/MainSection";
import Why from "@/components/Sections/Why";
import Features from "@/components/Sections/Features";

export default function Home() {
  return (
    <main className='min-h-screen bg-black/[0.96] flex flex-col space-y-20 antialiased text-white'>
      <MainSection />
      <CodeSnippets />
      <Features />
      <Why />
      <Footer />
    </main>
  );
}
