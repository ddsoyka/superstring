'use strict';

const { execSync } = require('child_process');

const GIT_DESCRIBE = /^v?([0-9]+)\.([0-9]+)\.([0-9]+)-([0-9]+)-([a-z0-9]+)$/;
const GIT_NAME_REV = /^tags\/(v?(?:[0-9.]+)+)\^[0-9]+$/;

function gitNameRev() {
    try {
        const buffer = execSync('git name-rev --name-only HEAD');
        const string = buffer.toString().trim();
        const matches = GIT_NAME_REV.exec(string);
        
        if (matches) return matches[1];
        else return string;
    }
    catch (error) {
        return undefined;
    }
}

function gitDescribe() {
    try {
        const buffer = execSync('git describe --tags --long');
        const string = buffer.toString().trim();
        const matches = GIT_DESCRIBE.exec(string);
        return {
            major: parseInt(matches[1]),
            minor: parseInt(matches[2]),
            patch: parseInt(matches[3]),
            tweak: parseInt(matches[4]),
            commit: matches[5]
        };
    }
    catch (error) {
        return undefined;
    }
}

module.exports = {
    gitNameRev: gitNameRev,
    gitDescribe: gitDescribe
};