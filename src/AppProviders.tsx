import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              {children}
              <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
              />
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default AppProviders;
