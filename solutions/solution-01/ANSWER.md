# Assignment 1: Transformation

## Task 1

- [0.5/0.5] 1.1 a): AB; or A multiplied with B; or matrix multiplication
- [0.5/0.5] 1.1 b): p,q need to be equal; undefined if not equal
- [0.5/0.5] 1.1 c): no relation; does not matter
- [0.5/0.5] 1.1 d): $m\times n$, or $C \in R^{m\times n}$
- [1/1] 1.2 a): g, then h, then f ; mathematically fhg or f(h(g(p)))
- [0.5/0.5] 1.2 b): no
- [1.5/1.5] 1.2 c): gimbal lock; two planes are locked together; only 1-axis rotation.

## Task 2

Run tests using `npm test` should result in the following:

```
 PASS  test/linalg.test.ts
  ✓ Vector.eq (1 ms)
  ✓ Matrix.eq (1 ms)
  ✓ (+0.5) Vector.add
  ✓ (+0.5) Vector.sub
  ✓ (+0.5) Vector.dot (4 ms)
  ✓ (+0.5) Vector.cross (1 ms)
  ✓ (+0.5) Vector.unit (2 ms)
  ✓ (+0.5) Vector.apply
  ✓ (+0.5) Matrix.add (1 ms)
  ✓ (+0.5) Matrix.sub
  ✓ (+0.5) Matrix.mul
  ✓ (+0.5) Matrix.T
  ✓ Matrix.det (1 ms)
  ✓ Matrix.inv (11 ms)

Test Suites: 2 passed, 2 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        2.002 s
Ran all test suites.
  console.log
    Total points: 5
```

If there are any tests failed, then it should look similar to the following:

```
 FAIL  test/linalg.test.ts
  ✓ Vector.eq (1 ms)
  ✓ Matrix.eq (1 ms)
  ✓ (+0.5) Vector.add
  ✓ (+0.5) Vector.sub
  ✓ (+0.5) Vector.dot (4 ms)
  ✕ (+0.5) Vector.cross (13 ms)
  ✓ (+0.5) Vector.unit (1 ms)
  ✓ (+0.5) Vector.apply (1 ms)
  ✓ (+0.5) Matrix.add
  ✓ (+0.5) Matrix.sub
  ✓ (+0.5) Matrix.mul (1 ms)
  ✓ (+0.5) Matrix.T
  ✓ Matrix.det
  ✓ Matrix.inv (12 ms)

  ● (+0.5) Vector.cross

    expect(received).toEqual(expected) // deep equality

    Expected: true
    Received: false

      135 |   got = new Vector(1, 2, 3, 0).cross(new Vector(1, 2, 3, 0));
      136 |   want = new Vector(0, 0, 0, 0);
    > 137 |   expect(checkEqual(got, want)).toEqual(true);
          |                                 ^
      138 | 
      139 |   got = new Vector(1, 0, 0, 0).cross(new Vector(0, 1, 0, 0));
      140 |   want = new Vector(0, 0, 1, 0);

      at Object.<anonymous> (test/linalg.test.ts:137:33)

Test Suites: 2 failed, 2 total
Tests:       2 failed, 26 passed, 28 total
Snapshots:   0 total
Time:        2.109 s
Ran all test suites.
  console.log
    (+0.5) Vector.cross
     - Expected
    + Received
    
      Vector {
        "w": 0,
        "x": 0,
    -   "y": 0,
    -   "z": 0,
    +   "y": 3,
    +   "z": -3,
      }

      at checkEqual (test/linalg.test.ts:48:13)

  console.log
    Total points: 4.5

      at Object.<anonymous> (test/linalg.test.ts:16:11)
```

As one can see:

```
  ✓ (+0.5) Vector.add
  ✓ (+0.5) Vector.sub
  ✓ (+0.5) Vector.dot (4 ms)
  ✕ (+0.5) Vector.cross (13 ms)
  ✓ (+0.5) Vector.unit (1 ms)
  ✓ (+0.5) Vector.apply (1 ms)
  ✓ (+0.5) Matrix.add
  ✓ (+0.5) Matrix.sub
  ✓ (+0.5) Matrix.mul (1 ms)
  ✓ (+0.5) Matrix.T
```

The `cross` failed because of:

```
(+0.5) Vector.cross
- Expected
+ Received

  Vector {
    "w": 0,
    "x": 0,
-   "y": 0,
-   "z": 0,
+   "y": 3,
+   "z": -3,
  }
```

And the total calculated points are: 4.5.


The grading template of Task 2 will look like:

```
- [0.5/0.5] Vector.add(): OK


- [0.5/0.5] Vector.sub(): OK


- [0.5/0.5] Vector.dot(): OK


- [0/0.5] Vector.cross(): FAIL

- Expected
+ Received

  Vector {
    "w": 0,
    "x": 0,
-   "y": 0,
-   "z": 0,
+   "y": 3,
+   "z": -3,
  }

- [0.5/0.5] Vector.unit(): OK


- [0.5/0.5] Vector.apply(): OK


- [0.5/0.5] Matrix.add(): OK


- [0.5/0.5] Matrix.sub(): OK


- [0.5/0.5] Matrix.mul(): OK
```