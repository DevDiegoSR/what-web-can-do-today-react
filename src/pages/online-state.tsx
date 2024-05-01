import { useLocation } from "react-router-dom";

export function OnlineState() {
  const location = useLocation();

  return (
    <section className="flex-1 p-6 grid place-items-center">
      {location.pathname}
    </section>
  );
}
