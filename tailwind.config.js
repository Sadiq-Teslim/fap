/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'primary-light': '#60A5FA',
        'primary-dark': '#2563EB',
        'secondary': '#1E40AF',
        'accent': '#10B981',
        'accent-light': '#34D399',
        'accent-dark': '#059669',
        'teal': '#14B8A6',
        'success': '#34D399',
        'warning': '#FBBF24',
        'danger': '#F87171',
        'navy': '#0B1121',
        'navy-light': '#111927',
        'navy-mid': '#162032',
        'navy-border': '#1F2B3D',
        'navy-surface': '#1A2538',
        'neutral-dark': '#0B1121',
        'neutral-light': '#0E1728',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, #0B1121 0%, #0F1A2E 50%, #111927 100%)',
        'gradient-section': 'linear-gradient(180deg, #0E1728 0%, #111927 100%)',
        'gradient-card': 'linear-gradient(135deg, #111927 0%, #1A2538 100%)',
        'gradient-accent': 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        'gradient-cta': 'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)',
        'gradient-cta-blue': 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-lg': '0 0 40px rgba(16, 185, 129, 0.25)',
        'glow-sm': '0 0 10px rgba(16, 185, 129, 0.15)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(16, 185, 129, 0.12)',
        'card-hover-blue': '0 8px 40px rgba(59, 130, 246, 0.12)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
