import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { ContextProviders } from "./components/context-providers";

export function App() {
  return (
    <ContextProviders>
      <BrowserRouter basename="/what-web-can-do-today-react">
        <Router />
      </BrowserRouter>
    </ContextProviders>
  );
}
