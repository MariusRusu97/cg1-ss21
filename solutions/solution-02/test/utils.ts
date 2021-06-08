/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import diffDefault from 'jest-diff';
import {Matrix} from '../src/linalg/mat';
import {approxEqual} from '../src/linalg/utils';
import {Vector} from '../src/linalg/vec';

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
export function checkEqual(
  got: Matrix | Vector | number,
  want: Matrix | Vector | number,
  log = true
): boolean {
  let equal = false;
  if (got instanceof Matrix) {
    equal = got.eq(<Matrix>want);
  } else if (got instanceof Vector) {
    equal = got.eq(<Vector>want);
  } else {
    equal = approxEqual(got, <number>want);
  }
  if (!equal && log) {
    // log the difference if not equal.
    console.log(
      expect.getState().currentTestName + '\n',
      diffDefault(want, got)
    );
  }
  return equal;
}

/**
 * expectOr test if there is a test can success.
 * @param tests all kinds of test
 */
// a helper to check multiple solution
export function expectOr(...tests: (() => void)[]) {
  try {
    (<() => void>tests.shift())();
  } catch (e) {
    if (tests.length) expectOr(...tests);
    else throw e;
  }
}
