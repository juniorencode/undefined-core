// plugins/scrollbar.js
import plugin from 'tailwindcss/plugin';

export default plugin(function ({ addBase, addUtilities }) {
  addBase({
    '::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
      backgroundColor: 'transparent'
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'transparent'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#999',
      borderRadius: '2px'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#666'
    },
    'input[type="number"]': {
      appearance: 'textfield',
      '-moz-appearance': 'textfield'
    },
    'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
      {
        '-webkit-appearance': 'none',
        appearance: 'none',
        margin: '0'
      },
    'input[type="checkbox"]': {
      appearance: 'none'
    },
    'input[type="checkbox"]:checked': {
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'%3E%3Cpath stroke='%23fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M1 5.917 5.724 10.5 15 1.5'/%3E%3C/svg%3E\")",
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1em 1em'
    }
  });

  addUtilities({
    '.shadow-top': {
      boxShadow: '0 -16px 60px 2px var(--tw-shadow-color, rgba(0, 0, 0, 0.4))'
    },
    '.shadow-left': {
      boxShadow: '-16px 0 60px 2px var(--tw-shadow-color, rgba(0, 0, 0, 0.4))'
    },
    '.shadow-right': {
      boxShadow: '16px 0 60px 2px var(--tw-shadow-color, rgba(0, 0, 0, 0.4))'
    },
    '.shadow-bottom': {
      boxShadow: '0 16px 60px 2px var(--tw-shadow-color, rgba(0, 0, 0, 0.4))'
    },
    '.border-special': {
      border: 'solid',
      borderImageSlice: '1',
      borderWidth: '16px',
      borderImageSource:
        'linear-gradient(to right, transparent 0%, rgba(0, 0, 0, var(--tw-border-opacity)) 2%)',
      borderTopWidth: '0',
      borderRightWidth: '0',
      borderBottomWidth: '0'
    }
  });
});
