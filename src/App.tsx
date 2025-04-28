import "./App.css";
import { Provider } from "react-redux";
import AppHandler from "@app/AppHandler";
import { store } from "@slices/store";
import { PopUpProvider } from "@context/PopUpContext";
import { ThemeProvider } from "@context/ThemeContext";
import { Theme } from "@radix-ui/themes";
import { ToastProvider } from "@context/ToastContext";
import { ChartJSProvider } from "@providers/ChartJSProvider";
import { AppInitializer } from "@providers/AppInitializerProvier";
import { AppAuthProvider } from "@context/AuthContext";

export default function App() {
  return (
    <Provider store={store}>
      <AppAuthProvider>
        <AppInitializer>
          <Theme>
            <ThemeProvider>
              <PopUpProvider>
                <ToastProvider>
                  <ChartJSProvider>
                    <AppHandler />
                  </ChartJSProvider>
                </ToastProvider>
              </PopUpProvider>
            </ThemeProvider>
          </Theme>
        </AppInitializer>
      </AppAuthProvider>
    </Provider>
  );
}
