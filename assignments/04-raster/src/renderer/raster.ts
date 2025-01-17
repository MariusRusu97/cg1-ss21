/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {AABB} from '../geometry/aabb';
import {Triangle, Vertex} from '../geometry/mesh';
import {Matrix} from '../linalg/mat';
import {Vector} from '../linalg/vec';
import {Scene} from './scene';

/**
 * Rasterizer is a CPU rasterizer.
 */
export class Rasterizer {
  // width is the width of the rasterizer
  width: number;
  // height is the height of the rasterizer
  height: number;

  /**
   * constructor constructs a rasterizer for rendering a scene to a
   * screen with the given size (width x height).
   *
   * @param width is the width of the screen for rasterization
   * @param height is the height of the screen for rasterization
   */
  constructor(width: number, height: number) {
    if (width <= 0.5 || height <= 0.5) {
      throw new Error('The size of rasterizer is too small!');
    }

    this.width = Math.round(width);
    this.height = Math.round(height);
  }
  /**
   * initFrameBuffer initializes a frame buffer by the size of the
   * rasterizer.
   *
   * @returns a frame buffer that stores a black color in all pixels.
   */
  initFrameBuffer(): Array<Vector> {
    // TODO: creates and returns a frame buffer that is initialized using
    // black color (0, 0, 0, 1) for R, G, B, A four channels.
    return [];
  }
  /**
   * viewportMatrix returns the viewport matrix of the given rasterizer.
   * @returns the resulting viewport matrix.
   */
  // prettier-ignore
  viewportMatrix(): Matrix {
    return new Matrix(
      this.width/2, 0, 0, this.width/2,
      0, this.height/2, 0, this.height/2,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }

  /**
   * render computes one rendering pass and returns a rendered frame
   * buffer.
   *
   * @returns a frame buffer that renders the scene.
   */
  render(s: Scene): Array<Vector> {
    const frameBuf = this.initFrameBuffer();
    const shaderInputs = new Map<string, Matrix>([
      ['modelMatrix', s.mesh.modelMatrix()],
      ['viewMatrix', s.camera.viewMatrix()],
      ['projMatrix', s.camera.projMatrix()],
      ['vpMatrix', this.viewportMatrix()],
    ]);
    const length = s.mesh.faces.length;
    for (let i = 0; i < length; i++) {
      const t = this.vertexProcessing(s.mesh.faces[i], shaderInputs);

      // backface culling
      if (this.isBackFace(t[0].position, t[1].position, t[2].position)) {
        continue;
      }

      // view frustum culling
      if (!this.isInViewport(t[0].position, t[1].position, t[2].position)) {
        continue;
      }

      // draw all triangles using the same color.
      this.drawTriangle(frameBuf, t[0], t[1], t[2], new Vector(0, 128, 255, 1));
    }
    return frameBuf;
  }

  /**
   * vertexProcessing prepares vertex uniforms and passes it to vertex
   * shader.
   *
   * @param tri is a given triangle
   * @param uniforms contains uniform values equal among all vertices
   * @returns
   */
  vertexProcessing(tri: Triangle, uniforms: Map<string, Matrix>): Vertex[] {
    return [
      this.vertexShader(tri.vertices[0], uniforms),
      this.vertexShader(tri.vertices[1], uniforms),
      this.vertexShader(tri.vertices[2], uniforms),
    ];
  }

  /**
   * vertexShader is a shader that applies on a given vertex and outputs
   * a new vertex.
   *
   * @param v is a given vertex
   * @param uniforms is the uniform values that are equal among all vertices
   * @returns a vertex
   */
  vertexShader(v: Vertex, uniforms: Map<string, Matrix>): Vertex {
    // TODO: implement a minimum vertex shader that transform the given
    // vertex from model space to screen space.
    //
    // One can use the UV and normal directly from input vertex without
    // applying any transformations. To access elements in a Map, one
    // can use .get() method.
    return new Vertex(new Vector(), new Vector(), new Vector());
  }

  /**
   * isBackFace checks if a given triangle is a back face or not. If the
   * face normal is orthogonal to the viewport, it is also considered as
   * a back face.
   *
   * @param v1 is a given vertex position
   * @param v2 is a given vertex position
   * @param v3 is a given vertex position
   * @returns whether the given triangle is a back face or not.
   */
  isBackFace(v1: Vector, v2: Vector, v3: Vector): boolean {
    // TODO: check whether the triangle of three given vertices is a
    // backface or not.
    return false;
  }

  /**
   * isInViewport asserts if the given triangles are in the
   * viewport view frustum [0, width] x [0, height] or not.
   *
   * @param v1 is a given vertex position
   * @param v2 is a given vertex position
   * @param v3 is a given vertex position
   * @returns true if the given triangle is in the view frustum, or false
   * otherwise.
   */
  isInViewport(v1: Vector, v2: Vector, v3: Vector): boolean {
    // TODO: implement view frustum culling assertion, test if a given
    // triangle is inside the screen space [0, width] x [0, height] or not.
    //
    // Hint: one can test if the AABB of the given triangle intersects
    // with the AABB of the viewport space.
    return false;
  }

  /**
   * drawTriangle draws the given triangle on the given frame buffer.
   *
   * @param v1 is a vertex
   * @param v2 is a vertex
   * @param v3 is a vertex
   */
  drawTriangle(
    frameBuf: Array<Vector>,
    v1: Vertex,
    v2: Vertex,
    v3: Vertex,
    color: Vector
  ) {
    // Compute AABB make the AABB a little bigger that align with pixels
    // to contain the entire triangle.
    const aabb = new AABB(v1.position, v2.position, v3.position);
    const xmin = Math.round(aabb.min.x) - 1;
    const xmax = Math.round(aabb.max.x) + 1;
    const ymin = Math.round(aabb.min.y) - 1;
    const ymax = Math.round(aabb.max.y) + 1;

    // Loop all pixels in the AABB and draw if it is inside the triangle
    for (let x = xmin; x < xmax; x++) {
      for (let y = ymin; y < ymax; y++) {
        const p = new Vector(x, y, 0, 1);
        if (!this.isInsideTriangle(p, v1.position, v2.position, v3.position)) {
          continue;
        }

        this.drawPixel(frameBuf, x, y, color);
      }
    }
  }

  /**
   * isInsideTriangle tests if a given position is inside the given triangle.
   * @param p is a given position
   * @param v1 is a given vertex
   * @param v2 is a given vertex
   * @param v3 is a given vertex
   * @returns true if p is inside triangle v1v2v3
   */
  isInsideTriangle(p: Vector, v1: Vector, v2: Vector, v3: Vector): boolean {
    // TODO: implement point in triangle assertion, returns true if the given
    // point is inside the given triangle (three vertices), or false otherwise.
    //
    // If the given point is on the edge of the given triangle, it is considered
    // as inside of the triangle in this implementation.
    return false;
  }
  /**
   * drawPixel draws a pixel by its given position (x, y), the drawing
   * color is stored in the frame buffer.
   *
   * @param frameBuf is a frame buffer for pixel drawing
   * @param x is x coordiantes in screen space
   * @param y is the y coordiante in screen space
   * @param color is the color to draw
   */
  drawPixel(frameBuf: Array<Vector>, x: number, y: number, color: Vector) {
    this.updateBuffer(frameBuf, x, y, color);
  }
  /**
   * updateBuffer updates a given buffer with a given value.
   * This is a generic function that can be used to update any type of buffers
   * that contains different types of values. However, there is no difference
   * from the caller side.
   *
   * @param buf is a given buffer.
   * @param i is the index of the row of buf
   * @param j is the index of the column of buf
   * @param value is the new value to be stored in the buffer.
   */
  updateBuffer<Type>(buf: Array<Type>, i: number, j: number, value: Type) {
    // TODO: implement the buffer update, update the corresponding values
    // in the given buffer by the given value. Any invalid inputs should
    // be discarded directly without bothring the buffer.
  }
}
