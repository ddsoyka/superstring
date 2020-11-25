const NEGATIVE_INPUT_MESSAGE = 'Input values must not be negative';

export const calculatePower = (current: number | undefined, voltage: number | undefined, resistance: number | undefined): number | undefined => {
    if (current && current < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (voltage && voltage < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (resistance && resistance < 0) throw Error(NEGATIVE_INPUT_MESSAGE);

    if (voltage && current) return voltage * current;
    if (voltage && resistance) return (voltage ** 2) / resistance;
    if (current && resistance) return (current ** 2) * resistance;

    return undefined;
};

export const calculateCurrent = (power: number | undefined, voltage: number | undefined, resistance: number | undefined): number | undefined => {
    if (power && power < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (voltage && voltage < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (resistance && resistance < 0) throw Error(NEGATIVE_INPUT_MESSAGE);

    if (voltage && resistance) return voltage / resistance;
    if (power && voltage) return power / voltage;
    if (power && resistance) return Math.sqrt(power / resistance);

    return undefined;
};

export const calculateVoltage = (power: number | undefined, current: number | undefined, resistance: number | undefined): number | undefined => {
    if (power && power < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (current && current < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (resistance && resistance < 0) throw Error(NEGATIVE_INPUT_MESSAGE);

    if (current && resistance) return current * resistance;
    if (power && current) return power / current;
    if (power && resistance) return Math.sqrt(power * resistance);

    return undefined;
};

export const calculateResistance = (power: number | undefined, voltage: number | undefined, current: number | undefined): number | undefined => {
    if (power && power < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (voltage && voltage < 0) throw Error(NEGATIVE_INPUT_MESSAGE);
    if (current && current < 0) throw Error(NEGATIVE_INPUT_MESSAGE);

    if (voltage && current) return voltage / current;
    if (voltage && power) return (voltage ** 2) / power;
    if (power && current) return power / (current ** 2);

    return undefined;
};