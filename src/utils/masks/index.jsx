export const CNPJMask = (value) => {
    let valueMask = value.toString();
    switch (valueMask.length) {
        case 10:
            valueMask = `${valueMask}0001`;
            break;
        case 11:
            const lastChar = valueMask.slice(-1);
            valueMask = (/([0-9])/.test(lastChar)) ? `${valueMask.slice(0,10)}0001${lastChar}` : valueMask;
            break;
        case 14:
            valueMask = valueMask.replace('/000', '');
            break;
    
        default:
            break;
    }
    value = valueMask
        .replace(/\D+/g, '')
        .replace(/([0-9]{2})(\d)/, '$1.$2')
        .replace(/([0-9]{3})(\d)/, '$1.$2')
        .replace(/([0-9]{3})(\d)/, '$1/$2')
        .replace(/([0-9]{4})(\d)/, '$1-$2')
        .replace(/(-[0-9]{2})\d+?$/, '$1');
    
    return value;
};