/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {Matrix} from '../linalg/mat';
import {Vector} from '../linalg/vec';
import {Quaternion} from '../linalg/quaternion';

/**
 * A Vertex contains all supported vertex information, such as position,
 * uv, and normal.
 */
export class Vertex {
  position: Vector;
  uv: Vector;
  normal: Vector;
  constructor(position: Vector, uv: Vector, normal: Vector) {
    this.position = position;
    this.uv = uv;
    this.normal = normal;
  }
}

/**
 * A Face is consists of a list of vertices.
 */
export interface Face {
  vertices: Vertex[];
}

/**
 * A Mesh is consists of a list of faces.
 */
export interface Mesh {
  faces: Face[];
}

/**
 * Triangle implements Face and represents a triangle with only
 * 3 vertices.
 */
export class Triangle implements Face {
  vertices: Vertex[];
  constructor(vs: Vertex[]) {
    if (vs.length !== 3) {
      throw new Error('number of input vertices is not euqal to 3');
    }

    this.vertices = vs;
  }
}

/**
 * TriangleMesh implements Mesh and represents a triangle mesh.
 */
// prettier-ignore
export class TriangleMesh implements Mesh {
   faces: Triangle[];
   positions: Vector[];
   uvs: Vector[];
   normals: Vector[];

   // context is a transformation context (model matrix) that accumulates
   // applied transformation matrices (multiplied from left side) for the
   // given mesh.
   //
   // context is a persistant status for the given mesh and can be reused
   // for each of the rendering frame unless the mesh intentionally calls
   // resetContext() method.
   context: Matrix;

   constructor(
     triangles: Triangle[],
     positions: Vector[],
     uvs: Vector[],
     normals: Vector[]
   ) {
     this.faces = triangles;
     this.positions = positions;
     this.uvs = uvs;
     this.normals = normals;
     // context is initialized as an identity matrix.
     this.context = new Matrix(
       1, 0, 0, 0,
       0, 1, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
     );
   }
   /**
    * modelMatrix returns the transformation context as the model matrix
    * for the current frame (or at call time).
    *
    * @returns the model matrix at call time.
    */
   modelMatrix(): Matrix {
     return this.context;
   }
   /**
    * reset resets the transformation context.
    */
   resetContext() {
     this.context = new Matrix(
       1, 0, 0, 0,
       0, 1, 0, 0,
       0, 0, 1, 0,
       0, 0, 0, 1,
     );
   }
   /**
    * scale applies scale transformation on the given mesh.
    * @param sx is a scaling factor on x-axis
    * @param sy is a scaling factor on y-axis
    * @param sz is a scaling factor on z-axis
    */
   scale(sx: number, sy: number, sz: number) {
     const scaleM = new Matrix(
       sx, 0, 0, 0,
       0, sy, 0, 0,
       0, 0, sz, 0,
       0, 0, 0, 1
     )
     this.context = <Matrix>scaleM.mul(this.context);
   }
   /**
    * translate applies translation on the given mesh.
    * @param tx is a translation factor on x-axis
    * @param ty is a translation factor on y-axis
    * @param tz is a translation factor on z-axis
    */
   translate(tx: number, ty: number, tz: number) {
     const transM = new Matrix(
       1, 0, 0, tx,
       0, 1, 0, ty,
       0, 0, 1, tz,
       0, 0, 0, 1,
     )
     this.context = <Matrix>transM.mul(this.context);
   }
   /**
    * rotate applies rotation on the given mesh.
    * @param dir is a given rotation direction.
    * @param angle is a given rotation angle counterclockwise.
    */
   rotate(dir: Vector, angle: number) {
     const u = dir.unit();
     const cosa = Math.cos(angle / 2);
     const sina = Math.sin(angle / 2);
     const q = new Quaternion(cosa, sina * u.x, sina * u.y, sina * u.z);
     this.context = <Matrix>q.toRotationMatrix().mul(this.context);
   }
 }

/**
 * LoadOBJ loads a .obj input data and turns it into a TriangleMesh.
 *
 * @param data is a string that contains data from a .obj file
 * @returns a TriangleMesh that represents the input mesh.
 */
export function LoadOBJ(data: string): TriangleMesh {
  const ts: Triangle[] = [];
  const positions: Vector[] = [];
  const uvs: Vector[] = [];
  const normals: Vector[] = [];

  const lines = data.split('\n');
  for (const line of lines) {
    const tokens = line.split(' ');
    const vertices: Vertex[] = [];
    switch (tokens[0]) {
      case 'v':
        positions.push(
          new Vector(
            parseFloat(tokens[1]),
            parseFloat(tokens[2]),
            parseFloat(tokens[3]),
            1
          )
        );
        break;
      case 'vt':
        uvs.push(
          new Vector(parseFloat(tokens[1]), parseFloat(tokens[2]), 0, 1)
        );
        break;
      case 'vn':
        normals.push(
          new Vector(
            parseFloat(tokens[1]),
            parseFloat(tokens[2]),
            parseFloat(tokens[3]),
            0
          )
        );
        break;
      case 'f':
        for (let i = 1; i < tokens.length; i++) {
          const vIdx = parseInt(tokens[i].split('/')[0]) - 1;
          const uvIdx = parseInt(tokens[i].split('/')[1]) - 1;
          const nIdx = parseInt(tokens[i].split('/')[2]) - 1;
          vertices.push(new Vertex(positions[vIdx], uvs[uvIdx], normals[nIdx]));
        }
        ts.push(new Triangle(vertices));
        break;
    }
  }
  return new TriangleMesh(ts, positions, uvs, normals);
}
