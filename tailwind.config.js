/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'birthday-blue': {
                    50: '#E6F3FF',
                    100: '#CCE7FF',
                    200: '#99CFFF',
                    300: '#66B7FF',
                    400: '#339FFF',
                    500: '#0087FF',
                },
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        },
    },
    plugins: [],
} 