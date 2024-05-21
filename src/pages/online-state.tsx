import { useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useOnlineState } from "@/hooks/online-state/useOnlineState";

function NavigatorOnline() {
  const { onlineState, getOnlineState, cleanUpOnlineState } = useOnlineState();

  useEffect(() => {
    getOnlineState();
    return () => cleanUpOnlineState();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Online State</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 mb-6">
            <li>state: {onlineState?.state}</li>
            <li>timestamp: {onlineState?.timestamp}</li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

export function OnlineState() {
  return (
    <section className="flex-1 p-6 grid grid-cols-1 auto-rows-min gap-4">
      <NavigatorOnline />
    </section>
  );
}
