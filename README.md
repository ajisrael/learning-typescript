# Learning TypeScript

Following the book from the angular course [here]:(https://s3-us-west-1.amazonaws.com/angular-university/typescript-ebook/Typescript_Jumpstart)

## Type Interfaces and Annotations

### Interface:

Describes the properties on a class

```typescript
interface Course {
    name:string;
    lessonCount?:number;
}
```

### Annotation:

Annotates the type of a variable

```typescript
let course: Course = {
    name: 'Components and Directives',
    lessonCount: 20
};
```

### Assignment

The following code will not compile when assignig `course` to `named` because the `Named` interface is missing a `lessonCount` property.
Interestingly though, because all that is required for `Named` is the `name` property, the assignment of `named` to `course` will work and `named` will
now have the `lessonCount` property as well.

```typescript
interface Course {
    name:string;
    lessonCount:number;
}

interface Named {
    name:string;
}

let named : Named = {
    name: 'Name goes here'
};

let course: Course = {
    name: 'Components and Directives',
    lessonCount: 20
};

named = course; // works
course = named; // will not work
```

We can "fix" this by making `lessonCount` optional as shown in the following snippet:

```typescript
interface Course {
    name:string;
    lessonCount?:number;
}
```

## How to use libraries that don't have Type Definitions available?

### Setup a node project with `uuid` module

```bash
npm init
npm install --save-dev typescript
./node_modules/.bin/tsc --init
npm install --save uuid
```

Check version of typescript

```bash
./node_modules/.bin/tsc -v
```

Create playground file `index.ts` and import `uuid` module:

```typescript
import * as uuid from 'uuid';

console.log(uuid());
```

What is going on here:
- we are using the ES6 import syntax to import something from an ES6 module named uuid
- we are saying that the module will have a default export because we are using *
- We are assigning whatever that single export is and assigning it to a constant named uuid , but what type will it have?

Install `ts-node` to run the file

```bash
npm install --save-dev ts-node
```

Then update `package.json` to have a script to run the file

```json
{
    ...
    "scripts": {
        "demo": "./node_modules/.bin/ts-node ./test.ts"
    },
    ...
}
```

### NPM and Type Definitions

Some modules ship with their own types. The following is an example of just that:

```bash
npm install --save axios
```

Axois comes with it's own built in type definitions:

```bash
cd node_modules/axios
ls -1 *.d.ts
```

This will output `index.d.ts` which is a file that typescript looks for, for type definitions of a package, as denoted by the `.d.ts`

Now we have type definitions that we can use, like what is shown in the example below:

```typescript
import axios from "axios";
import { AxiosPromise } from "axios";

const response: AxiosPromise = axios.get('/lessons', {
	...
});
```

`AxiosPromise` is something we can use right out of the box.

### Make the most of Typescript type definitions

Navigate to `tsconfig.json` and set `noImplicitAny` to true. This will make sure the compiler doesn't imlicitly assign the `any` type to 
variables that it cannot infer the type.

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "sourceMap": false
    }
}
```

## Notes

### Any type

The any type allows for potentially any property, like plain JS.
So basically back to writing plain JS with no benefits of TS


