import { Link, useLocation } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";

export function Header() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const title = location.state?.title ?? "What Web Can Do Today (React)";

  return (
    <header className="px-6 py-3 flex items-center justify-between border-b">
      <span className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          data-is-home={isHome}
          className="data-[is-home=true]:hidden"
          asChild
        >
          <Link to="/">
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
          </Link>
        </Button>

        <h1 className="text-xl font-bold">{title}</h1>
      </span>

      <div className="flex items-center gap-3">
        <Separator orientation="vertical" className="h-9" />
        <ModeToggle />
      </div>
    </header>
  );
}
