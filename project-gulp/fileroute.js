let DIR = {
  SRC: './src',
  DEST: './dest',
  BUILD: './build/'
};

let PATH = {
  DIR: DIR,
  SRC: {
    JS: `${DIR.SRC}/js/**/*.js`,
    SCSS: `${DIR.SRC}/scss/**/*.scss`,
    HTML: `${DIR.SRC}/**/*.html`
  },
  DEST: {
    JS: `${DIR.DEST}/js`,
    CSS: `${DIR.DEST}/css`,
    HTML: `${DIR.DEST}/`
  }
};

module.exports = { DIR, PATH };
