// .angular + svg .outer {
//   stroke: #D32F2F;
// }
// .aws + svg .outer {
//   stroke: #37474F;
// }
// .backend + svg .outer {
//   stroke: #AA00FF;
// }
// .bash + svg .outer {
//   stroke: #3E2723;
// }
// .c + svg .outer {
//   stroke: #03A9F4;
// }
// .csharp + svg .outer {
//   stroke: #E040FB;
// }
// .cplusplus + svg .outer {
//   stroke: #01579B;
// }
// .css + svg .outer {
//   stroke: #64B5F6;
// }
// .docker + svg .outer {
//   stroke: #00B0FF;
// }
// .frontend + svg .outer {
//   stroke: #FFEE58;
// }
// .go + svg .outer {
//   stroke: #0097A7;
// }
// .graphql + svg .outer {
//   stroke: #BA68C8;
// }
// .groovy + svg .outer {
//   stroke: #90CAF9;
// }
// .haskell + svg .outer {
//   stroke: #EA80FC;
// }
// .html + svg .outer {
//   stroke: #FF7043;
// }
// .java + svg .outer {
//   stroke: #D32F2F;
// }
// .javascript + svg .outer {
//   stroke: #FFEB3B;
// }
// .kubernetes + svg .outer {
//   stroke: #2979FF;
// }
// .mongodb + svg .outer {
//   stroke: #2979FF;
// }
// .mysql + svg .outer {
//   stroke: #64B5F6;
// }
// .nodejs + svg .outer {
//   stroke: #1B5E20;
// }
// .perl + svg .outer {
//   stroke: #212121;
// }
// .php + svg .outer {
//   stroke: #CE93D8;
// }
// .postgres + svg .outer {
//   stroke: #3D5AFE;
// }
// .python + svg .outer {
//   stroke: #303F9F;
// }
// .react + svg .outer {
//   stroke: #0288D1;
// }
// .redis + svg .outer {
//   stroke: #F44336;
// }
// .redux + svg .outer {
//   stroke: #E040FB;
// }
// .restApi + svg .outer {
//   stroke: #6A1B9A;
// }
// .ruby + svg .outer {
//   stroke: #D50000;
// }
// .rust + svg .outer {
//   stroke: #8D6E63;
// }
// .typescript + svg .outer {
//   stroke: #00E5FF;
// }
// .vue + svg .outer {
//   stroke: #00E676;
// }
export const SKILLS = {
  ruby: { img: "ruby.png", colorStroke: "#D50000" },
  javascript: { img: "javascript.png", colorStroke: "#FFEB3B" },
  python: { img: "python.png", colorStroke: "#303F9F" },
  html: { img: "html.png", colorStroke: "#FF7043" },
  css: { img: "css.png", colorStroke: "#64B5F6" },
  react: { img: "react.png", colorStroke: "#0288D1" },
  angular: { img: "angular.png", colorStroke: "#D32F2F" },
  "c++": { img: "cplusplus.png", colorStroke: "#01579B" },
  graphql: { img: "graphql.png", colorStroke: "#BA68C8" },
  typescript: { img: "typescript.png", colorStroke: "#00E5FF" },
  frontend: { img: "frontend.png", colorStroke: "#FFEE58" },
  backend: { img: "backend.png", colorStroke: "#AA00FF" },
  "rest api": { img: "restApi.png", colorStroke: "#6A1B9A" },
  postgres: { img: "postgres.png", colorStroke: "#3D5AFE" },
  redis: { img: "redis.png", colorStroke: "#F44336" },
  aws: { img: "aws.png", colorStroke: "#37474F" },
  docker: { img: "docker.png", colorStroke: "#00B0FF" },
  mysql: { img: "mysql.png", colorStroke: "#64B5F6" },
  mongodb: { img: "mongodb.png", colorStroke: "#2979FF" },
  kubernetes: { img: "kubernetes.png", colorStroke: "#2979FF" },
  nodejs: { img: "nodejs.png", colorStroke: "#1B5E20" },
  java: { img: "java.png", colorStroke: "#D32F2F" },
  php: { img: "php.png", colorStroke: "#CE93D8" },
  "c#": { img: "csharp.png", colorStroke: "#E040FB" },
  c: { img: "c.png", colorStroke: "#03A9F4" },
  vue: { img: "vue.png", colorStroke: "#00E676" },
  redux: { img: "redux.png", colorStroke: "#E040FB" },
  go: { img: "go.png", colorStroke: "#0097A7" },
  rust: { img: "rust.png", colorStroke: "#8D6E63" },
  perl: { img: "perl.png", colorStroke: "#212121" },
  haskell: { img: "haskell.png", colorStroke: "#EA80FC" },
  bash: { img: "bash.png", colorStroke: "#3E2723" },
  groovy: { img: "groovy.png", colorStroke: "#90CAF9" },
  clojure: { img: "clojure.png", colorStroke: "" },
  swift: { img: "swift.png", colorStroke: "" },
};

export const COLORS = {
  text: "white",
  background: "hsl(97deg 13% 80%)",
  background_fade: "hsl(165deg 19% 40% / 0.85)",
  primary: "hsl(165deg 19% 40%)",
  primary_fade: "hsl(165deg 19% 40% / 0.85)",
  primary_fade_strong: "hsl(165deg 19% 40% / 0.35)",
  secondary: "hsl(113deg 18% 59%)",
  secondary_fade: "hsl(113deg 18% 59% / 0.85)",
  tertiary: "hsl(201deg 20% 23%)",
  tertiary_fade: "hsl(201deg 20% 23% / 0.85)",
  light: "hsl(97deg 13% 80%)",
  light_fade: "hsl(165deg 19% 40% / 0.85)",
  info: "hsl(201deg 47% 30%)",
  gray: {
    100: "hsl(0deg 0% 90%)",
    200: "hsl(0deg 0% 80%)",
    300: "hsl(0deg 0% 70%)",
    400: "hsl(0deg 0% 60%)",
    500: "hsl(0deg 0% 50%)",
    600: "hsl(0deg 0% 40%)",
    700: "hsl(0deg 0% 30%)",
    800: "hsl(0deg 0% 20%)",
    900: "hsl(0deg 0% 10%)",
  },
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  laptop: 900, // height because low budget laptops or something
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-height: ${BREAKPOINTS.laptop / 16}rem)`, // very weird
  motion: `(prefers-reduced-motion: no-preference)`,
};

export const FONT_FACES = `
/* latin-ext */
@font-face {
  font-family: "Bebas Neue";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/bebasneue/v9/JTUSjIg69CK48gW7PXoo9Wdhyzbi.woff2)
    format("woff2");
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
    U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Bebas Neue";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/bebasneue/v9/JTUSjIg69CK48gW7PXoo9Wlhyw.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

/* latin-ext */
@font-face {
  font-family: 'Titillium Web';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPFcZTIAOhVxoMyOr9n_E7fdMbepI5Db5yciWM.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titillium Web';
  font-style: italic;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPFcZTIAOhVxoMyOr9n_E7fdMbepI5DYZyc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Titillium Web';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPAcZTIAOhVxoMyOr9n_E7fdMbWAaxWXr0.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titillium Web';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPAcZTIAOhVxoMyOr9n_E7fdMbWD6xW.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Titillium Web';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPFcZTIAOhVxoMyOr9n_E7fdMbetIlDb5yciWM.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titillium Web';
  font-style: italic;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPFcZTIAOhVxoMyOr9n_E7fdMbetIlDYZyc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffGjEGIVzY4SY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffGjEGItzYw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPecZTIAOhVxoMyOr9n_E7fdM3mDbRS.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPecZTIAOhVxoMyOr9n_E7fdMPmDQ.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffHjDGIVzY4SY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Titillium Web';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/titilliumweb/v15/NaPDcZTIAOhVxoMyOr9n_E7ffHjDGItzYw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

`;
