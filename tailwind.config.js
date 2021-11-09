const primaryColors = {
  light: '#31314d',
  DEFAULT: '#1F203E',
  dark: '#171830',
};

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
        'primary': primaryColors,
        'primary-400': '#4C5880',
        'primary-500': '#132356',
        'primary-600': '#2f304c',
        'primary-650': '#31314d',
        'primary-700': '#292a4d',
        'primary-800': '#1F203E',
        'primary-900': '#171830',
        'primary-gray-50': '#f2f2f4',
        'primary-gray-100': '#f3f3f354',
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
        p: ['#59C8D1 0%', '#75F16D 100%'],
      },
      background: {
        'bg': primaryColors.DEFAULT,
        'bg-light': primaryColors.light,
        'bg-dark': primaryColors.dark,
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
