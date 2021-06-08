/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 *
 * Created by Changkun Ou <https://changkun.de> in 2020,
 * modified by Florian Lang <florian.lang@ifi.lmu.de> in 2021.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {Vector2, Mesh, MeshBasicMaterial, PlaneGeometry} from 'three';
import Renderer from './renderer';

export default class Bresenham extends Renderer {
  constructor() {
    super();
    const color = 0xffff00;
    const x0 = 40;
    const y0 = 40;
    const r = 30;
    const p1 = new Vector2(x0, y0);
    this.drawPoint(p1.x, p1.y, color);

    const thetas = [];
    for (let i = 0; i <= 360; i += 15) {
      thetas.push(i);
    }
    thetas.forEach(theta => {
      const x = Math.round(x0 + r * Math.cos((theta * Math.PI) / 180));
      const y = Math.round(y0 + r * Math.sin((theta * Math.PI) / 180));
      const p2 = new Vector2(x, y);
      this.drawLine(p1, p2, color);
    });

    const tri = [
      new Vector2(80, 30),
      new Vector2(100, 50),
      new Vector2(120, 20),
    ];

    this.drawTriangle(tri[0], tri[1], tri[2], color);
  }
  /**
   * drawPoint draws a given pixel using the given color
   * @param {number} x coordinates
   * @param {number} y coordinates
   * @param {number} color color to fill
   */
  drawPoint(x: number, y: number, color: number) {
    const m = new Mesh(
      new PlaneGeometry(1, 1, 1, 1),
      new MeshBasicMaterial({color: color || 0xffffff})
    );
    m.translateX(x + 0.5);
    m.translateY(y + 0.5);
    this.scene.add(m);
  }

  /**
   * drawLine draws a line with given starting point p1 till
   * the end point p2 with given color, which implements the
   * Bresenham algorithm.
   * @param {Vector2} p1 start point of the line
   * @param {Vector2} p2 end point of the line
   * @param {number} color color of the line
   */
  drawLine(p1: Vector2, p2: Vector2, color: number) {
    // TODO: implement Bresenham algorithm

    // 0 <= |slope| < 1
    if (Math.abs(p2.y - p1.y) < Math.abs(p2.x - p1.x)) {
      // change direction if going left
      if (p1.x > p2.x) [p1, p2] = [p2, p1];
      this.drawLineLow(p1.x, p1.y, p2.x, p2.y, color);

      // |slope| >= 1 && dx === 0
    } else {
      // change direction if going down
      if (p1.y > p2.y) [p1, p2] = [p2, p1];
      this.drawLineHigh(p1.x, p1.y, p2.x, p2.y, color);
    }
  }

  // usual case for 0 <= |slope| < 1
  drawLineLow(x0: number, y0: number, x1: number, y1: number, color: number) {
    const dx = x1 - x0;
    let dy = y1 - y0;
    let yi = 1;

    // if going down change sign
    if (dy < 0) {
      yi = -1;
      dy = -dy;
    }

    // init error with starting value
    let D = 2 * dy - dx;

    // start at first y and first x; iterate
    let y = y0;
    for (let x = x0; x <= x1; x++) {
      this.drawPoint(x, y, color);

      // go one pixel up in y direction; decrease error
      if (D > 0) {
        y += yi;
        D -= 2 * dx;
      }

      // increase error
      D += 2 * dy;
    }

    /*
    EXAMPLE:

      p1 = (1,2)
      p2 = (3,3)

      dx = 3-1 = 2
      dy = 3-2 = 1

      D = 2 * 2 - 1 = 3

      first loop:

        (D = 3) > 0   --> go one pixel up

          D = 3 - (2 * 2) = -1
          D = -1 + (2 * 1) = 1

      second loop:

        (D = 1) > 0   --> go one pixel up

          D = 1 - (2 * 2) = -3
          D = -3 + (2 * 1) = -1

      third loop:

        (D = -1) < 0  --> DO NOT go one pixel up

          D = -1 + (2 * 1) = 1

    */
  }

  drawLineHigh(x0: number, y0: number, x1: number, y1: number, color: number) {
    let dx = x1 - x0;
    const dy = y1 - y0;
    let xi = 1;
    if (dx < 0) {
      xi = -1;
      dx = -dx;
    }
    let D = 2 * dx - dy;
    let x = x0;
    for (let y = y0; y <= y1; y++) {
      this.drawPoint(x, y, color);
      if (D > 0) {
        x += xi;
        D -= 2 * dy;
      }
      D += 2 * dx;
    }
  }

  drawTriangle(v1: Vector2, v2: Vector2, v3: Vector2, color: number) {
    // TODO: implement the scan line algorithm for filling triangles
    // sort three vertices to guarantee v1.y > v2.y > v3.y

    // Round the positions so that the drawPoint always on the center of a pixel
    v1 = new Vector2(Math.round(v1.x), Math.round(v1.y));
    v2 = new Vector2(Math.round(v2.x), Math.round(v2.y));
    v3 = new Vector2(Math.round(v3.x), Math.round(v3.y));

    if (v2.y >= v1.y && v2.y >= v3.y) [v1, v2] = [v2, v1];
    if (v3.y >= v1.y && v3.y >= v2.y) [v1, v3] = [v3, v1];
    if (v3.y > v2.y) [v2, v3] = [v3, v2];

    // split triangle into top and bottom
    const v4 = new Vector2(
      v1.x + ((v2.y - v1.y) / (v3.y - v1.y)) * (v3.x - v1.x),
      v2.y
    );

    if (v4.x !== v1.x) this.drawTriangleTop(v2, v4, v1, color);
    if (v4.x !== v3.x) this.drawTriangleBottom(v3, v4, v2, color);
  }

  drawTriangleTop(v1: Vector2, v2: Vector2, v3: Vector2, color: number) {
    const invsploe1 = (v3.x - v1.x) / (v3.y - v1.y);
    const invsploe2 = (v3.x - v2.x) / (v3.y - v2.y);

    let curx1 = v3.x;
    let curx2 = v3.x;

    // decrese Y coord
    for (let scanlineY = v3.y; scanlineY > v1.y; scanlineY--) {
      this.drawLine(
        new Vector2(Math.round(curx1), scanlineY),
        new Vector2(Math.round(curx2), scanlineY),
        color
      );
      curx1 -= invsploe1;
      curx2 -= invsploe2;
    }
  }
  drawTriangleBottom(v1: Vector2, v2: Vector2, v3: Vector2, color: number) {
    const invsploe1 = (v2.x - v1.x) / (v2.y - v1.y);
    const invsploe2 = (v3.x - v1.x) / (v3.y - v1.y);

    let curx1 = v1.x;
    let curx2 = v1.x;

    // increase Y coord
    for (let scanlineY = v1.y; scanlineY <= v2.y; scanlineY++) {
      this.drawLine(
        new Vector2(Math.round(curx1), scanlineY),
        new Vector2(Math.round(curx2), scanlineY),
        color
      );
      curx1 += invsploe1;
      curx2 += invsploe2;
    }
  }
}

new Bresenham().render();
