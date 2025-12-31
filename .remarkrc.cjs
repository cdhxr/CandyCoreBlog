module.exports = {
  // Use MDX plugin then apply recommended lint rules.
  // Relax some strict rules that produce many warnings in this repo.
  plugins: [
    'remark-mdx',
    'remark-preset-lint-recommended',
    // Disable strict list-item indent checks (author prefers flexible indentation)
    [require('remark-lint-list-item-indent'), false],
    // Do not require final newline (optional for this project)
    [require('remark-lint-final-newline'), false],
    // Allow undefined reference occurrences (loose linking style across files)
    [require('remark-lint-no-undefined-references'), false],
  ],
};
