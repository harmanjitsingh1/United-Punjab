import { Outlet } from "react-router-dom";

export default function ServicesPage() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-16">
      <Outlet />
    </section>
  );
}
