'use strict';

const { execSync } = require('child_process');

const GIT_DESCRIBE = /^v?([0-9]+)\.([0-9]+)\.([0-9]+)-([0-9]+)-([a-z0-9]+)$/;

function gitBranch() {
    const buffer = execSync('git branch --show-current');
    return buffer.toString().trim();
}

function gitDescribe() {
    const buffer = execSync('git describe --tags --long');
    const string = buffer.toString().trim();
    const matches = GIT_DESCRIBE.exec(string);
    return {
        major: parseInt(matches[1]),
        minor: parseInt(matches[2]),
        patch: parseInt(matches[3]),
        tweak: parseInt(matches[4]),
        hash: matches[5]
    };
}

module.exports = {
    gitBranch: gitBranch,
    gitDescribe: gitDescribe
};