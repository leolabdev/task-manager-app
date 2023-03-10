import { StrictMode } from 'react';
import  {createRoot} from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import App from "@/app/App";
import '../src/app/styles/index.scss'
import {StoreProvider} from "@/app/providers/StoreProvider";
// import {DevSupport} from "@react-buddy/ide-toolbox";
// import {ComponentPreviews, useInitial} from "@/shared/dev";
createRoot(document.getElementById('root') as HTMLElement).render(
    <ErrorBoundary>
    <StoreProvider >
  <StrictMode>
      <BrowserRouter>

              <ThemeProvider>
                  {/*<DevSupport*/}
                  {/*    // @ts-ignore*/}
                  {/*    ComponentPreviews={<ComponentPreviews/>}*/}
                  {/*    useInitialHook={useInitial}*/}
                  {/*>*/}
                  <App />
                  {/*</DevSupport>*/}
              </ThemeProvider>

      </BrowserRouter>
  </StrictMode>
    </StoreProvider>
    </ErrorBoundary>
)
