/** @type {import('tailwindcss').Config} */

export default {
 
  content: ['./index.html', './src/**/*.{js,jsx}'],
  
  theme: {
    
    extend: {
     
      colors: {
     
        brand: {
          50: '#F4F1FA',
          100: '#E8E1F5',
          200: '#D1C2EC',
          300: '#B39DDF',
          400: '#8F73CC',
          500: '#6E4FB8',
          600: '#553A9C',
          700: '#442E80',
          800: '#372466',
          900: '#2A1B4F',
        },
       
        surface: '#FAFAFB',
       
        amber: {
          alert: '#D97706',
        },

      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.05), 0 8px 24px -8px rgba(85,58,156,0.10)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 16px 40px -12px rgba(85,58,156,0.18)',
        modal: '0 24px 64px -12px rgba(15, 23, 42, 0.25)',
      },

      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      keyframes: {
        
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },

      },

    },

  },

  plugins: [],
  
}