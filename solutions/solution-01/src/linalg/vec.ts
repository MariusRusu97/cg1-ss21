/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */
import {IMatrix} from './mat';
import {approxEqual} from './utils';

/**
 * IVector is an interface that defines vector operations.
 * A Vector implementation can have two, three or four dimentions.
 */
export interface IVector {
  eq(v: Vector): boolean;
  add(v: Vector): Vector;
  sub(v: Vector): Vector;
  dot(v: Vector): number;
  cross(v: Vector): Vector;
  scale(s: number): Vector;
  len(): number;
  unit(): Vector;
  apply(m: IMatrix): Vector;
}

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
export class Vector implements IVector {
  x: number; // x component
  y: number; // y component
  z: number; // z component
  w: number; // w component

  /**
   * constructor constructs a Vector with given x,y,z,w components.
   *
   * @param x component
   * @param y component
   * @param z component
   * @param w component
   */
  constructor(x?: number, y?: number, z?: number, w?: number) {
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
  eq(v: Vector): boolean {
    if (
      approxEqual(this.x, v.x) &&
      approxEqual(this.y, v.y) &&
      approxEqual(this.z, v.z) &&
      approxEqual(this.w, v.w)
    ) {
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
  add(v: Vector): Vector {
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
  sub(v: Vector): Vector {
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
  dot(v: Vector): number {
    if (!approxEqual(this.w, 0) || !approxEqual(v.w, 0)) {
      throw new Error('expect vector other than point');
    }

    // TODO: implement vector dot product
    new Vector(this.x, this.y, this.z, this.w);
    const dotProduct =
      this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
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
  cross(v: Vector): Vector {
    if (!approxEqual(this.w, 0) || !approxEqual(v.w, 0)) {
      throw new Error('expect vector other than point');
    }

    // TODO: implement vector cross product
    return new Vector(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x,
      this.w
    );
  }
  /**
   * scale scales the given Vector by a given scalar value, and returns
   * a new resulting Vector.
   *
   * @param s is a scalar value
   * @returns the resulting Vector
   */
  scale(s: number): Vector {
    return new Vector(this.x * s, this.y * s, this.z * s, this.w * s);
  }
  /**
   * len computes the length of the given Vector. Note that this method
   * will throw an error if the given vector does not represent a vector
   * (i.e. w !== 0).
   *
   * @returns the vector length
   */
  len(): number {
    return Math.sqrt(this.dot(this));
  }
  /**
   * unit computes a unit Vector along with the given vector direction.
   * Note that this method will throw an error if the given vector does
   * not represents a vector (i.e. w !== 0).
   *
   * @returns the resulting unit vector
   */
  unit(): Vector {
    if (!approxEqual(this.w, 0)) {
      throw new Error('expect vector other than point');
    }

    // TODO: implement vector normalization
    return new Vector(
      this.x / this.len(),
      this.y / this.len(),
      this.z / this.len(),
      this.z / this.len()
    );
  }
  /**
   * apply applies a Matrix transformation on the given Vector, and returns
   * the resulting new Vector.
   *
   * @param m a Matrix
   * @returns the resulting vector
   */
  apply(m: IMatrix): Vector {
    // TODO: implement matrix and vector multiplication
    return new Vector(
      this.x * m.get(0, 0) +
        this.y * m.get(0, 1) +
        this.z * m.get(0, 2) +
        this.w * m.get(0, 3),
      this.x * m.get(1, 0) +
        this.y * m.get(1, 1) +
        this.z * m.get(1, 2) +
        this.w * m.get(1, 3),
      this.x * m.get(2, 0) +
        this.y * m.get(2, 1) +
        this.z * m.get(2, 2) +
        this.w * m.get(2, 3),
      this.x * m.get(3, 0) +
        this.y * m.get(3, 1) +
        this.z * m.get(3, 2) +
        this.w * m.get(3, 3)
    );
  }
}