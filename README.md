# criar o projeto => vite => react + ts

```batch
yarn create vite
yarn
```

# ui => shadcn/ui

```batch
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

yarn add -D @types/node
```

- tsconfig.json

```json
/* Paths */
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

vite.config.ts

```javascript
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

```batch
npx shadcn-ui@latest init
```

# state management => zustand

```batch
yarn add zustand
```

# routing => react-router-dom

```batch
yarn add react-router-dom
```

# Geolocation API

- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

```ts
enum GeolocationPositionErrorCode {
  // geolocation information failed because the page didn't have the necessary permissions
  PERMISSION_DENIED = 1,
  // geolocation failed because at least one internal source of position returned an internal error
  POSITION_UNAVAILABLE = 2,
  // time allowed to acquire the geolocation was reached before the information was obtained
  TIMEOUT = 3,
}

type TGeolocationPositionError = {
  code: GeolocationPositionErrorCode | 9999; // 9999 => NOT_SUPPORTED
  message: string;
};
```
