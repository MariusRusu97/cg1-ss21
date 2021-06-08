"use strict";
/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectOr = exports.checkEqual = void 0;
const jest_diff_1 = __importDefault(require("jest-diff"));
const mat_1 = require("../src/linalg/mat");
const utils_1 = require("../src/linalg/utils");
const vec_1 = require("../src/linalg/vec");
/**
 * checkEqual implements an approximate equal check of two given
 * parameters. Instead of using expect(v1).toBe(v2) from jest, the
 * purpose of this function is to compare the parameters using
 * utils.approxEqual to get a lower precision numerical checking.
 *
 * Furthermore, this function will console log the difference of the two
 * given parameters using jest.diffDefault. to get a better output in
 * understanding what went wrong.
 *
 * @param got is either a number, or a Vector, or a Matrix.
 * @param want is either a number, or a Vector, or a Matrix.
 * @returns true if equal or false if not.
 */
function checkEqual(got, want, log = true) {
    let equal = false;
    if (got instanceof mat_1.Matrix) {
        equal = got.eq(want);
    }
    else if (got instanceof vec_1.Vector) {
        equal = got.eq(want);
    }
    else {
        equal = utils_1.approxEqual(got, want);
    }
    if (!equal && log) {
        // log the difference if not equal.
        console.log(expect.getState().currentTestName + '\n', jest_diff_1.default(want, got));
    }
    return equal;
}
exports.checkEqual = checkEqual;
/**
 * expectOr test if there is a test can success.
 * @param tests all kinds of test
 */
// a helper to check multiple solution
function expectOr(...tests) {
    try {
        tests.shift()();
    }
    catch (e) {
        if (tests.length)
            expectOr(...tests);
        else
            throw e;
    }
}
exports.expectOr = expectOr;
//# sourceMappingURL=utils.js.map