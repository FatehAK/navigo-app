const prettierCmd = `prettier --loglevel warn --cache --cache-strategy content --cache-location ./node_modules/.cache/.prettiercache --write`;
const stylelintCmd = `stylelint --max-warnings=0 --custom-formatter=node_modules/stylelint-formatter-pretty --aei --cache --cache-strategy content --cache-location ./node_modules/.cache/.stylelintcache --fix`;
const eslintCmd = `eslint --max-warnings=0 --format=pretty --cache --cache-strategy content --cache-location ./node_modules/.cache/.eslintcache --fix`;

module.exports = {
  '**/!(*styles).js': [eslintCmd, prettierCmd],
  '**/*.{styles.js,jsx}': [eslintCmd, stylelintCmd, prettierCmd],
  '**/*.html': [eslintCmd, stylelintCmd, prettierCmd],
  '**/*.css': [stylelintCmd, prettierCmd],
  '**/*.{md,json}': [prettierCmd],
};
