"use strict";
/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.approxEqual = void 0;
function approxEqual(v1, v2, epsilon = 1e-7) {
    return Math.abs(v1 - v2) <= epsilon;
}
exports.approxEqual = approxEqual;
//# sourceMappingURL=utils.js.map