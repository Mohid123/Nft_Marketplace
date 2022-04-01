module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.TAILWIND_MODE === 'build',
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#1F203E',
        'primary-nodechain': '#F1B11D',
        primary: {
          '400': '#4C5880',
          '500': '#132356',
          '600': '#2f304c',
          '650': '#31314d',
          '700': '#292a4d',
          '800': '#1F203E',
          '900': '#171830',
        },
        'primary-gray' :{
          '50': '#f2f2f4',
          '100': '#f3f3f354',
          '200': '#F6F6F8',
          '300': '#f8f8fa',
          '400': '#F4F4F5',
          '600': '#D9DBE0',
        }
      },
      width: {
        '35': '35%',
        '38': '38%',
        '62': '62%',
        '65': '65%',
      }
    },
    fontFamily: {
      display: ['roboto', 'sans-serif'],
      body: ['roboto', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    extends: {
      color: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',
      },
    },
    linearBorderGradients: {
      directions: {
        // defaults to these values
        dp: '109deg',
        t: 'to top',
        tr: 'to top right',
        r: 'to right',
        br: 'to bottom right',
        b: 'to bottom',
        bl: 'to bottom left',
        l: 'to left',
        tl: 'to top left',
      },
      colors: {
        p: ['#FFB937 0%', '#D59629 100%'],
      },
      background: {
        'bg': '#FFFFFF',
        'bg-light': '#FFFFFF',
        'bg-dark': '#FFFFFF',
      },
      border: {
        // defaults to these values (optional)
        1: '1px',
        2: '2px',
        4: '4px',
      },
    },
  },
  variants: {
    linearBorderGradients: ['responsive', 'hover', 'dark'], // defaults to ['responsive']
  },
  plugins: [require('tailwindcss-border-gradient-radius')],
};
