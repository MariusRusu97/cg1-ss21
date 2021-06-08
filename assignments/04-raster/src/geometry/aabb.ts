/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {Vector} from '../linalg/vec';

/**
 * AABB represents an AABB of the given vertices.
 */
export class AABB {
  min: Vector; // minimum position of the bounding box
  max: Vector; // maximum position of the bounding box

  /**
   * constructor constructs the minimum axis aligned bounding box of the
   * given vertices.
   *
   * @param v1 is a point position
   * @param v2 is a point position
   * @param v3 is a point position
   */
  constructor(v1: Vector, v2: Vector, v3: Vector) {
    // TODO: computes the *minimum* AABB of the given triangle, and
    // stores the minimum and maximum corner of the bounding box in
    // this.min and this.max
    this.min = new Vector();
    this.max = new Vector();
  }
  /**
   * intersect checks if the two given AABBs share an intersection.
   * If the two AABBs only share a single vertex or a 2D plane, then
   * it is also considered as an intersection and returns true.
   *
   * @param aabb is an other given AABB.
   * @returns true if the given two aabb share an intersection, false otherwise.
   */
  intersect(aabb: AABB): boolean {
    // TODO: check if given two AABBs share an intersection.
    return false;
  }
}
