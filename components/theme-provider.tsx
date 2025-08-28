"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

// Default theme configuration
const DEFAULT_THEME_PROPS: Partial<ThemeProviderProps> = {
  attribute: "class",
  defaultTheme: "system",
  enableSystem: true,
  disableTransitionOnChange: true,
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Merge provided props with defaults (props override defaults)
  const mergedProps = React.useMemo(
      () => ({ ...DEFAULT_THEME_PROPS, ...props }),
      [props]
  );

  return (
      <NextThemesProvider {...mergedProps}>
        {children}
      </NextThemesProvider>
  );
}
