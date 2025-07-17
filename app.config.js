
module.exports = {
  name: 'NV',
  slug: 'mynewapp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  splash: {
    image: './assets/images/logo.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  updates: {
    fallbackToCacheTimeout: 0,
    url: 'https://u.expo.dev/4e974f7b-03a8-43c4-b7a1-fe7a59c188d5',
  },
  runtimeVersion: {
  policy: 'appVersion',
},
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    package: "com.nvapp.nv",
    adaptiveIcon: {
      foregroundImage: './assets/images/logo.png',
      backgroundColor: '#000000',
    },
  },
  web: {
    favicon: './assets/images/logo.png',
  },
  extra: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    "eas": {
        "projectId": "4e974f7b-03a8-43c4-b7a1-fe7a59c188d5"
      }
  },
};