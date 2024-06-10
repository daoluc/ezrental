import BrowseItems from "@/components/BrowseItems";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MaxWContainer from "@/components/MaxWContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Hero />
        <MaxWContainer>
          <HowItWorks />
        </MaxWContainer>
        <div className="py-4 px-5">
          <h3 className="mb-16 mt-16 text-center text-xl sm:text-4xl px-2 py-4 sm:py-16 bg-primary">Why buy when you can rent! Choose from thousand of items available to rent.</h3>
        </div>
        <BrowseItems />
        <div className="py-4 px-5">
          <h3 className="mb-16 mt-16 text-center text-xl sm:text-4xl px-2 py-4 sm:py-8 bg-primary">
            Ready to make money? <Link href='/mylistings' className="font-bold">Start now &rarr; </Link>
          </h3>
        </div>
        <Footer />
      </div>
    </div>
  );
}
