type BaseBabelConfig = {
  presets: Array<any>;
  plugins: Array<string | Array<any> | Function>;
};

const config: BaseBabelConfig = {
  presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        proposals: true,
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ],
};

export default config;
