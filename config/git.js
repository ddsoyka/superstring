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
        major: matches[1],
        minor: matches[2],
        patch: matches[3],
        tweak: matches[4],
        hash: matches[5]
    };
}

module.exports = {
    gitBranch: gitBranch,
    gitDescribe: gitDescribe
};