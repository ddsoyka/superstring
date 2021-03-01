import React from 'react';

type NullableBlob = Blob | null;
type SetValue = (value: NullableBlob) => void;

/**
 * A custom hook which automatically handles allocating and revoking object URLs.
 * 
 * @param initialState The value to use for the initial state.
 */
const useImageBlob = (): [string, NullableBlob, SetValue] => {
    // State Hooks
    const [url, setURL] = React.useState("");
    const [blob, setBlob] = React.useState<NullableBlob>(null);

    // State Mutator Function
    const setValue = (value: NullableBlob) => {
        if (url.length > 0) URL.revokeObjectURL(url);
        if (!value) {
            setURL("");
            setBlob(null);
        }
        else {
            setURL(URL.createObjectURL(value));
            setBlob(value);
        }
    }

    return [url, blob, setValue];
};

export default useImageBlob;