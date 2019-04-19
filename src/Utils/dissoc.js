const dissoc = function dissoc(prop, obj) {
    let result = {};

    for (let p in obj) {
        result[p] = obj[p];
    }

    delete result[prop];
    return result;
};

export default dissoc;