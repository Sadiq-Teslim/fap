/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB',
        'primary-light': '#3B82F6',
        'primary-dark': '#1E40AF',
        'secondary': '#1F2937',
        'accent': '#60A5FA',
        'accent-light': '#93C5FD',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
        'dark-bg': '#0F1419',
        'dark-card': '#1A202C',
        'dark-border': '#2D3748',
        'neutral-dark': '#111827',
        'neutral-light': '#F8F9FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #0F1419 0%, #1E3A8A 50%, #2563EB 100%)',
        'gradient-teal': 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
        'gradient-slate': 'linear-gradient(135deg, #334155 0%, #475569 100%)',
        'gradient-indigo': 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
        'gradient-violet': 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)',
        'gradient-warm': 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(37, 99, 235, 0.5)',
        'glow-lg': '0 0 40px rgba(37, 99, 235, 0.4)',
        'glow-teal': '0 0 20px rgba(13, 148, 136, 0.5)',
        'glow-cyan': '0 0 20px rgba(96, 165, 250, 0.5)',
      },
    },
  },
  plugins: [],
}
