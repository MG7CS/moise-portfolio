/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const fs = require('fs-extra');

exports.createPages = async () => {};

// If `.cache` is corrupted (e.g. interrupted dev server), `copy gatsby files` can leave
// `.cache/loading-indicator` missing while `app.js` still imports it — webpack then fails.
// Repair from the Gatsby package before the dev bundle compiles.
exports.onPostBootstrap = async ({ reporter }) => {
  const src = path.join(__dirname, 'node_modules/gatsby/cache-dir/loading-indicator');
  const dest = path.join(__dirname, '.cache/loading-indicator');
  const marker = path.join(dest, 'indicator.js');

  try {
    if ((await fs.pathExists(src)) && !(await fs.pathExists(marker))) {
      await fs.copy(src, dest);
      reporter.info('Restored missing .cache/loading-indicator from Gatsby’s cache-dir.');
    }
  } catch (err) {
    reporter.warn(`Could not restore .cache/loading-indicator: ${err.message}`);
  }
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      cover: File @fileByRelativePath
    }
  `);
};
