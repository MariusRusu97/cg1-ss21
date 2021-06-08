/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {
  BoxBufferGeometry,
  BufferAttribute,
  BufferGeometry,
  FrontSide,
  LineSegments,
  Mesh,
  MeshPhongMaterial,
  PointLight,
  Vector3,
  WireframeGeometry,
} from 'three';

import {Vector} from './linalg/vec';
import {LoadOBJ, TriangleMesh, Vertex} from './geometry/mesh';
import {ICamera, PerspectiveCamera} from './camera/camera';
import {GLRenderer} from './gl';

export class CameraViewingPipeline extends GLRenderer {
  bunny?: TriangleMesh;
  cam?: ICamera;

  constructor() {
    super();

    const params = {
      color: 0xffffff,
      intensity: 1,
      distance: 5,
      position: new Vector3(0.5, 0.5, 0.5),
    };
    const light = new PointLight(
      params.color,
      params.intensity,
      params.distance
    );
    light.position.copy(params.position);
    this.scene.add(light);
  }
  async loadBunny(): Promise<TriangleMesh> {
    const resp = await fetch('./assets/bunny.obj');
    const data = await resp.text();
    const bunny = LoadOBJ(data);
    bunny.rotate(new Vector(0, 0, 1, 0), Math.PI / 6);
    bunny.scale(2, 2, 2);
    bunny.scale(2, 2, 2);
    bunny.translate(0.5, -0.2, -0.5);
    return bunny;
  }
  loadCamera() {
    const params = {
      pos: new Vector(-0.5, 0.5, 0.5, 1),
      lookAt: new Vector(0, 0, -0.5, 1),
      up: new Vector(0, 1, 0, 0),
    };
    const perspParam = {
      fov: 45,
      aspect: window.innerWidth / window.innerHeight,
      near: -0.1,
      far: -3,
    };
    return new PerspectiveCamera(
      params.pos,
      params.lookAt,
      params.up,
      perspParam.fov,
      perspParam.aspect,
      perspParam.near,
      perspParam.far
    );
  }
  async visualize() {
    const bunny = await this.loadBunny();
    const camera = this.loadCamera();

    const projSpace = new WireframeGeometry(new BoxBufferGeometry(2, 2, 2));
    const projCube = new LineSegments(projSpace);
    projCube.name = 'projcube';
    this.scene.add(projCube);

    const modelMatrix = bunny.modelMatrix();
    const viewMatrix = camera.viewMatrix();
    const projMatrix = camera.projMatrix();
    for (let i = 0; i < bunny.faces.length; i++) {
      for (let j = 0; j < bunny.faces[i].vertices.length; j++) {
        let v = bunny.faces[i].vertices[j].position;
        v = v.apply(modelMatrix);
        v = v.apply(viewMatrix);
        v = v.apply(projMatrix);
        v = v.scale(1 / v.w);
        bunny.faces[i].vertices[j].position = v;
      }
    }
    this.show(bunny);
  }
  show(bunny: TriangleMesh) {
    // Early error checking.
    if (bunny.faces === undefined || bunny.faces === null) {
      throw new Error(
        'Expect a TriangleMesh contains an array of Face, but got:' +
          bunny.faces
      );
    }
    if (bunny.faces.length > 1e6) {
      throw new Error('The array of Face is too big, there must be a mistake.');
    }

    // Start converting TriangleMesh to a BufferGeometry.
    const vs: Vertex[] = [];
    bunny.faces.forEach(f => {
      vs.push(...f.vertices);
    });

    const idxs: Uint32Array = new Uint32Array(vs.length);
    const bufPos: Float32Array = new Float32Array(vs.length * 3);
    const bufUV: Float32Array = new Float32Array(vs.length * 3);
    const bufColor: Float32Array = new Float32Array(vs.length * 3);
    const bufNormal: Float32Array = new Float32Array(vs.length * 3);

    for (let idx = 0; idx < vs.length; idx++) {
      const v = vs[idx];

      // indices
      idxs[3 * idx + 0] = 3 * idx + 0;
      idxs[3 * idx + 1] = 3 * idx + 1;
      idxs[3 * idx + 2] = 3 * idx + 2;

      // vertex positions
      bufPos[3 * idx + 0] = v.position.x;
      bufPos[3 * idx + 1] = v.position.y;
      bufPos[3 * idx + 2] = v.position.z;

      // vertex uv
      bufUV[3 * idx + 0] = v.uv.x;
      bufUV[3 * idx + 1] = v.uv.y;
      bufUV[3 * idx + 2] = 0;

      // vertex colors
      bufColor[3 * idx + 0] = 0;
      bufColor[3 * idx + 1] = 0.5;
      bufColor[3 * idx + 2] = 1;

      // vertex normals
      bufNormal[3 * idx + 0] = v.normal.x;
      bufNormal[3 * idx + 1] = v.normal.y;
      bufNormal[3 * idx + 2] = v.normal.z;
    }

    const g = new BufferGeometry();
    g.setIndex(new BufferAttribute(idxs, 1));
    g.setAttribute('position', new BufferAttribute(bufPos, 3));
    g.setAttribute('uv', new BufferAttribute(bufUV, 3));
    g.setAttribute('color', new BufferAttribute(bufColor, 3));
    g.setAttribute('normal', new BufferAttribute(bufNormal, 3));
    this.scene.add(
      new Mesh(
        g,
        new MeshPhongMaterial({
          vertexColors: true,
          side: FrontSide,
          flatShading: true,
        })
      )
    );
  }
}
