const transformer = require('./babelTransform');

const IMPORTS = new RegExp(/import(?:["'\s]*([\w*{}\n, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/, 'mg')

function parseImports(src) {
    const imports = [];

    src.match(IMPORTS).map(match => imports.push(match));

    return {
        code: src.replace(IMPORTS, ''),
        imports: imports
    };
}

function wrap(src) {
    const { code, imports } = parseImports(src);
    const template = `
const mitt = require('mitt');
${imports.join('\n')}
export default class WebWorker {
    constructor () {
        let inside = mitt();
        let outside = mitt();

        let self = {};

        self.addEventListener = outside.on;
        self.removeEventListener = outside.off;
        self.dispatchEvent = outside.emit;
        self.postMessage = data => {
            inside.emit('message', { data });
        };
        self.terminate = () => {
            console.warn('Warning: this method is not supported yet');
        };

        this.onmessage = null;
        this.onerror = null;
        this.dispatchEvent = inside.emit;
        this.addEventListener = inside.on;
        this.removeEventListener = inside.off;
        this.postMessage = (data) => {
            outside.emit('message', { data });
        };

        inside.on('message', e => {
            if (this.onmessage) this.onmessage(e);
        });
        inside.on('error', e => {
            if (this.onerror) this.onerror(e);
        });

        let onmessage = this.main(self, self.addEventListener, self.removeEventListener, self.dispatchEvent, self.postMessage, self.terminate);

        outside.on('message', async e => {
            try {
                if (onmessage) await onmessage(e);
            }
            catch (error) {
                inside.emit('error', { error });
            }
        });
    }
    main(self, addEventListener, removeEventListener, dispatchEvent, postMessage, terminate) {
        ${code.replace(/\n/g, '\n    ')}
        return onmessage || self.onmessage
    }
}
`;
    return template.trim();
}

module.exports = {
    process(src, filename, config, options) {
        const wrapped = wrap(src);
        return transformer.process(wrapped, filename, config, { ...options, instrument: false });
    }
};