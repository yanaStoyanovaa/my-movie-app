// app/layout.tsx
"use client"; 
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/theme'; // Assuming your custom theme is in src/theme

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{height: "100vh"}}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline ensures consistent baseline styling */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
