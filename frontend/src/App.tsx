import { Toaster } from "sonner";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
