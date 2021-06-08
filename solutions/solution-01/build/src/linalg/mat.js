"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */
const vec_1 = require("./vec");
const utils_1 = require("./utils");
/**
 * Matrix implements IMatrix and represents a 4x4 matrix. For instance:
 *
 *    const vec = new Vector(1, 2, 3, 4);
 *    const mat = new Matrix(
 *      1, 2, 3, 4,
 *      5, 6, 7, 8,
 *      9, 10, 11, 12,
 *      13, 14, 15, 16
 *    );
 *    console.log(mat.mul(vec)); // Vector(30, 70, 110, 150)
 *
 */
// prettier-ignore
class Matrix {
    constructor(x00, x01, x02, x03, x10, x11, x12, x13, x20, x21, x22, x23, x30, x31, x32, x33) {
        this.x00 = x00 || 0;
        this.x01 = x01 || 0;
        this.x02 = x02 || 0;
        this.x03 = x03 || 0;
        this.x10 = x10 || 0;
        this.x11 = x11 || 0;
        this.x12 = x12 || 0;
        this.x13 = x13 || 0;
        this.x20 = x20 || 0;
        this.x21 = x21 || 0;
        this.x22 = x22 || 0;
        this.x23 = x23 || 0;
        this.x30 = x30 || 0;
        this.x31 = x31 || 0;
        this.x32 = x32 || 0;
        this.x33 = x33 || 0;
    }
    /**
     * get returns the element at row i and column j.
     * @param i row
     * @param j column
     * @returns the element
     */
    get(i, j) {
        if (i < 0 || i > 4 || j < 0 || j > 4) {
            throw new Error('invalid index');
        }
        const values = [
            this.x00, this.x01, this.x02, this.x03,
            this.x10, this.x11, this.x12, this.x13,
            this.x20, this.x21, this.x22, this.x23,
            this.x30, this.x31, this.x32, this.x33,
        ];
        return values[i * 4 + j];
    }
    /**
     * set sets the given value at row i and column j.
     * @param i row
     * @param j column
     * @param value to be set
     */
    set(i, j, value) {
        if (i < 0 || i > 4 || j < 0 || j > 4) {
            throw new Error('invalid index');
        }
        switch (i * 4 + j) {
            case 0:
                this.x00 = value;
                break;
            case 1:
                this.x01 = value;
                break;
            case 2:
                this.x02 = value;
                break;
            case 3:
                this.x03 = value;
                break;
            case 4:
                this.x10 = value;
                break;
            case 5:
                this.x11 = value;
                break;
            case 6:
                this.x12 = value;
                break;
            case 7:
                this.x13 = value;
                break;
            case 8:
                this.x20 = value;
                break;
            case 9:
                this.x21 = value;
                break;
            case 10:
                this.x22 = value;
                break;
            case 11:
                this.x23 = value;
                break;
            case 12:
                this.x30 = value;
                break;
            case 13:
                this.x31 = value;
                break;
            case 14:
                this.x32 = value;
                break;
            case 15:
                this.x33 = value;
                break;
        }
    }
    /**
     * eq checks whether the given two matrices are equal or not.
     *
     * @param m a Matrix
     * @returns true if two given matrices are element-wise equal, otherwise false.
     */
    eq(m) {
        if (utils_1.approxEqual(this.x00, m.x00) &&
            utils_1.approxEqual(this.x10, m.x10) &&
            utils_1.approxEqual(this.x20, m.x20) &&
            utils_1.approxEqual(this.x30, m.x30) &&
            utils_1.approxEqual(this.x01, m.x01) &&
            utils_1.approxEqual(this.x11, m.x11) &&
            utils_1.approxEqual(this.x21, m.x21) &&
            utils_1.approxEqual(this.x31, m.x31) &&
            utils_1.approxEqual(this.x02, m.x02) &&
            utils_1.approxEqual(this.x12, m.x12) &&
            utils_1.approxEqual(this.x22, m.x22) &&
            utils_1.approxEqual(this.x32, m.x32) &&
            utils_1.approxEqual(this.x03, m.x03) &&
            utils_1.approxEqual(this.x13, m.x13) &&
            utils_1.approxEqual(this.x23, m.x23) &&
            utils_1.approxEqual(this.x33, m.x33)) {
            return true;
        }
        return false;
    }
    /**
     * add adds two given matrices element-wise.
     *
     * @param m is a Matrix
     * @returns the resulting Matrix
     */
    add(m) {
        // TODO: implement matrix addition
        let myM = new Matrix();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                myM.set(i, j, m.get(i, j) + this.get(i, j));
            }
        }
        return myM;
    }
    /**
     * sub subtracts two given matrices element-wise.
     *
     * @param m is a Matrix
     * @returns the resulting Matrix
     */
    sub(m) {
        // TODO: implement matrix subtraction
        let myM = new Matrix();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                myM.set(i, j, this.get(i, j) - m.get(j, i));
            }
        }
        return myM;
    }
    /**
     * mul computes the multiplication of a given Matrix and a given multiplier.
     * If the multiplier is a Matrix the the method results in a Matrix. Otherwise,
     * it returns a Vector.
     *
     * @param m is either a Matrix or a Vector
     * @returns a Matrix if the given multiplier is a Matrix, or a Vector
     * if the given multiplier is a Vector.
     */
    mul(m) {
        if (m instanceof vec_1.Vector) {
            return m.apply(this);
        }
        let myM = new Matrix();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                myM.set(i, j, m.get(i, j) * this.get(i, j));
            }
        }
        return myM;
    }
    /**
     * T computes the transpose of the given Matrix.
     *
     * @returns the resulting tranpose Matrix
     */
    T() {
        // TODO: implement matrix transpose
        let myM = new Matrix();
        let i = 0;
        let j = 0;
        for (i; i < 4; i++) {
            for (j; j < 4; j++) {
                myM.set(j, i, this.get(i, j));
            }
        }
        return myM;
    }
    /**
     * scale scales all elements of the given matrix and returns a new Matrix.
     *
     * @param s is a scalar value
     * @returns the resulting matrix
     */
    scale(s) {
        return new Matrix(this.x00 * s, this.x10 * s, this.x20 * s, this.x30 * s, this.x01 * s, this.x11 * s, this.x21 * s, this.x31 * s, this.x02 * s, this.x12 * s, this.x22 * s, this.x32 * s, this.x03 * s, this.x13 * s, this.x23 * s, this.x33 * s);
    }
    /**
     * det computes the determinant of the given matrix.
     *
     * @returns the resulting determinant
     */
    det() {
        return (this.x00 * this.x11 * this.x22 * this.x33 -
            this.x00 * this.x11 * this.x23 * this.x32 +
            this.x00 * this.x12 * this.x23 * this.x31 -
            this.x00 * this.x12 * this.x21 * this.x33 +
            this.x00 * this.x13 * this.x21 * this.x32 -
            this.x00 * this.x13 * this.x22 * this.x31 -
            this.x01 * this.x12 * this.x23 * this.x30 +
            this.x01 * this.x12 * this.x20 * this.x33 -
            this.x01 * this.x13 * this.x20 * this.x32 +
            this.x01 * this.x13 * this.x22 * this.x30 -
            this.x01 * this.x10 * this.x22 * this.x33 +
            this.x01 * this.x10 * this.x23 * this.x32 +
            this.x02 * this.x13 * this.x20 * this.x31 -
            this.x02 * this.x13 * this.x21 * this.x30 +
            this.x02 * this.x10 * this.x21 * this.x33 -
            this.x02 * this.x10 * this.x23 * this.x31 +
            this.x02 * this.x11 * this.x23 * this.x30 -
            this.x02 * this.x11 * this.x20 * this.x33 -
            this.x03 * this.x10 * this.x21 * this.x32 +
            this.x03 * this.x10 * this.x22 * this.x31 -
            this.x03 * this.x11 * this.x22 * this.x30 +
            this.x03 * this.x11 * this.x20 * this.x32 -
            this.x03 * this.x12 * this.x20 * this.x31 +
            this.x03 * this.x12 * this.x21 * this.x30);
    }
    /**
     * inv computes the inverse matrix of the given matrix. Note that the
     * method will throw an error if the given matrix is not invertible.
     *
     * @returns the resulting matrix.
     */
    inv() {
        const de = this.det();
        if (utils_1.approxEqual(de, 0)) {
            throw new Error('zero determinant');
        }
        const n = new Matrix();
        const d = 1 / de;
        n.x00 =
            (this.x12 * this.x23 * this.x31 -
                this.x13 * this.x22 * this.x31 +
                this.x13 * this.x21 * this.x32 -
                this.x11 * this.x23 * this.x32 -
                this.x12 * this.x21 * this.x33 +
                this.x11 * this.x22 * this.x33) *
                d;
        n.x01 =
            (this.x03 * this.x22 * this.x31 -
                this.x02 * this.x23 * this.x31 -
                this.x03 * this.x21 * this.x32 +
                this.x01 * this.x23 * this.x32 +
                this.x02 * this.x21 * this.x33 -
                this.x01 * this.x22 * this.x33) *
                d;
        n.x02 =
            (this.x02 * this.x13 * this.x31 -
                this.x03 * this.x12 * this.x31 +
                this.x03 * this.x11 * this.x32 -
                this.x01 * this.x13 * this.x32 -
                this.x02 * this.x11 * this.x33 +
                this.x01 * this.x12 * this.x33) *
                d;
        n.x03 =
            (this.x03 * this.x12 * this.x21 -
                this.x02 * this.x13 * this.x21 -
                this.x03 * this.x11 * this.x22 +
                this.x01 * this.x13 * this.x22 +
                this.x02 * this.x11 * this.x23 -
                this.x01 * this.x12 * this.x23) *
                d;
        n.x10 =
            (this.x13 * this.x22 * this.x30 -
                this.x12 * this.x23 * this.x30 -
                this.x13 * this.x20 * this.x32 +
                this.x10 * this.x23 * this.x32 +
                this.x12 * this.x20 * this.x33 -
                this.x10 * this.x22 * this.x33) *
                d;
        n.x11 =
            (this.x02 * this.x23 * this.x30 -
                this.x03 * this.x22 * this.x30 +
                this.x03 * this.x20 * this.x32 -
                this.x00 * this.x23 * this.x32 -
                this.x02 * this.x20 * this.x33 +
                this.x00 * this.x22 * this.x33) *
                d;
        n.x12 =
            (this.x03 * this.x12 * this.x30 -
                this.x02 * this.x13 * this.x30 -
                this.x03 * this.x10 * this.x32 +
                this.x00 * this.x13 * this.x32 +
                this.x02 * this.x10 * this.x33 -
                this.x00 * this.x12 * this.x33) *
                d;
        n.x13 =
            (this.x02 * this.x13 * this.x20 -
                this.x03 * this.x12 * this.x20 +
                this.x03 * this.x10 * this.x22 -
                this.x00 * this.x13 * this.x22 -
                this.x02 * this.x10 * this.x23 +
                this.x00 * this.x12 * this.x23) *
                d;
        n.x20 =
            (this.x11 * this.x23 * this.x30 -
                this.x13 * this.x21 * this.x30 +
                this.x13 * this.x20 * this.x31 -
                this.x10 * this.x23 * this.x31 -
                this.x11 * this.x20 * this.x33 +
                this.x10 * this.x21 * this.x33) *
                d;
        n.x21 =
            (this.x03 * this.x21 * this.x30 -
                this.x01 * this.x23 * this.x30 -
                this.x03 * this.x20 * this.x31 +
                this.x00 * this.x23 * this.x31 +
                this.x01 * this.x20 * this.x33 -
                this.x00 * this.x21 * this.x33) *
                d;
        n.x22 =
            (this.x01 * this.x13 * this.x30 -
                this.x03 * this.x11 * this.x30 +
                this.x03 * this.x10 * this.x31 -
                this.x00 * this.x13 * this.x31 -
                this.x01 * this.x10 * this.x33 +
                this.x00 * this.x11 * this.x33) *
                d;
        n.x23 =
            (this.x03 * this.x11 * this.x20 -
                this.x01 * this.x13 * this.x20 -
                this.x03 * this.x10 * this.x21 +
                this.x00 * this.x13 * this.x21 +
                this.x01 * this.x10 * this.x23 -
                this.x00 * this.x11 * this.x23) *
                d;
        n.x30 =
            (this.x12 * this.x21 * this.x30 -
                this.x11 * this.x22 * this.x30 -
                this.x12 * this.x20 * this.x31 +
                this.x10 * this.x22 * this.x31 +
                this.x11 * this.x20 * this.x32 -
                this.x10 * this.x21 * this.x32) *
                d;
        n.x31 =
            (this.x01 * this.x22 * this.x30 -
                this.x02 * this.x21 * this.x30 +
                this.x02 * this.x20 * this.x31 -
                this.x00 * this.x22 * this.x31 -
                this.x01 * this.x20 * this.x32 +
                this.x00 * this.x21 * this.x32) *
                d;
        n.x32 =
            (this.x02 * this.x11 * this.x30 -
                this.x01 * this.x12 * this.x30 -
                this.x02 * this.x10 * this.x31 +
                this.x00 * this.x12 * this.x31 +
                this.x01 * this.x10 * this.x32 -
                this.x00 * this.x11 * this.x32) *
                d;
        n.x33 =
            (this.x01 * this.x12 * this.x20 -
                this.x02 * this.x11 * this.x20 +
                this.x02 * this.x10 * this.x21 -
                this.x00 * this.x12 * this.x21 -
                this.x01 * this.x10 * this.x22 +
                this.x00 * this.x11 * this.x22) *
                d;
        return n;
    }
}
exports.Matrix = Matrix;
//# sourceMappingURL=mat.js.map