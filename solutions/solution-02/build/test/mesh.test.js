"use strict";
/**
 * Copyright © 2021 LMU Munich Medieninformatik. All rights reserved.
 * Created by Changkun Ou <https://changkun.de>.
 *
 * Use of this source code is governed by a GNU GPLv3 license that
 * can be found in the LICENSE file.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const mesh_1 = require("../src/geometry/mesh");
const vec_1 = require("../src/linalg/vec");
let score = 0;
afterAll(() => {
    console.log(`Total points: ${score}`);
});
let data = '';
beforeAll(() => {
    // Load data once.
    data = fs.readFileSync('./test/testdata/tetrahedron.obj', 'utf-8');
});
// Test the number of positions, UVs, normals, and faces.
test('(+1.5p) LoadOBJ: Length', () => {
    const m = mesh_1.LoadOBJ(data);
    expect(m.faces.length).toBe(4);
    expect(m.positions.length).toBe(4);
    expect(m.uvs.length).toBe(12);
    expect(m.normals.length).toBe(4);
    score += 1.5;
});
// Test all vertex positions are stored in the positions property
test('(+1.5p) LoadOBJ: Vertex Position', () => {
    const m = mesh_1.LoadOBJ(data);
    const positions = m.positions;
    const want = [
        new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1),
        new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1),
        new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1),
        new vec_1.Vector(0.951827, -0.215059, -0.050857, 1),
    ];
    let anyNotFound = false;
    for (let i = 0; i < want.length; i++) {
        let exist = false;
        for (let j = 0; j < positions.length; j++) {
            if (positions[j].eq(want[i])) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            console.log('expect', want[i], 'to appear but does not exists');
            anyNotFound = true;
            break;
        }
    }
    expect(anyNotFound).toBe(false);
    score += 1.5;
});
// Test all uv coordinates are stored in the uvs property
test('(+1.5p) LoadOBJ: UV coordinates', () => {
    const m = mesh_1.LoadOBJ(data);
    const uvs = m.uvs;
    const want = [
        new vec_1.Vector(0.436598, 0.75356, 0, 1),
        new vec_1.Vector(0.833648, 0.512884, 0, 1),
        new vec_1.Vector(0.833648, 1.0, 0, 1),
        new vec_1.Vector(0.436598, 0.464299, 0, 1),
        new vec_1.Vector(0.0, 0.195168, 0, 1),
        new vec_1.Vector(0.436598, 0.0, 0, 1),
        new vec_1.Vector(0.0, 0.685842, 0, 1),
        new vec_1.Vector(0.423825, 0.464299, 0, 1),
        new vec_1.Vector(0.423825, 0.925956, 0, 1),
        new vec_1.Vector(0.436598, 0.25132, 0, 1),
        new vec_1.Vector(0.823853, 0.0, 0, 1),
        new vec_1.Vector(0.823853, 0.512884, 0, 1),
    ];
    let anyNotFound = false;
    for (let i = 0; i < want.length; i++) {
        let exist = false;
        for (let j = 0; j < uvs.length; j++) {
            if (uvs[j].eq(want[i])) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            console.log('expect', want[i], 'to appear but does not exists');
            anyNotFound = true;
            break;
        }
    }
    expect(anyNotFound).toBe(false);
    score += 1.5;
});
// Test all normals are stored in the normal property
test('(+1.5p) LoadOBJ: Normals', () => {
    const m = mesh_1.LoadOBJ(data);
    const normals = m.normals;
    const want = [
        new vec_1.Vector(0.3538, 0.234, -0.9056),
        new vec_1.Vector(0.4727, 0.4361, 0.7658),
        new vec_1.Vector(0.1202, -0.9926, -0.0146),
        new vec_1.Vector(-0.9454, 0.305, 0.1147),
    ];
    let anyNotFound = false;
    for (let i = 0; i < want.length; i++) {
        let exist = false;
        for (let j = 0; j < normals.length; j++) {
            if (normals[j].eq(want[i])) {
                exist = true;
                break;
            }
        }
        if (!exist) {
            console.log('expect', want[i], 'to appear but does not exists');
            anyNotFound = true;
            break;
        }
    }
    expect(anyNotFound).toBe(false);
    score += 1.5;
});
// Test all faces are stored
test('(+2p) LoadOBJ: Faces', () => {
    const want = [
        // face 1
        [
            new mesh_1.Vertex(new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1), new vec_1.Vector(0.436598, 0.75356, 0, 1), new vec_1.Vector(0.3538, 0.234, -0.9056, 0)),
            new mesh_1.Vertex(new vec_1.Vector(0.951827, -0.215059, -0.050857, 1), new vec_1.Vector(0.833648, 0.512884, 0, 1), new vec_1.Vector(0.3538, 0.234, -0.9056, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1), new vec_1.Vector(0.833648, 1.0, 0, 1), new vec_1.Vector(0.3538, 0.234, -0.9056, 0)),
        ],
        // face 2
        [
            new mesh_1.Vertex(new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1), new vec_1.Vector(0.436598, 0.464299, 0, 1), new vec_1.Vector(0.4727, 0.4361, 0.7658, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1), new vec_1.Vector(0.0, 0.195168, 0, 1), new vec_1.Vector(0.4727, 0.4361, 0.7658, 0)),
            new mesh_1.Vertex(new vec_1.Vector(0.951827, -0.215059, -0.050857, 1), new vec_1.Vector(0.436598, 0.0, 0, 1), new vec_1.Vector(0.4727, 0.4361, 0.7658, 0)),
        ],
        // face 3
        [
            new mesh_1.Vertex(new vec_1.Vector(0.951827, -0.215059, -0.050857, 1), new vec_1.Vector(0.0, 0.685842, 0, 1), new vec_1.Vector(0.1202, -0.9926, -0.0146, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1), new vec_1.Vector(0.423825, 0.464299, 0, 1), new vec_1.Vector(0.1202, -0.9926, -0.0146, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1), new vec_1.Vector(0.423825, 0.925956, 0, 1), new vec_1.Vector(0.1202, -0.9926, -0.0146, 0)),
        ],
        // face 4
        [
            new mesh_1.Vertex(new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1), new vec_1.Vector(0.436598, 0.25132, 0, 1), new vec_1.Vector(-0.9454, 0.305, 0.1147, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1), new vec_1.Vector(0.823853, 0.0, 0, 1), new vec_1.Vector(-0.9454, 0.305, 0.1147, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1), new vec_1.Vector(0.823853, 0.512884, 0, 1), new vec_1.Vector(-0.9454, 0.305, 0.1147, 0)),
        ],
    ];
    const m = mesh_1.LoadOBJ(data);
    const faces = m.faces;
    const checkContainsInAnyOrder = (got, want) => {
        let contains = 0;
        for (let i = 0; i < got.length; i++) {
            const gotPos = got[i].position;
            const gotUV = got[i].uv;
            const gotNormal = got[i].normal;
            let found = false;
            for (let j = 0; j < want.length; j++) {
                if (gotPos.eq(want[j].position) &&
                    gotUV.eq(want[j].uv) &&
                    gotNormal.eq(want[j].normal)) {
                    found = true;
                }
            }
            if (found) {
                contains += 1;
            }
        }
        if (contains !== 3) {
            return false;
        }
        return true;
    };
    for (let i = 0; i < faces.length; i++) {
        const f = faces[i];
        // check the vertices in any of the group of the wanted data.
        // three properties must be correct.
        let contains = false;
        for (let j = 0; j < want.length; j++) {
            const vs = want[i];
            // check the three vertices appears in a face in any order
            if (checkContainsInAnyOrder(f.vertices, vs)) {
                contains = true;
                break;
            }
        }
        expect(contains).toBe(true);
    }
    score += 2;
});
// Test all faces are in expected order
test('(+2p) LoadOBJ: Faces with vertices in counterclockwise order', () => {
    const want = [
        // face 1
        [
            new mesh_1.Vertex(new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1), new vec_1.Vector(0.436598, 0.75356, 0, 1), new vec_1.Vector(0.3538, 0.234, -0.9056, 0)),
            new mesh_1.Vertex(new vec_1.Vector(0.951827, -0.215059, -0.050857, 1), new vec_1.Vector(0.833648, 0.512884, 0, 1), new vec_1.Vector(0.3538, 0.234, -0.9056, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1), new vec_1.Vector(0.833648, 1.0, 0, 1), new vec_1.Vector(0.3538, 0.234, -0.9056, 0)),
        ],
        // face 2
        [
            new mesh_1.Vertex(new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1), new vec_1.Vector(0.436598, 0.464299, 0, 1), new vec_1.Vector(0.4727, 0.4361, 0.7658, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1), new vec_1.Vector(0.0, 0.195168, 0, 1), new vec_1.Vector(0.4727, 0.4361, 0.7658, 0)),
            new mesh_1.Vertex(new vec_1.Vector(0.951827, -0.215059, -0.050857, 1), new vec_1.Vector(0.436598, 0.0, 0, 1), new vec_1.Vector(0.4727, 0.4361, 0.7658, 0)),
        ],
        // face 3
        [
            new mesh_1.Vertex(new vec_1.Vector(0.951827, -0.215059, -0.050857, 1), new vec_1.Vector(0.0, 0.685842, 0, 1), new vec_1.Vector(0.1202, -0.9926, -0.0146, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1), new vec_1.Vector(0.423825, 0.464299, 0, 1), new vec_1.Vector(0.1202, -0.9926, -0.0146, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1), new vec_1.Vector(0.423825, 0.925956, 0, 1), new vec_1.Vector(0.1202, -0.9926, -0.0146, 0)),
        ],
        // face 4
        [
            new mesh_1.Vertex(new vec_1.Vector(-0.55029, -0.387725, -0.682297, 1), new vec_1.Vector(0.436598, 0.25132, 0, 1), new vec_1.Vector(-0.9454, 0.305, 0.1147, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.363322, -0.387725, 0.85933, 1), new vec_1.Vector(0.823853, 0.0, 0, 1), new vec_1.Vector(-0.9454, 0.305, 0.1147, 0)),
            new mesh_1.Vertex(new vec_1.Vector(-0.038214, 0.990508, -0.126177, 1), new vec_1.Vector(0.823853, 0.512884, 0, 1), new vec_1.Vector(-0.9454, 0.305, 0.1147, 0)),
        ],
    ];
    const m = mesh_1.LoadOBJ(data);
    const faces = m.faces;
    const checkContainsInCounterClockWiseOrder = (got, want) => {
        let contains = false;
        const possibleOrders = [
            [want[0], want[1], want[2]],
            [want[1], want[2], want[0]],
            [want[2], want[0], want[1]],
        ];
        for (let i = 0; i < possibleOrders.length; i++) {
            const anOrder = possibleOrders[i];
            let ok = 0;
            // check by order and everything equals as expected.
            for (let j = 0; j < got.length; j++) {
                if (got[j].position.eq(anOrder[j].position) &&
                    got[j].uv.eq(anOrder[j].uv) &&
                    got[j].normal.eq(anOrder[j].normal)) {
                    ok += 1;
                }
            }
            if (ok === 3) {
                contains = true;
                break;
            }
        }
        return contains;
    };
    for (let i = 0; i < faces.length; i++) {
        const f = faces[i];
        // check the vertices in any of the group of the wanted data.
        // three properties must be correct.
        let contains = false;
        for (let j = 0; j < want.length; j++) {
            const vs = want[i];
            // check the three vertices appears in a face in any order
            if (checkContainsInCounterClockWiseOrder(f.vertices, vs)) {
                contains = true;
                break;
            }
        }
        expect(contains).toBe(true);
    }
    score += 2;
});
//# sourceMappingURL=mesh.test.js.map