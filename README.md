[![Continuous Integration](https://github.com/kaiosilveira/encapsulate-variable-refactoring/actions/workflows/ci.yml/badge.svg)](https://github.com/kaiosilveira/encpasulate-variable-refactoring/actions/workflows/ci.yml)

ℹ️ _This repository is part of my "refactoring" catalog based on Fowler's book with the same title. Please see [kaiosilveira/refactoring](https://github.com/kaiosilveira/refactoring) for more details._

---

# Rename Variable

<table>
<thead>
<th>Before</th>
<th>After</th>
</thead>
<tbody>
<tr>
<td>

```javascript
let a = height * width;
```

</td>

<td>

```javascript
let area = height * width;
```

</td>
</tr>
</tbody>
</table>

Variable names are one of the most important aspects of our software systems. They play an integral role in explaining to code readers what a given piece of code does and how things relate to each other. Usually, as our knowledge about the domain evolves, a natural need to change variable names to better reflect both our understanding and the actual behavior of the system arises. This refactoring shares some general ideas on how to accomplish this task.

## Working examples

There are two working examples for this refactoring: The first one is the simplest case possible: a variable in a limited, short scope, and the second one is a more involved example, with multiple external callers consuming the variable.

### Example #1: The simplest case

In this example, we have a function that has a variable that can be renamed to better represent its intent. The function is small in scope and the variable is internal to the function, so it's a pretty straightforward refactoring. Our starting code looks like this:

```javascript
function calculateArea({ width, height }) {
  let a = height * width;
  return a;
}
```

#### Test suite

A simple test was put in place to make sure the area is being calculated correctly:

```javascript
describe('calculateArea', () => {
  it('should calculate the correct area for a given width and height', () => {
    const result = calculateArea({ width: 4, height: 4 });
    expect(result).toEqual(16);
  });
});
```

#### Steps

As the variable is internal to the function's scope, we can simply rename it directly:

```diff
diff --git a/calculate-area/index.js b/calculate-area/index.js
@@ -1,6 +1,6 @@
 function calculateArea({ width, height }) {
-  let a = height * width;
-  return a;
+  let area = height * width;
+  return area;
 }

 module.exports = { calculateArea };
```

And we are done!

#### Commit history

| Commit SHA                                                                                                             | Message              |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------- |
| [1b289e1](https://github.com/kaiosilveira/rename-variable-refactoring/commit/1b289e1f9238424c7bd3e93733e5b444cd4ba51d) | rename `a` to `area` |

### Example #2: Renaming a constant

In this example, we have a variable that is exported and used by some callers, which makes the refactoring a little bit more delicate, but still possible. Our starting code looks like this:

```javascript
const cpyNm = 'Acme Gooseberries';
```

#### Steps

To proceed with this refactoring, we first introduce a new variable with the new name:

```diff
diff --git a/constant/company-name.js b/constant/company-name.js
index e717fdd..ac36a77 100644
 const cpyNm = 'Acme Gooseberries';
-module.exports = { cpyNm };
+const companyName = cpyNm;
+
+module.exports = { cpyNm, companyName };
```

Then, we update the callers to use the new variable:

```diff
diff --git a/constant/caller1.js b/constant/caller1.js
@@ -1,2 +1,2 @@
-const { cpyNm } = require('./company-name');
-console.log(cpyNm);
+const { companyName } = require('./company-name');
+console.log(companyName);

diff --git a/constant/caller2.js b/constant/caller2.js
@@ -1,2 +1,2 @@
-const { cpyNm } = require('./company-name');
-console.log(`Company name is "${cpyNm}"`);
+const { companyName } = require('./company-name');
+console.log(`Company name is "${companyName}"`);
```

And finally, we remove the now old and unused `cpyNm` variable:

```diff
diff --git a/constant/company-name.js b/constant/company-name.js
@@ -1,4 +1,3 @@
-const cpyNm = 'Acme Gooseberries';
-const companyName = cpyNm;
+const companyName = 'Acme Gooseberries';

-module.exports = { cpyNm, companyName };
+module.exports = { companyName };
```

And that's it!

#### Commit history

| Commit SHA                                                                                                             | Message                                    |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [a902939](https://github.com/kaiosilveira/rename-variable-refactoring/commit/a902939a8fcf5bf6dc413becece648c919091fb9) | introduce variable with new name           |
| [53e9507](https://github.com/kaiosilveira/rename-variable-refactoring/commit/53e95070fa34f3a5caf5ad3c5950321c060a0b19) | update callers to use new variable         |
| [097b439](https://github.com/kaiosilveira/rename-variable-refactoring/commit/097b439fd558988e5e2646c47f1743e3379c8075) | remove now old and unused `cpyNm` variable |
