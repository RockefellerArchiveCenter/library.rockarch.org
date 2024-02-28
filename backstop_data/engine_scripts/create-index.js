/**
 * Runs the create-index.js script before the Search Results scenario to automate
 * rebuilding the index for each test.
 */

const { exec } = require('child_process');

function runScript(scriptPath) {
    return new Promise((resolve, reject) => {
        exec(`node ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = async (page, scenario, vp, isReference) => {
    await require('./puppet/loadCookies')(page, scenario);

    try {
        // Run create-index.js from site build within Docker container
        await runScript('./js/create-index.js');
        console.log('New search index file created');
    } catch (error) {
        console.error('Error running script:', error);
    }
};
