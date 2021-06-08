/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {Vector} from './linalg/vec';
import {Matrix} from './linalg/mat';

const p = document.createElement('p');
p.textContent = 'Please open JavaScript console (F12).';
document.body.appendChild(p);

const v1 = new Vector(1, 2, 3, 0);
const v2 = new Vector(4, 5, 6, 0);

const m1 = new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
const m2 = new Matrix(2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2);

console.log('Vector.add():');
console.log(v1.add(v2)); // should be: Vector{x: 5, y: 7, z: 9, w: 0}

console.log('Vector.sub():');
console.log(v1.sub(v2)); // should be: Vector{x: -3, y: -3, z: -3, w: 0}

console.log('Vector.dot():');
console.log(v1.dot(v2)); // 32

console.log('Vector.cross():');
console.log(v1.cross(v2)); // should be: Vector{x: -3, y: 6, z: -3, w: 0}

console.log('Vector.apply():');
console.log(v1.apply(m1)); // should be: Vector{x: 1, y: 2, z: 3, w: 0}

console.log('Matrix.add():');
// should be: Matrix {
//   x00: 3,x01: 0,x02: 0,x03: 0,
//   x10: 0,x11: 3,x12: 0,x13: 0,
//   x20: 0,x21: 0,x22: 3,x23: 0,
//   x30: 0,x31: 0,x32: 0,x33: 3,
// }
console.log(m1.add(m2));

console.log('Matrix.sub():');
// should be: Matrix {
//   x00: -1, x01: 0,  x02: 0,  x03: 0,
//   x10: 0,  x11: -1, x12: 0,  x13: 0,
//   x20: 0,  x21: 0,  x22: -1, x23: 0,
//   x30: 0,  x31: 0,  x32: 0,  x33: -1
// }
console.log(m1.sub(m2));

console.log('Matrix.mul():');
// should be: Matrix {
//   x00: 2, x01: 0, x02: 0, x03: 0,
//   x10: 0, x11: 2, x12: 0, x13: 0,
//   x20: 0, x21: 0, x22: 2, x23: 0,
//   x30: 0, x31: 0, x32: 0, x33: 2
// }
console.log(m1.mul(m2));

const v3 = new Vector(1, 2, 3, 4);
const v4 = new Vector(2, 3, 4, 5);
try {
  console.log(v3.cross(v4)); // throw an error
} catch (e) {
  console.log('Only vectors can apply cross product: ', e);
}

const v5 = new Vector(1, 2, 3, 0);
const v6 = new Vector(2, 3, 4, 0);
let want = new Vector(-1, 2, -1, 0);
console.log(v5.cross(v6).eq(want)); // true

const v7 = new Vector(1, 2, 3, 4);
const m3 = new Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
want = new Vector(30, 70, 110, 150);
const got = m3.mul(v7);
if (got instanceof Vector) {
  console.log(got.eq(want)); // true
} else {
  console.log('Matrix and Vector multiplication does not result in a Vector!');
}
