import { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { WatchPositionProvider } from "@/hooks/geolocation/useWatchPosition";

type ContextProvidersProps = {
  children: ReactNode;
};

const ContextProviders = ({ children }: ContextProvidersProps) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WatchPositionProvider>{children}</WatchPositionProvider>
    </ThemeProvider>
  );
};

export { ContextProviders };
