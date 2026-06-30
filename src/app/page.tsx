import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Rooms } from "@/components/site/rooms";
import { Dining } from "@/components/site/dining";
import { ReservationCTA } from "@/components/site/reservation-cta";
import { Wellness } from "@/components/site/wellness";
import { Events } from "@/components/site/events";
import { Discover } from "@/components/site/discover";
import { Gallery } from "@/components/site/gallery";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { BookingDialog } from "@/components/site/booking-dialog";
import { FloatingActions } from "@/components/site/floating-actions";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Rooms />
        <Dining />
        <ReservationCTA />
        <Wellness />
        <Events />
        <Discover />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <BookingDialog />
      <FloatingActions />
    </div>
  );
}
