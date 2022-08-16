module.exports = {
  extends: [require.resolve('./packages/fabric/lib/eslint')],
  rules: {
    'react/require-default-props': 0,
    'no-console': "warn",
    'prefer-rest-params': 0,
  },
};
