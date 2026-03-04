/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0A0A0A',
                    800: '#111111',
                    700: '#1A1A1A',
                    600: '#222222',
                    500: '#2A2A2A',
                },
                accent: {
                    DEFAULT: '#FF2B2B',
                    light: '#FF4C4C',
                    dark: '#CC2222',
                    glow: 'rgba(255, 43, 43, 0.3)',
                    subtle: 'rgba(255, 43, 43, 0.1)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            boxShadow: {
                'glow': '0 0 15px rgba(255, 43, 43, 0.3)',
                'glow-lg': '0 0 30px rgba(255, 43, 43, 0.4)',
                'glow-sm': '0 0 8px rgba(255, 43, 43, 0.2)',
                'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
            },
            animation: {
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.4s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
            },
            keyframes: {
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(255, 43, 43, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(255, 43, 43, 0.6)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
