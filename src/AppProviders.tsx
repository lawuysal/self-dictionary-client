import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <TooltipProvider delayDuration={100}>
                {children}
                {/* <ReactQueryDevtools
                  initialIsOpen={false}
                  buttonPosition="bottom-left"
                /> */}
                <Toaster />
              </TooltipProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
