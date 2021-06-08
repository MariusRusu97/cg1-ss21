/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {Vector} from '../src/linalg/vec';
import {Matrix} from '../src/linalg/mat';
import diffDefault from 'jest-diff';
import {approxEqual} from '../src/linalg/utils';

let score = 0;
afterAll(() => {
  console.log(`Total points: ${score}`);
});

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
function checkEqual(
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
 * randomInts returns a random integer in [0, 10)
 * @returns an integer
 */
function randomInts() {
  return Math.floor(Math.random() * 10);
}

// Sanity check, in case eq was changed from implementation.
test('Vector.eq', () => {
  const v1 = new Vector(1, 2, 3, 4);
  const v2 = new Vector(1, 2, 3, 4);
  const v3 = new Vector(0, 0, 0, 0);
  expect(checkEqual(v1, v2)).toBe(true);
  expect(checkEqual(v1, v3, false)).toBe(false);
});
// Sanity check, in case eq was changed from implementation.
test('Matrix.eq', () => {
  const m1 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const m3 = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  expect(checkEqual(m1, m2)).toBe(true);
  expect(checkEqual(m1, m3, false)).toBe(false);
});

test('(+0.5) Vector.add', () => {
  const v1 = new Vector(1, 2, 3, 4);
  const v2 = new Vector(1, 2, 3, 4);
  const w = new Vector(2, 4, 6, 8);

  const got = v1.add(v2);
  expect(checkEqual(got, w)).toBe(true);
  score += 0.5;
});

test('(+0.5) Vector.sub', () => {
  const v1 = new Vector(1, 2, 3, 4);
  const v2 = new Vector(1, 2, 3, 4);

  const got = v1.sub(v2);
  expect(got.x).toBe(0);
  expect(got.y).toBe(0);
  expect(got.z).toBe(0);
  expect(got.w).toBe(0);
  score += 0.5;
});

test('(+0.5) Vector.dot', () => {
  expect(() => {
    new Vector(1, 2, 3, 1).dot(new Vector(1, 2, 3, 1));
  }).toThrow();
  expect(() => {
    new Vector(1, 2, 3, 1).dot(new Vector(1, 2, 3, 0));
  }).toThrow();
  expect(() => {
    new Vector(1, 2, 3, 0).dot(new Vector(1, 2, 3, 1));
  }).toThrow();

  const got = new Vector(1, 2, 3, 0).dot(new Vector(1, 2, 3, 0));
  const want = 1 + 4 + 9;
  expect(checkEqual(got, want)).toEqual(true);
  score += 0.5;
});

test('(+0.5) Vector.cross', () => {
  expect(() => {
    new Vector(1, 2, 3, 1).cross(new Vector(1, 2, 3, 1));
  }).toThrow();
  expect(() => {
    new Vector(1, 2, 3, 1).cross(new Vector(1, 2, 3, 0));
  }).toThrow();
  expect(() => {
    new Vector(1, 2, 3, 0).cross(new Vector(1, 2, 3, 1));
  }).toThrow();

  let got = new Vector(0, 0, 0, 0).cross(new Vector(1, 2, 3, 0));
  let want = new Vector(0, 0, 0, 0);
  expect(checkEqual(got, want)).toEqual(true);

  got = new Vector(1, 2, 3, 0).cross(new Vector(1, 2, 3, 0));
  want = new Vector(0, 0, 0, 0);
  expect(checkEqual(got, want)).toEqual(true);

  got = new Vector(1, 0, 0, 0).cross(new Vector(0, 1, 0, 0));
  want = new Vector(0, 0, 1, 0);
  expect(checkEqual(got, want)).toEqual(true);

  // orthogonal
  const v1 = new Vector(randomInts(), randomInts(), randomInts(), 0);
  const v2 = new Vector(randomInts(), randomInts(), randomInts(), 0);
  expect(checkEqual(v1.dot(v1.cross(v2)), 0)).toBe(true);

  // jacobi
  const a1 = new Vector(randomInts(), randomInts(), randomInts(), 0);
  const a2 = new Vector(randomInts(), randomInts(), randomInts(), 0);
  const a3 = new Vector(randomInts(), randomInts(), randomInts(), 0);
  expect(
    checkEqual(
      a1
        .cross(a2.cross(a3))
        .add(a2.cross(a3.cross(a1)))
        .add(a3.cross(a1.cross(a2))),
      new Vector(0, 0, 0, 0)
    )
  ).toEqual(true);

  score += 0.5;
});

test('(+0.5) Vector.unit', () => {
  expect(() => {
    new Vector(1, 2, 3, 1).cross(new Vector(1, 2, 3, 1));
  }).toThrow();
  expect(() => {
    new Vector(1, 2, 3, 1).cross(new Vector(1, 2, 3, 0));
  }).toThrow();
  expect(() => {
    new Vector(1, 2, 3, 0).cross(new Vector(1, 2, 3, 1));
  }).toThrow();

  expect(
    checkEqual(
      new Vector(1, 1, 1, 0).unit(),
      new Vector(1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3), 0)
    )
  ).toEqual(true);
  expect(
    checkEqual(
      new Vector(2, 1, 2, 0).unit(),
      new Vector(2 / 3, 1 / 3, 2 / 3, 0)
    )
  ).toEqual(true);
  expect(
    checkEqual(
      new Vector(1, 1, 3, 0).unit(),
      new Vector(1 / Math.sqrt(11), 1 / Math.sqrt(11), 3 / Math.sqrt(11), 0)
    )
  ).toEqual(true);
  expect(
    checkEqual(
      new Vector(1, 2, -2, 0).unit(),
      new Vector(1 / 3, 2 / 3, -2 / 3, 0)
    )
  ).toEqual(true);
  score += 0.5;
});

test('(+0.5) Vector.apply', () => {
  const v = new Vector(1, 2, 3, 4);
  const m = new Matrix(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
  const w = new Vector(30, 30, 30, 30);
  const got = v.apply(m);
  expect(checkEqual(got, w)).toBe(true);
  score += 0.5;
});

test('(+0.5) Matrix.add', () => {
  const m1 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const w = new Matrix(
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    16,
    18,
    20,
    22,
    24,
    26,
    28,
    30,
    32
  );
  const got = m1.add(m2);
  expect(checkEqual(got, w)).toBe(true);
  score += 0.5;
});

test('(+0.5) Matrix.sub', () => {
  const m1 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const w = new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  const got = m1.sub(m2);
  expect(checkEqual(got, w)).toBe(true);
  score += 0.5;
});

test('(+0.5) Matrix.mul', () => {
  const m1 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const m2 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const w1 = new Matrix(
    90,
    100,
    110,
    120,
    202,
    228,
    254,
    280,
    314,
    356,
    398,
    440,
    426,
    484,
    542,
    600
  );
  const got1 = m1.mul(m2);
  expect(got1 instanceof Matrix).toBe(true);

  const mm = <Matrix>got1;
  expect(checkEqual(mm, w1)).toBe(true);

  score += 0.5;
});

test('(+0.5) Matrix.T', () => {
  const m = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  const w = new Matrix(1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16);
  const got = m.T();
  expect(checkEqual(got, w)).toBe(true);
  score += 0.5;
});

test('Matrix.det', () => {
  const m = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  let got = m.det();
  let want = 0;

  expect(checkEqual(got, want)).toBe(true);

  const mm = new Matrix(1, 9, 3, 2, 8, 3, 2, 2, 4, 8, 2, 9, 7, 9, 7, 5);
  got = mm.det();
  want = 1628;
  expect(checkEqual(got, want)).toBe(true);
});

test('Matrix.inv', () => {
  const m = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
  expect(() => {
    m.inv();
  }).toThrow();

  const mm = new Matrix(1, 9, 3, 2, 8, 3, 2, 2, 4, 8, 2, 9, 7, 9, 7, 5);
  const got = mm.inv();
  const want = new Matrix(
    -1 / 1628,
    139 / 814,
    -21 / 1628,
    -73 / 1628,
    155 / 814,
    26 / 407,
    -1 / 814,
    -81 / 814,
    -239 / 1628,
    -153 / 814,
    -135 / 1628,
    461 / 1628,
    -3 / 22,
    -1 / 11,
    3 / 22,
    1 / 22
  );

  expect(checkEqual(got, want)).toBe(true);
});
