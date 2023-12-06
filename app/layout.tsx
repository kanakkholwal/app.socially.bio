import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Provider } from "./provider";



const dm_sans = DM_Sans({ subsets: ['latin'], preload: true })

export const metadata: Metadata = {
  title: 'Welcome to Socially Bio! - Socially Bio',
  description: 'Socially Bio is a free tool to help you manage multiple links for your social media accounts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <Provider>{children}</Provider>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              // "theme": {
              //   primary: 'green',
              //   secondary: 'black',
              // },
            },
          }}
        />
      </body>
    </html>
  )
}
