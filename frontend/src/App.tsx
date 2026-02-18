import { Toaster } from "sonner";
import LoginContainer from "./components/screens/login/LoginContainer";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <LoginContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
