'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Header from "./_components/Header";
import { Hero } from "./_components/Hero";
import { FeaturesSection } from "./_components/FeaturesSection";
import { Footer } from "./_components/Footer";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) return null;
  if (isSignedIn) return null;

  return (
    <>
      {/* Header */}
      <Header />
      
      {/* Hero section */}
      <Hero />
      
      {/* Features section */}
      <FeaturesSection />
      
      {/* Footer */}
      <Footer />
    </>
  );
}





// 'use client'

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// import Header from "./_components/Header";
// import { Hero } from "./_components/Hero";

// export default function Home() {
//   const { isSignedIn, isLoaded } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       router.replace("/dashboard");
//     }
//   }, [isLoaded, isSignedIn, router]);

//   if (!isLoaded) return null;
//   if (isSignedIn) return null;

//   return (
//    <>
//    {/* Header */}
//    <Header/>
//   <Hero/>
//    {/* Hero section */}
//    </>
//   );
// }
