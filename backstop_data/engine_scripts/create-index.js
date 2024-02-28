/**
 * Runs the create-index.js script before the Search Results scenario. Without this,
 * the search index is not available within the BackstopJS Docker container.
 */

const { exec } = require('child_process');

function runScript(scriptPath, callback) {
    // Execute the script
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (callback) {
            callback();
        }
    });
}

module.exports = async (page, scenario, vp, isReference) => {
  await require('./puppet/loadCookies')(page, scenario);

  // Run create-index.js from site build within Docker container
  runScript('/src/_site/js/create-index.js', () => {
      console.log('create-index script complete');
  });
};

