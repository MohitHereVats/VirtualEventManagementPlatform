const getUniqueId = () => {
    return Math.random().toString(36).slice(2,10) + Date.now().toString(36);
}

const isStringEqual = (str1, str2) => {
    return str1.toLowerCase() === str2.toLowerCase();
}

module.exports = {
    getUniqueId,
    isStringEqual,
};
