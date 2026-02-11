import { Navbar } from '@/components/home/Navbar';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustSignals } from '@/components/home/TrustSignals';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyMediConnect } from '@/components/home/WhyMediConnect';
import { DoctorCTA } from '@/components/home/DoctorCTA';
import { FAQSection } from '@/components/home/FAQSection';
import { Footer } from '@/components/home/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <Navbar />

            <main className="flex-grow">
                <HeroSection />
                <TrustSignals />
                <HowItWorks />
                <WhyMediConnect />
                <DoctorCTA />
                <FAQSection />
            </main>

            <Footer />
        </div>
    );
}
