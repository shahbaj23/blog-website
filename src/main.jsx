import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { PostProvider } from "./Context/PostContext.jsx";
import AuthState from "./Context/AuthState.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthState>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthState>
  </BrowserRouter>
);
