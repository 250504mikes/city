
export default {
  basePath: '/proyecto-City-explorer-front-end',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
