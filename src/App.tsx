import "./App.css";
import { Provider } from "react-redux";
import AppHandler from "@app/AppHandler";
import { store } from "@slices/store";
import { AppAuthProvider } from "@context/AuthContext";
import { PopUpProvider } from "@context/PopUpContext";
import { ThemeProvider } from "@context/ThemeContext";
import { Theme } from "@radix-ui/themes";
import { ToastProvider } from "@context/ToastContext";

export default function App() {
  return (
    <Provider store={store}>
      <AppAuthProvider>
        <Theme>
          <ThemeProvider>
            <PopUpProvider>
              <ToastProvider>
                <AppHandler />
              </ToastProvider>
            </PopUpProvider>
          </ThemeProvider>
        </Theme>
      </AppAuthProvider>
    </Provider>
  );
}
