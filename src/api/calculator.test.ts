import * as Calculator from './calculator';

const power = 24;
const current = 2;
const voltage = 12;
const resistance = 6;

describe('power', () => {
    it('can calculate power from voltage & current', () => {
        const actual = Calculator.calculatePower(current, voltage, undefined);

        expect(actual).toBe(power);
    });

    it('can calculate power from voltage & resistance', () => {
        const actual = Calculator.calculatePower(undefined, voltage, resistance);

        expect(actual).toBe(power);
    });

    it('can calculate power from current & resistance', () => {
        const actual = Calculator.calculatePower(current, undefined, resistance);

        expect(actual).toBe(power);
    });

    it('returns undefined when given one input', () => {
        const actual = Calculator.calculatePower(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = Calculator.calculatePower(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => Calculator.calculatePower(-1, undefined, undefined)).toThrow();
    });
});

describe('current', () => {
    it('can calculate current from voltage & resistance', () => {
        const actual = Calculator.calculateCurrent(undefined, voltage, resistance);

        expect(actual).toBe(current);
    });

    it('can calculate current from power & voltage', () => {
        const actual = Calculator.calculateCurrent(power, voltage, undefined);

        expect(actual).toBe(current);
    });

    it('can calculate current from power & resistance', () => {
        const actual = Calculator.calculateCurrent(power, undefined, resistance);

        expect(actual).toBe(current);
    });

    it('returns undefined when given one input', () => {
        const actual = Calculator.calculateCurrent(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = Calculator.calculateCurrent(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => Calculator.calculateCurrent(-1, undefined, undefined)).toThrow();
    });
});

describe('voltage', () => {
    it('can calculate voltage from current & resistance', () => {
        const actual = Calculator.calculateVoltage(undefined, current, resistance);

        expect(actual).toBe(voltage);
    });

    it('can calculate voltage from power & current', () => {
        const actual = Calculator.calculateVoltage(power, current, undefined);

        expect(actual).toBe(voltage);
    });

    it('can calculate voltage from power & resistance', () => {
        const actual = Calculator.calculateVoltage(power, undefined, resistance);

        expect(actual).toBe(voltage);
    });

    it('returns undefined when given one input', () => {
        const actual = Calculator.calculateVoltage(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = Calculator.calculateVoltage(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => Calculator.calculateVoltage(-1, undefined, undefined)).toThrow();
    });
});

describe('resistance', () => {
    it('can calculate resistance from voltage & current', () => {
        const actual = Calculator.calculateResistance(undefined, voltage, current);

        expect(actual).toBe(resistance);
    });

    it('can calculate resistance from power & voltage', () => {
        const actual = Calculator.calculateResistance(power, voltage, undefined);

        expect(actual).toBe(resistance);
    });

    it('can calculate resistance from power & current', () => {
        const actual = Calculator.calculateResistance(power, undefined, current);

        expect(actual).toBe(resistance);
    });

    it('returns undefined when given one input', () => {
        const actual = Calculator.calculateResistance(1, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('returns undefined when given no input', () => {
        const actual = Calculator.calculateResistance(undefined, undefined, undefined);

        expect(actual).toBeUndefined();
    });

    it('throws when given a negative input', () => {
        expect(() => Calculator.calculateResistance(-1, undefined, undefined)).toThrow();
    });
});