module.exports = {
  content: ['./src/**/*.{js, jsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif']
      },
      borderRadius: {
        circle: '50%'
      },
      colors: {
        primary: '#1B73E8',
        hover: '#053A80',
        hover2: '#f3f7fc',
        background: '#fafafa',
        red: '#de3929',
        sidebar: '#F4F4F4',
        active: '#E2E6EB',
        hovercancel: '#9B1A1B',
        cancel: '#9B1A1A',
        get: '#008B8B',
        create: '#228B22',
        delete: '#de3929',
        update: '#191970'
      },
      boxShadow: {
        main: '0px 0px 6px 4px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: []
};
