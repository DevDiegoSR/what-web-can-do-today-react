import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Check, X } from "lucide-react";

import { homeRoutes } from "./home-routes";

export function Home() {
  return (
    <section className="flex-1 p-6 grid grid-cols-1 auto-rows-min gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Location & Position</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {homeRoutes.locationAndPosition.map((route) => (
              <li key={route.id}>
                <Link
                  to={route.to}
                  state={{ title: route.title }}
                  data-is-available={!route.isAvailable}
                  className="data-[is-available=true]:pointer-events-none"
                >
                  <Button
                    variant="ghost"
                    className="w-full flex gap-4 justify-start"
                    disabled={!route.isAvailable}
                  >
                    {route.icon}
                    <p className="flex-1 text-left">{route.title}</p>
                    <span className="flex gap-4 items-center">
                      <p>{route.isAvailable ? "SIM" : "NÃO"}</p>
                      {route.isAvailable ? (
                        <Check size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-red-600" />
                      )}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Device Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {homeRoutes.deviceFeatures.map((route) => (
              <li key={route.id}>
                <Link
                  to={route.to}
                  state={{ title: route.title }}
                  data-is-available={!route.isAvailable}
                  className="data-[is-available=true]:pointer-events-none"
                >
                  <Button
                    variant="ghost"
                    className="w-full flex gap-4 justify-start"
                    disabled={!route.isAvailable}
                  >
                    {route.icon}
                    <p className="flex-1 text-left">{route.title}</p>
                    <span className="flex gap-4 items-center">
                      <p>{route.isAvailable ? "SIM" : "NÃO"}</p>
                      {route.isAvailable ? (
                        <Check size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-red-600" />
                      )}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {homeRoutes.input.map((route) => (
              <li key={route.id}>
                <Link
                  to={route.to}
                  state={{ title: route.title }}
                  data-is-available={!route.isAvailable}
                  className="data-[is-available=true]:pointer-events-none"
                >
                  <Button
                    variant="ghost"
                    className="w-full flex gap-4 justify-start"
                    disabled={!route.isAvailable}
                  >
                    {route.icon}
                    <p className="flex-1 text-left">{route.title}</p>
                    <span className="flex gap-4 items-center">
                      <p>{route.isAvailable ? "SIM" : "NÃO"}</p>
                      {route.isAvailable ? (
                        <Check size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-red-600" />
                      )}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Map 1</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2">
            {homeRoutes.map.map((route) => (
              <li key={route.id}>
                <Link
                  to={route.to}
                  state={{ title: route.title }}
                  data-is-available={!route.isAvailable}
                  className="data-[is-available=true]:pointer-events-none"
                >
                  <Button
                    variant="ghost"
                    className="w-full flex gap-4 justify-start"
                    disabled={!route.isAvailable}
                  >
                    {route.icon}
                    <p className="flex-1 text-left">{route.title}</p>
                    <span className="flex gap-4 items-center">
                      <p>{route.isAvailable ? "SIM" : "NÃO"}</p>
                      {route.isAvailable ? (
                        <Check size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-red-600" />
                      )}
                    </span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
