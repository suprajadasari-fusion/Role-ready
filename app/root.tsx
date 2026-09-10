import React, { useState, useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { Provider } from "react-redux";
import { store, useAppDispatch, useAppSelector } from "~/store/store";
import { setOnlineStatus } from "~/store/slices/offlineSlice";
import { offlineCache } from "~/lib/offlineCache";
import stylesheet from "~/app.css?url";
=======
import stylesheet from "./app.css?url";
>>>>>>> c478195d4840fca4c8f52e87362353b7e38cff2c

export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
<<<<<<< HEAD
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" },
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" }
=======
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" }
>>>>>>> origin/omsai
  ];
}

function GlobalOfflineNotifier() {
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector(state => state.offline.isOnline);

  useEffect(() => {
    // Register PWA Service Worker
    offlineCache.registerServiceWorker();

    const handleOnline = () => dispatch(setOnlineStatus(true));
    const handleOffline = () => dispatch(setOnlineStatus(false));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  if (isOnline) return null;

  return (
    <div role="alert" aria-live="assertive" className="bg-amber-500 text-slate-950 font-medium text-xs px-4 py-2 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-md">
      <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
      <span>You are currently in Offline Mode. Showing cached data from local store.</span>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Role Ready | Multi-Role AI Career Intelligence Platform</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GlobalOfflineNotifier />
        <Outlet />
      </QueryClientProvider>
    </Provider>
  );
}
