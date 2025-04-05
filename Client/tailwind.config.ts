import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#56021F',    // Darkest burgundy
					light: '#7D1C4A',      // Dark burgundy
					dark: '#420516',       // Even darker shade
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#7D1C4A',    // Dark burgundy
					light: '#D17D98',      // Medium pink
					dark: '#56021F',       // Darkest burgundy
					foreground: '#FFFFFF'
				},
				accent: {
					DEFAULT: '#D17D98',    // Medium pink
					light: '#F4CCE9',      // Light pink
					dark: '#7D1C4A',       // Dark burgundy
					foreground: '#FFFFFF'
				},
				highlight: {
					DEFAULT: '#F4CCE9',    // Light pink
					light: '#FFFFFF',      // White
					dark: '#D17D98',       // Medium pink
					foreground: '#56021F'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Color palette from the image
				palette: {
					darkest: '#56021F',    // rgb(86, 2, 31)
					dark: '#7D1C4A',       // rgb(125, 28, 74)
					medium: '#D17D98',      // rgb(209, 125, 152)
					light: '#F4CCE9'       // rgb(244, 204, 233)
				},
				// HabitNation custom colors
				'habit-purple': '#8B5CF6',
				'habit-blue': '#0EA5E9',
				'habit-teal': '#14B8A6',
				'habit-pink': '#D946EF',
				'habit-orange': '#F97316',
				'habit-gray': '#6B7280',
				'habit-dark': '#1A1F2C',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				bounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				shine: {
					'0%': { backgroundPosition: '200% center' },
					'100%': { backgroundPosition: '-200% center' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-slow': 'bounce 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shine': 'shine 8s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(120deg, #8B5CF6 0%, #0EA5E9 100%)',
				'card-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #0EA5E9 100%)',
				'shine-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
