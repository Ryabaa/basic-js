const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 *
 * @example
 *
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
    calculateDepth(a) {
        let depth = 1;
        function loop(arr) {
            const findIndex = arr.findIndex((el) => Array.isArray(el) === true);
            if (findIndex !== -1) {
                depth++;
                arr.forEach((el) => {
                    if (Array.isArray(el) === true) {
                        loop(el);
                    }
                });
            }
            return;
        }
        loop(a);
        return depth;
    }
}

module.exports = {
    DepthCalculator,
};
