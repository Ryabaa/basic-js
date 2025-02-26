const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
    if (Array.isArray(arr) !== true) {
        throw new NotImplementedError("'arr' parameter must be an instance of the Array!");
    }
    const methods = ["--discard-next", "--discard-prev", "--double-next", "--double-prev"];
    let currentMethod = { method: "", index: null };
    let newArr = [...arr];

    methods.forEach((method) => {
        const methodIndex = arr.findIndex((el) => el === method);
        if (methodIndex !== -1) {
            currentMethod.method = method;
            currentMethod.index = methodIndex;
        }
    });

    const handleTransform = (index, delCount, newEl, element, method) => {
        if (element !== undefined) {
            if (newEl === null) newArr.splice(index, delCount);
            if (newEl !== null) newArr.splice(index, delCount, newEl);
        } else {
            newArr.splice(method, 1);
        }
    };

    const index = currentMethod.index;
    switch (currentMethod.method) {
        case "--discard-next":
            handleTransform(index, 2, null, newArr[index + 1], index);
            break;
        case "--discard-prev":
            handleTransform(index - 1, 2, null, newArr[index - 1], index);
            break;
        case "--double-next":
            handleTransform(index, 1, newArr[index + 1], newArr[index + 1], index);
            break;
        case "--double-prev":
            handleTransform(index, 1, newArr[index - 1], newArr[index - 1], index);
            break;

        default:
            break;
    }

    return newArr;
}

module.exports = {
    transform,
};
