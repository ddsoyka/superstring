import * as math from './math';

describe('electrical', () => {
    it('can calculate power from voltage & current', () => {
        const expected = 24;
        const voltage = 12;
        const current = 2;
        const actual = math.calculatePower(current, voltage, undefined);

        expect(actual).toBe(expected);
    });
});