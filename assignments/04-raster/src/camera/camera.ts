/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {Matrix} from '../linalg/mat';
import {Vector} from '../linalg/vec';

/**
 * Camera is an interface that defines the abstract methods that should
 * be supported by any type of cameras.
 */
export interface ICamera {
  viewMatrix(): Matrix;
  projMatrix(): Matrix;
}

/**
 * Camera is an interface represents either a perspective camera
 * or a orthographic camera.
 */
// prettier-ignore
export class Camera {
  position: Vector;
  lookAt: Vector;
  up: Vector;
  /**
   * constrctor constructs a camera using given parameters.
   *
   * @param position represents the camera position
   * @param lookAt represents the *position* of where the camera is looking
   * @param up specifies the up direction of the given camera, the up
   * direction is not guaranteed to be orthogonal to the look at direction.
   */
  constructor(position: Vector, lookAt: Vector, up: Vector) {
    this.position = position;
    this.lookAt = lookAt;
    this.up = up;
  }
  /**
   * viewMatrix returns the view transformation matrix for the given camera
   * settings.
   *
   * @returns the view transformation matrix
   */
  viewMatrix(): Matrix {
    const l = this.lookAt.sub(this.position).unit();
    const lxu = l.cross(this.up).unit();
    const u = lxu.cross(l).unit();
    const Tr = new Matrix(
      lxu.x, lxu.y, lxu.z, 0,
      u.x, u.y, u.z, 0,
      -l.x, -l.y, -l.z, 0,
      0, 0, 0, 1
    );
    const Tt = new Matrix(
      1, 0, 0, -this.position.x,
      0, 1, 0, -this.position.y,
      0, 0, 1, -this.position.z,
      0, 0, 0, 1
    );
    return <Matrix>Tr.mul(Tt);
  }
  projMatrix(): Matrix {
    throw new Error('unsupported when camera type is not specified!');
  }
}

/**
 * PerspectiveCamera extends the Camera implemnetation and provides a
 * perspective projection method.
 */
// prettier-ignore
export class PerspectiveCamera extends Camera {
  fov: number;
  aspect: number;
  near: number;
  far: number;

  constructor(
    position: Vector,
    lookAt: Vector,
    up: Vector,
    fov = 45,
    aspect = 1,
    near = 0.1,
    far = 1000
  ) {
    super(position, lookAt, up);
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
  }
  /**
   * projMatrix returns an perspective projection matrix.
   * @returns the resulting projection matrix.
   */
  projMatrix(): Matrix {
    const aspect = this.aspect;
    const fov = this.fov;
    const n = this.near;
    const f = this.far;
    return new Matrix(
      -1/(aspect*Math.tan((fov*Math.PI)/360)), 0, 0, 0,
      0, -1/Math.tan((fov*Math.PI)/360), 0, 0,
      0, 0, (n+f)/(n-f), (2*n*f)/(f-n),
      0, 0, 1, 0
    );
  }
}

/**
 * OrthographicCamera extends the Camera implemnetation and provides a
 * orthographic projection method.
 */
// prettier-ignore
export class OrthographicCamera extends Camera {
  left: number;
  right: number;
  bottom: number;
  top: number;
  near: number;
  far: number;

  constructor(
    position: Vector,
    lookAt: Vector,
    up: Vector,
    left = -1,
    right = 1,
    bottom = -1,
    top = 1,
    near = 1,
    far = -1
  ) {
    super(position, lookAt, up);
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.top = top;
    this.near = near;
    this.far = far;
  }
  /**
   * projMatrix returns an orthographic projection matrix.
   * @returns the resulting projection matrix.
   */
  projMatrix(): Matrix {
    const l = this.left;
    const r = this.right;
    const t = this.top;
    const b = this.bottom;
    const n = this.near;
    const f = this.far;
    return new Matrix(
      2/(r-l), 0, 0, (l+r)/(l-r),
      0, 2/(t-b), 0, (b+t)/(b-t),
      0, 0, 2/(n-f), (f+n)/(f-n),
      0, 0, 0, 1
    );
  }
}
