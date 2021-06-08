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
const vec_1 = require("../src/linalg/vec");
const mat_1 = require("../src/linalg/mat");
const utils_1 = require("./utils");
const jest_diff_1 = __importDefault(require("jest-diff"));
// Sanity check, in case eq was changed from implementation.
test('Vector.eq', () => {
    const v1 = new vec_1.Vector(1, 2, 3, 4);
    const v2 = new vec_1.Vector(1, 2, 3, 4);
    const v3 = new vec_1.Vector(0, 0, 0, 0);
    expect(v1.eq(v2)).toBe(true);
    expect(v1.eq(v3)).toBe(false);
});
// Sanity check, in case eq was changed from implementation.
test('Matrix.eq', () => {
    const m1 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m3 = new mat_1.Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    expect(m1.eq(m2)).toBe(true);
    expect(m1.eq(m3)).toBe(false);
});
test('Matrix.set', () => {
    let m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    m.set(0, 0, 0);
    let w = new mat_1.Matrix(0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(m.eq(w)).toBe(true);
    m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    m.set(0, 1, 0);
    w = new mat_1.Matrix(1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(m.eq(w)).toBe(true);
    m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    m.set(0, 1, 0);
    w = new mat_1.Matrix(1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(m.eq(w)).toBe(true);
    m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    m.set(0, 2, 0);
    w = new mat_1.Matrix(1, 2, 0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(m.eq(w)).toBe(true);
});
test('Vector.add', () => {
    const v1 = new vec_1.Vector(1, 2, 3, 4);
    const v2 = new vec_1.Vector(1, 2, 3, 4);
    const w = new vec_1.Vector(2, 4, 6, 8);
    const got = v1.add(v2);
    console.log(jest_diff_1.default(got, w));
    expect(got.eq(w)).toBe(true);
});
test('Vector.sub', () => {
    const v1 = new vec_1.Vector(1, 2, 3, 4);
    const v2 = new vec_1.Vector(1, 2, 3, 4);
    const got = v1.sub(v2);
    expect(got.x).toBe(0);
    expect(got.y).toBe(0);
    expect(got.z).toBe(0);
    expect(got.w).toBe(0);
});
test('Vector.dot', () => {
    expect(() => {
        new vec_1.Vector(1, 2, 3, 1).dot(new vec_1.Vector(1, 2, 3, 1));
    }).toThrow();
    expect(() => {
        new vec_1.Vector(1, 2, 3, 1).dot(new vec_1.Vector(1, 2, 3, 0));
    }).toThrow();
    expect(() => {
        new vec_1.Vector(1, 2, 3, 0).dot(new vec_1.Vector(1, 2, 3, 1));
    }).toThrow();
    expect(new vec_1.Vector(1, 2, 3, 0).dot(new vec_1.Vector(1, 2, 3, 0))).toEqual(1 + 4 + 9);
});
test('Vector.cross', () => {
    expect(() => {
        new vec_1.Vector(1, 2, 3, 1).cross(new vec_1.Vector(1, 2, 3, 1));
    }).toThrow();
    expect(() => {
        new vec_1.Vector(1, 2, 3, 1).cross(new vec_1.Vector(1, 2, 3, 0));
    }).toThrow();
    expect(() => {
        new vec_1.Vector(1, 2, 3, 0).cross(new vec_1.Vector(1, 2, 3, 1));
    }).toThrow();
    expect(new vec_1.Vector(0, 0, 0, 0).cross(new vec_1.Vector(1, 2, 3, 0))).toEqual(new vec_1.Vector(0, 0, 0, 0));
    expect(new vec_1.Vector(1, 2, 3, 0).cross(new vec_1.Vector(1, 2, 3, 0))).toEqual(new vec_1.Vector(0, 0, 0, 0));
    expect(new vec_1.Vector(1, 0, 0, 0).cross(new vec_1.Vector(0, 1, 0, 0))).toEqual(new vec_1.Vector(0, 0, 1, 0));
    const randomInts = () => {
        return Math.floor(Math.random() * 10);
    };
    // orthogonal
    const v1 = new vec_1.Vector(randomInts(), randomInts(), randomInts(), 0);
    const v2 = new vec_1.Vector(randomInts(), randomInts(), randomInts(), 0);
    expect(v1.dot(v1.cross(v2))).toBe(0);
    // jacobi
    const a1 = new vec_1.Vector(randomInts(), randomInts(), randomInts(), 0);
    const a2 = new vec_1.Vector(randomInts(), randomInts(), randomInts(), 0);
    const a3 = new vec_1.Vector(randomInts(), randomInts(), randomInts(), 0);
    expect(a1
        .cross(a2.cross(a3))
        .add(a2.cross(a3.cross(a1)))
        .add(a3.cross(a1.cross(a2)))).toEqual(new vec_1.Vector(0, 0, 0, 0));
});
test('Vector.unit', () => {
    expect(() => {
        new vec_1.Vector(1, 2, 3, 1).cross(new vec_1.Vector(1, 2, 3, 1));
    }).toThrow();
    expect(() => {
        new vec_1.Vector(1, 2, 3, 1).cross(new vec_1.Vector(1, 2, 3, 0));
    }).toThrow();
    expect(() => {
        new vec_1.Vector(1, 2, 3, 0).cross(new vec_1.Vector(1, 2, 3, 1));
    }).toThrow();
    expect(new vec_1.Vector(1, 1, 1, 0).unit()).toEqual(new vec_1.Vector(1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3), 0));
    expect(new vec_1.Vector(2, 1, 2, 0).unit()).toEqual(new vec_1.Vector(2 / 3, 1 / 3, 2 / 3, 0));
    expect(new vec_1.Vector(1, 1, 3, 0).unit()).toEqual(new vec_1.Vector(1 / Math.sqrt(11), 1 / Math.sqrt(11), 3 / Math.sqrt(11), 0));
    expect(new vec_1.Vector(1, 2, -2, 0).unit()).toEqual(new vec_1.Vector(1 / 3, 2 / 3, -2 / 3, 0));
});
test('Vector.apply', () => {
    const v = new vec_1.Vector(1, 2, 3, 4);
    const m = new mat_1.Matrix(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
    const w = new vec_1.Vector(30, 30, 30, 30);
    const got = v.apply(m);
    console.log(jest_diff_1.default(got, w));
    expect(got.eq(w)).toBe(true);
});
test('Matrix.add', () => {
    const m1 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const w = new mat_1.Matrix(2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32);
    const got = m1.add(m2);
    console.log(jest_diff_1.default(got, w));
    expect(got.eq(w)).toBe(true);
});
test('Matrix.sub', () => {
    const m1 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const w = new mat_1.Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const got = m1.sub(m2);
    console.log(jest_diff_1.default(got, w));
    expect(got.eq(w)).toBe(true);
});
test('Matrix.mul', () => {
    const m1 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const m2 = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const w1 = new mat_1.Matrix(90, 100, 110, 120, 202, 228, 254, 280, 314, 356, 398, 440, 426, 484, 542, 600);
    const got1 = m1.mul(m2);
    expect(got1 instanceof mat_1.Matrix).toBe(true);
    const mm = got1;
    console.log(jest_diff_1.default(mm, w1));
    expect(mm.eq(w1)).toBe(true);
    const v = new vec_1.Vector(1, 2, 3, 4);
    const m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const w2 = new vec_1.Vector(30, 70, 110, 150);
    const got2 = m.mul(v);
    expect(got2 instanceof vec_1.Vector).toBe(true);
    const nn = got2;
    console.log(jest_diff_1.default(nn, w2));
    expect(nn.eq(w2)).toBe(true);
});
test('Matrix.scale', () => {
    const m = new mat_1.Matrix(1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4);
    const w = new mat_1.Matrix(2, 4, 6, 8, 2, 4, 6, 8, 2, 4, 6, 8, 2, 4, 6, 8);
    const got = m.scale(2);
    expect(utils_1.checkEqual(got, w)).toBe(true);
});
test('Matrix.T', () => {
    const m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    const w = new mat_1.Matrix(1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16);
    const got = m.T();
    console.log(jest_diff_1.default(got, w));
    expect(got.eq(w)).toBe(true);
});
test('Matrix.det', () => {
    const m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    let got = m.det();
    let want = 0;
    expect(got).toBe(want);
    const mm = new mat_1.Matrix(1, 9, 3, 2, 8, 3, 2, 2, 4, 8, 2, 9, 7, 9, 7, 5);
    got = mm.det();
    want = 1628;
    expect(got).toBe(want);
});
test('Matrix.inv', () => {
    const m = new mat_1.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
    expect(() => {
        m.inv();
    }).toThrow();
    const mm = new mat_1.Matrix(1, 9, 3, 2, 8, 3, 2, 2, 4, 8, 2, 9, 7, 9, 7, 5);
    const got = mm.inv();
    const want = new mat_1.Matrix(-1 / 1628, 139 / 814, -21 / 1628, -73 / 1628, 155 / 814, 26 / 407, -1 / 814, -81 / 814, -239 / 1628, -153 / 814, -135 / 1628, 461 / 1628, -3 / 22, -1 / 11, 3 / 22, 1 / 22);
    expect((() => {
        const equal = got.eq(want);
        if (!equal) {
            console.log(jest_diff_1.default(got, want));
        }
        return equal;
    })()).toBe(true);
});
//# sourceMappingURL=linalg.test.js.map