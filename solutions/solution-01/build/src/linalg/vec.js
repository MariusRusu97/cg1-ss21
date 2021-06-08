"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const utils_1 = require("./utils");
/**
 * Vector implements IVector. It is a homogenous representation of a
 * three dimentional point (w === 1) or three dimentional vector (w === 0).
 * If the given inputs are representing points, then some of the operations
 * will throw an error. For instance, the cross(v) method cannot be called
 * by a point or with a point parameter, both of them must be vectors:
 *
 *    const v1 = new Vector(1, 2, 3, 4);
 *    const v2 = new Vector(2, 3, 4, 5);
 *    try {
 *      console.log(v1.cross(v2)); // throw an error
 *    } catch (e) {
 *      console.log(e);
 *    }
 *
 *    const v3 = new Vector(1, 2, 3, 0);
 *    const v4 = new Vector(2, 3, 4, 0);
 *    console.log(v3.cross(v4)); // Vector(-1, 2, -1, 0)
 *
 */
class Vector {
    /**
     * constructor constructs a Vector with given x,y,z,w components.
     *
     * @param x component
     * @param y component
     * @param z component
     * @param w component
     */
    constructor(x, y, z, w) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
    }
    /**
     * eq checks whether two vectors are equal.
     * @param v is a Vector
     * @returns true if two given vectors are equal, otherwise false.
     */
    eq(v) {
        if (utils_1.approxEqual(this.x, v.x) &&
            utils_1.approxEqual(this.y, v.y) &&
            utils_1.approxEqual(this.z, v.z) &&
            utils_1.approxEqual(this.w, v.w)) {
            return true;
        }
        return false;
    }
    /**
     * add adds the given two vectors and returns a new resulting Vector.
     *
     * @param v is a Vector
     * @returns the resulting Vector
     */
    add(v) {
        // TODO: implement vector addition
        if (v.w !== 0) {
            throw new Error('unimplemented');
        }
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    /**
     * sub subtracts the given two vectors and returns a new resulting Vector.
     * @param v is a Vector
     * @returns the resulting Vector
     */
    sub(v) {
        // TODO: implement vector subtraction
        if (v.w !== 0) {
            throw new Error('unimplemented');
        }
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    /**
     * dot computes the dot product of the given two vectors and returns
     * a new resulting number. Note that this method will throw an error
     * if the given vectors do not represent vectors (i.e. w !== 0).
     *
     * @param v is a Vector
     * @returns the resulting dot product
     */
    dot(v) {
        if (!utils_1.approxEqual(this.w, 0) || !utils_1.approxEqual(v.w, 0)) {
            throw new Error('expect vector other than point');
        }
        // TODO: implement vector dot product
        new Vector(this.x, this.y, this.z, this.w);
        const dotProduct = this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
        return dotProduct;
    }
    /**
     * cross computes the cross product of the given two vectors and returns
     * a new resulting Vector. Note that this method will throw an error
     * if the given vectors do not represent vectors (i.e. w !== 0).
     *
     * @param v is a Vector
     * @returns the resulting Vector
     */
    cross(v) {
        if (!utils_1.approxEqual(this.w, 0) || !utils_1.approxEqual(v.w, 0)) {
            throw new Error('expect vector other than point');
        }
        // TODO: implement vector cross product
        return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x, this.w);
    }
    /**
     * scale scales the given Vector by a given scalar value, and returns
     * a new resulting Vector.
     *
     * @param s is a scalar value
     * @returns the resulting Vector
     */
    scale(s) {
        return new Vector(this.x * s, this.y * s, this.z * s, this.w * s);
    }
    /**
     * len computes the length of the given Vector. Note that this method
     * will throw an error if the given vector does not represent a vector
     * (i.e. w !== 0).
     *
     * @returns the vector length
     */
    len() {
        return Math.sqrt(this.dot(this));
    }
    /**
     * unit computes a unit Vector along with the given vector direction.
     * Note that this method will throw an error if the given vector does
     * not represents a vector (i.e. w !== 0).
     *
     * @returns the resulting unit vector
     */
    unit() {
        if (!utils_1.approxEqual(this.w, 0)) {
            throw new Error('expect vector other than point');
        }
        // TODO: implement vector normalization
        return new Vector(this.x / this.len(), this.y / this.len(), this.z / this.len(), this.z / this.len());
    }
    /**
     * apply applies a Matrix transformation on the given Vector, and returns
     * the resulting new Vector.
     *
     * @param m a Matrix
     * @returns the resulting vector
     */
    apply(m) {
        // TODO: implement matrix and vector multiplication
        return new Vector(this.x * m.get(0, 0) + this.y * m.get(0, 1) + this.z * m.get(0, 2) + this.w * m.get(0, 3), this.x * m.get(1, 0) + this.y * m.get(1, 1) + this.z * m.get(1, 2) + this.w * m.get(1, 3), this.x * m.get(2, 0) + this.y * m.get(2, 1) + this.z * m.get(2, 2) + this.w * m.get(2, 3), this.x * m.get(3, 0) + this.y * m.get(3, 1) + this.z * m.get(3, 2) + this.w * m.get(3, 3));
    }
}
exports.Vector = Vector;
//# sourceMappingURL=vec.js.map