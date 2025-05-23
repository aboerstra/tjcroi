/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                // Faye Primary Brand Colors
                blueberry: {
                    DEFAULT: '#38003C',
                    light: '#4A0050',
                    dark: '#2A002D',
                    accent: '#500057'
                },
                green: {
                    DEFAULT: '#16815A',
                    light: '#1A9B6C',
                    dark: '#126748',
                    accent: '#14734F'
                },
                grey: {
                    DEFAULT: '#ACACAC',
                    light: '#D1D1D1',
                    dark: '#8A8A8A',
                    accent: '#666666'
                },
                white: '#FFFFFF',
                
                // Faye Secondary "Techno" Colors
                'tech-violet': {
                    DEFAULT: '#7A39ED',
                    light: '#9B6AF2',
                    dark: '#5B1ED9',
                    accent: '#4A0FC8'
                },
                'tech-pink': {
                    DEFAULT: '#FFADDE',
                    light: '#FFC4E7',
                    dark: '#FF96D5',
                    accent: '#FF7FCC'
                },
                'tech-teal': {
                    DEFAULT: '#04DFC6',
                    light: '#20E8D2',
                    dark: '#03C6AF',
                    accent: '#02AD99'
                },
                'tech-lime': {
                    DEFAULT: '#B2F000',
                    light: '#C4F533',
                    dark: '#A0D800',
                    accent: '#8EC000'
                },
                'tech-blue': {
                    DEFAULT: '#1200F1',
                    light: '#2E1FF3',
                    dark: '#0F00D9',
                    accent: '#0C00C2'
                },
                
                // Legacy Colors
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                primary: '#38003C',
                secondary: '#16815A',
            },
            backgroundImage: {
                'gradient-faye': 'linear-gradient(135deg, #38003C 0%, #4A0050 100%)',
                'gradient-faye-accent': 'linear-gradient(135deg, #500057 0%, #38003C 100%)',
                'gradient-green': 'linear-gradient(135deg, #16815A 0%, #1A9B6C 100%)',
                'gradient-tech': 'linear-gradient(135deg, #7A39ED 0%, #1200F1 100%)',
                'gradient-tech-accent': 'linear-gradient(135deg, #FFADDE 0%, #04DFC6 100%)'
            },
            fontFamily: {
                'f37-judge': ['F37 Judge Condensed', 'sans-serif'],
                'agrandir': ['Agrandir', 'sans-serif'],
                'agrandir-wide': ['Agrandir Wide Light', 'sans-serif']
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [],
}

