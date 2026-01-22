import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/site-header";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1"><Outlet /></main>
            <footer className="border-t py-6 md:py-8">
                <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2026 Clinic App. Standard Medical Disclaimer applies.
                    </p>
                </div>
            </footer>
        </div>
    );
}
