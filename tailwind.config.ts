import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Material 3 Expressive Tonal Hierarchy
        m3: {
          surface: "#FBF8F5",
          "surface-dim": "#DED9D2",
          "surface-bright": "#FBF8F5",
          "surface-container-lowest": "#FFFFFF",
          "surface-container-low": "#F5F2EC",
          "surface-container": "#EFECE6",
          "surface-container-high": "#EAE6DF",
          "surface-container-highest": "#E4E0D9",
          
          primary: "#7E5200",
          "on-primary": "#FFFFFF",
          "primary-container": "#FFDDB3",
          "on-primary-container": "#281700",
          
          secondary: "#705B40",
          "on-secondary": "#FFFFFF",
          "secondary-container": "#FBDEBC",
          "on-secondary-container": "#271905",
          
          tertiary: "#3D6284",
          "on-tertiary": "#FFFFFF",
          "tertiary-container": "#D1E4FF",
          "on-tertiary-container": "#001D36",
          
          error: "#BA1A1A",
          "on-error": "#FFFFFF",
          "error-container": "#FFDAD6",
          "on-error-container": "#410002",
          
          success: "#1B6D3C",
          "on-success": "#FFFFFF",
          "success-container": "#CDF5D4",
          "on-success-container": "#00210C",
          
          outline: "#817567",
          "outline-variant": "#D3C4B4",
        },
      },
      borderRadius: {
        "m3-xs": "4px",
        "m3-sm": "8px",
        "m3-md": "12px",
        "m3-lg": "16px",
        "m3-xl": "28px",
        "m3-full": "9999px",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "m3-1": "0px 1px 3px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        "m3-2": "0px 2px 6px 2px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)",
        "m3-3": "0px 4px 8px 3px rgba(0, 0, 0, 0.08), 0px 1px 3px 0px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
