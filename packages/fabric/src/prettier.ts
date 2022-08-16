export const prettier =  {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 140,
  endOfLine: 'lf',
  useTabs: false,
  tabWidth: 2,
  jsxSingleQuote: false,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.ejs',
      options: {
        parser: 'html',
      },
    },
  ],
}
