import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export const Route = createFileRoute("/_public")({
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
