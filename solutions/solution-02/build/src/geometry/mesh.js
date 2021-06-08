"use strict";
/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadOBJ = exports.TriangleMesh = exports.Triangle = exports.Vertex = void 0;
// Note: you are not allowed to add any new imports.
const vec_1 = require("../linalg/vec");
/**
 * A Vertex contains all supported vertex information, such as position,
 * uv, and normal.
 */
class Vertex {
    constructor(position, uv, normal) {
        this.position = position;
        this.uv = uv;
        this.normal = normal;
    }
}
exports.Vertex = Vertex;
/**
 * Triangle implements Face and represents a triangle with only 3 vertices.
 */
class Triangle {
    constructor(vs) {
        if (vs.length !== 3) {
            throw new Error('number of input vertices is not euqal to 3');
        }
        this.vertices = vs;
    }
}
exports.Triangle = Triangle;
/**
 * TriangleMesh implements Mesh and represents a triangle mesh.
 */
class TriangleMesh {
    constructor(triangles, positions, uvs, normals) {
        this.faces = triangles;
        this.positions = positions;
        this.uvs = uvs;
        this.normals = normals;
    }
}
exports.TriangleMesh = TriangleMesh;
/**
 * LoadOBJ loads a .obj input data and turns it into a TriangleMesh.
 *
 * @param data is a string that contains data from a .obj file
 * @returns a TriangleMesh that represents the input mesh.
 */
function LoadOBJ(data) {
    // TODO: parse the input `data` into a TriangleMesh.
    //
    // Hints:
    // - If you are not familiar with how input data looks like, you could
    //   use console.log(data) to print out the data in the browser console.
    // - Do not overthink it. It is possible to implement this funcntion in
    //   less than 40 lines.
    // - You are allowed to change anything inside this function
    //   but nothing else (outside the function).
    // - You could adjust the main.ts for debugging purpose but that is not
    //   necessary for the task.
    // The following code is an example taken from the tutorial breakouts.
    // It offers help in understanding how a TriangleMesh is returned
    // and how it is expected for rendering.
    // To implement an OBJ file loader, you can modify anything inside this
    // function, but nothing else (outside the function).
    const ts = [];
    const positions = [];
    const uvs = [];
    const normals = [];
    const lines = data.split('\n');
    for (let line of lines) {
        line = line.trim();
        const tokens = line.split(' ');
        const vertices = [];
        switch (tokens[0].trim()) {
            case 'v':
                positions.push(new vec_1.Vector(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]), 1));
                break;
            case 'vt':
                uvs.push(new vec_1.Vector(parseFloat(tokens[1]), parseFloat(tokens[2]), 0, 1));
                break;
            case 'vn':
                normals.push(new vec_1.Vector(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]), 0));
                break;
            case 'f':
                for (let i = 1; i < tokens.length; i++) {
                    const vIdx = parseInt(tokens[i].split('/')[0].trim()) - 1;
                    const uvIdx = parseInt(tokens[i].split('/')[1].trim()) - 1;
                    const nIdx = parseInt(tokens[i].split('/')[2].trim()) - 1;
                    vertices.push(new Vertex(positions[vIdx], uvs[uvIdx], normals[nIdx]));
                }
                ts.push(new Triangle(vertices));
                break;
        }
    }
    // Your initial scene will be an blue tetrahedron as returned.
    return new TriangleMesh(ts, positions, uvs, normals);
}
exports.LoadOBJ = LoadOBJ;
//# sourceMappingURL=mesh.js.map