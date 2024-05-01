import { Outlet } from "react-router-dom";

import { Header } from "@/components/header";

export function Default() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
