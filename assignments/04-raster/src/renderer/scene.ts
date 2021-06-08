/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */

import {ICamera} from '../camera/camera';
import {TriangleMesh} from '../geometry/mesh';

/**
 * Scene is a basic scene graph.
 */
export class Scene {
  mesh: TriangleMesh;
  camera: ICamera;

  /**
   * constructor constructs a very basic scene graph which only allow
   * to contain a triangle mesh and a camera.
   *
   * @param mesh is a triangle mesh
   * @param camera is a camera either is perspective or orthographic
   */
  constructor(mesh: TriangleMesh, camera: ICamera) {
    this.mesh = mesh;
    this.camera = camera;
  }
}
