# Learning TypeScript

Following the book from the angular course [here](https://s3-us-west-1.amazonaws.com/angular-university/typescript-ebook/Typescript_Jumpstart)

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

### Writing Node programs using the standard Promise API

```bash
npm install --save request
npm install --save request-promise
```

These libraries together return Promise-like types that are compatible with ES6 promises.

### Using Node require in Typescript programs

`request-promise` is has the same API as `request` but it returns promises. To use it we can start with a plain node module, like this:

```typescript
const rp = require('request-promise');
```

But this will cause an error since there is no type definition for `require`.

To resolve this, we need to install node types:

```bash
npm install @types/node --save-dev
```

### What is @types , when should I use it and why?

The `@types` scoped package has a lot of useful type definitions.

The TS compiler will look inside `node_modules/@types` during compilation

Only use these types if they are not included in the library by default

### Using Request Promise to build a type safe promise call

Start by uninstalling `axios` and get the types for `request-promise`

```bash
npm uninstall axios --save
npm instal --save-dev @types/request-promise
```

Now we can have something like this.

```typescript
import * as rp from 'request-promise';

interface Lesson {
	id:number;
	description: string;
}

function getLesson(lessonId:number): Promise<Lesson> {
	return rp.get(`lessons/${lessonId}`);
}

const promise = getLesson(1);

promise.then(lesson => {
	// .... we want this lesson variable to be implicitly of type Lesson
});
```

There is a catch though. Look at the following code example:

```typescript
import * as rp from 'request-promise';

interface Lesson {
    id:number;
    description: string;
}

function getLesson(lessonId:number): Promise<Lesson> {
    return rp.get(`lessons/${lessonId}`)
        .then((lesson:any) => Promise.resolve(lesson.description));
}
```
** From the book : pg 35 **
The function is returning a Promise of string, because the lesson has been transformed into a string
by the then clause. But yet the program compiles without any error.
**

So you need to be careful with what you rely on type definitions to do

## Notes

### Any type

The any type allows for potentially any property, like plain JS.
So basically back to writing plain JS with no benefits of TS


