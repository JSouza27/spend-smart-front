module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/stories.tsx"
  ],
  "addons": [
    "@storybook/addon-essentials",

  ],
  webpackFinal: (config) => {
    config.resolve.modules.push('../src')
    return config
  }
}
