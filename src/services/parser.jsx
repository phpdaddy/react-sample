/**
 * Sample service
 */

export const normalizeFloat = (value) => !value || !value.length || value[value.length - 1] === '.' ?
    value : parseFloat(value)

export const parseBool = (value) =>
    value === 'true' ? true :
        (value === 'false' ? false :
                (value === '' || value === null ? null : value)
        )