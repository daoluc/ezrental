import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        {/* how it works */}
        {/* browse the items */}
        {/* Footer */}
      </div>
    </div>
  );
}
