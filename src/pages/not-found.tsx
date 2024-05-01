import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NotFound() {
  const location = useLocation();

  return (
    <section className="flex-1 p-6 grid place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>What Web Can Do Today (React)</CardTitle>
          <CardDescription>{`página: ${location.pathname}`}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Desculpe, não foi possível encontrar a página.</p>
        </CardContent>
        <CardFooter>
          <Link to="/">
            <Button className="transition-all">Voltar para a Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
