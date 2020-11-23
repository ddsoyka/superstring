import * as math from './math';

const power = 24;
const current = 2;
const voltage = 12;
const resistance = 6;

describe('power', () => {
    it('can calculate power from voltage & current', () => {
        const actual = math.calculatePower(current, voltage, undefined);

        expect(actual).toBe(power);
    });

    it('can calculate power from voltage & resistance', () => {
        const actual = math.calculatePower(undefined, voltage, resistance);

        expect(actual).toBe(power);
    });

    it('can calculate power from current & resistance', () => {
        const actual = math.calculatePower(current, undefined, resistance);

        expect(actual).toBe(power);
    });

    it('returns undefined when given one input', () => {
        const actual = math.calculatePower(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = math.calculatePower(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => math.calculatePower(-1, undefined, undefined)).toThrow();
    });
});

describe('current', () => {
    it('can calculate current from voltage & resistance', () => {
        const actual = math.calculateCurrent(undefined, voltage, resistance);

        expect(actual).toBe(current);
    });

    it('can calculate current from power & voltage', () => {
        const actual = math.calculateCurrent(power, voltage, undefined);

        expect(actual).toBe(current);
    });

    it('can calculate current from power & resistance', () => {
        const actual = math.calculateCurrent(power, undefined, resistance);

        expect(actual).toBe(current);
    });

    it('returns undefined when given one input', () => {
        const actual = math.calculateCurrent(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = math.calculateCurrent(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => math.calculateCurrent(-1, undefined, undefined)).toThrow();
    });
});

describe('voltage', () => {
    it('can calculate voltage from current & resistance', () => {
        const actual = math.calculateVoltage(undefined, current, resistance);

        expect(actual).toBe(voltage);
    });

    it('can calculate voltage from power & current', () => {
        const actual = math.calculateVoltage(power, current, undefined);

        expect(actual).toBe(voltage);
    });

    it('can calculate voltage from power & resistance', () => {
        const actual = math.calculateVoltage(power, undefined, resistance);

        expect(actual).toBe(voltage);
    });

    it('returns undefined when given one input', () => {
        const actual = math.calculateVoltage(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = math.calculateVoltage(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => math.calculateVoltage(-1, undefined, undefined)).toThrow();
    });
});

describe('resistance', () => {
    it('can calculate resistance from voltage & current', () => {
        const actual = math.calculateResistance(undefined, voltage, current);

        expect(actual).toBe(resistance);
    });

    it('can calculate resistance from power & voltage', () => {
        const actual = math.calculateResistance(power, voltage, undefined);

        expect(actual).toBe(resistance);
    });

    it('can calculate resistance from power & current', () => {
        const actual = math.calculateResistance(power, undefined, current);

        expect(actual).toBe(resistance);
    });

    it('returns undefined when given one input', () => {
        const actual = math.calculateResistance(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = math.calculateResistance(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => math.calculateResistance(-1, undefined, undefined)).toThrow();
    });
});