import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import type { Route } from './+types/root'
import stylesheet from './app.css?url'

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* TODO: remove umami if not needed */}
        {import.meta.env.PROD && (
          <script
            defer
            src="https://a.mancuoj.me/script.js"
            data-website-id="411294ea-0e35-4747-aedc-299f363b0fa3"
          ></script>
        )}
        <Meta />
        <Links />
      </head>
      <body className="font-dm antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="flex flex-col items-center min-h-svh p-8 gap-5">
      <h1 className="text-3xl font-semibold">{message}</h1>
      <p className="text-lg">{details}</p>
      {stack && (
        <pre className="w-full mockup-code bg-base-300 text-base-content">
          <code className="text-xs p-5 font-medium">{stack}</code>
        </pre>
      )}
    </main>
  )
}
