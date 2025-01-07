import { useState } from "react";
import MyRoutes from "./routes/MyRoutes";
import RootLayout from "./components/layouts/RootLayout";

const App = () => {
  const [theme, setTheme] = useState<"customLight" | "customDark">(
    "customLight"
  );

  return (
    <div data-theme={theme}>
      <RootLayout setTheme={setTheme} theme={theme}>
        <MyRoutes />
      </RootLayout>
    </div>
  );
};

export default App;
