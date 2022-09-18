1. Create a promise. Have it resolve with a value of `Promise Resolved!` in resolve after a delay of 1000ms, using `setTimeout`. Print the contents of the promise after it has been resolved by passing `console.log` to `.then`

```js
// Your code
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promise Resolved!"), 1000);
}).then((value) => console.log(value));
```

2. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch`

```js
// Your code
let promise = new Promise((resolve, reject) => {
  reject(`Rejected Promise!`);
}).catch((error) => console.log(error));
```

3. Create another promise. Now have it reject with a value of `Rejected Promise!` without using `setTimeout`. Print the contents of the promise after it has been rejected by passing console.log to `.catch` and also use `.finally` to log message `Promise Settled!`.

```js
// Your code
let promise = new Promise((resolve, reject) => {
  reject(`Rejected Promise!`);
})
  .catch((error) => console.log(error))
  .finally(() => console.log("Promise Settled!"));
```

4. What will be the output of the code below.

```js
console.log("A");

// Asynchronous code finises in 0 seconds (Callback Queue)
setTimeout(() => console.log("B"), 0); // callback queue

// A promise that resolves right away (Microtask Queue)
Promise.resolve().then(() => console.log("C"));

console.log("D");
/*Output
A
D
C
B
*/
```

5. Write a function named `wait` that accepts `time` in ms returns a promise. The promise gets resolved after given time.

```js
// Your code
function wait(time) {
  return new Promise((res, rej) => {
    setTimeout(() => res(console.log("Resolved")), time);
  });
}
```

6. Do the following:

- Create a new promise
- Resolve with 21
- Use `.then` and return adding `10` to the value you will get as parameter
- Use `.then` and return adding `100` to the value you will get as parameter
- Use `.then` and check if the value you get is greater than `100` throw new error with any message
- Catch the error using `.catch`

```js
// Your code
Promise.resolve(21)
  .then((value) => value + 10)
  .then((value) => value + 100)
  .then((value) => {
    if (value > 100) {
      throw new Error("Value is Greater than 100");
    }
  })
  .catch((error) => console.log(error));
```

7. Do the following:

- Create a new promise
- Resolve the promise with `['A']`
- Use `.then` and concat `B` into the parameter and return
- Use `.then` and return and object like `{0: 'A', 1: 'B'}`
- Use `.then` and log the value

```js
Promise.resolve(["A"])
  .then((value) => value.concat("B"))
  .then((array) => {
    return { ...array };
  })
  .then((obj) => console.log(obj));
```

8. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Chain `.then` on above and return `3` also check the value you get access to by logging
- Chain `.then` on above and return `4` also check the value you get access to by logging

```js
// Your code
let first = new Promise((res, rej) => {
  res(1);
});
first
  .then((val) => {
    console.log(val);
    return 2;
  })
  .then((val) => {
    console.log(val);
    return 3;
  })
  .then((val) => {
    console.log(val);
    return 4;
  });
```

9. Do the following:

- Create a new promise named `first` and resolve it with `1`
- Use `.then` on `first` and return `2` also check the value you get access to by logging
- Use `.then` on `first` and return `3` also check the value you get access to by logging
- Use `.then` on `first` and return `4` also check the value you get access to by logging

```js
// Your code
let first = new Promise((res, rej) => {
  res(1);
});
first.then((val) => {
  console.log(val);
  return 2;
});
first.then((val) => {
  console.log(val);
  return 3;
});
first.then((val) => {
  console.log(val);
  return 4;
});
```

10. Try to understand the difference between the problem 8 and 9. Write your observation.

- In problem 8, we are chaining the promises, so when first promise is resolved, we get 1 and then after using `then` on first we get access to previous value so 1 gets printed to console. Similarly we are chaining then on promises so each time we get value of previous this, so 1,2,3 will be logged in console and final value of promise will be 4. But in problem 9, we are not chaining, we are using same promise i.e, first again and again, so previous value will be 1 only, so 1,1,1 gets logged into console. But the final return value is 4 so, promise result will be 4.

11. Do the following

- Create a promise and resolve it with `John`
- Use `.then` and return another promise that resolves with `Arya`
- Use `.then` log the value you get access to and return another promise that resolves after 2000ms with value `Bran`
- Use `.then` to log the value

```js
new Promise((res, rej) => {
  res("John");
})
  .then((val) => new Promise((res, rej) => res("Arya")))
  .then((val) => {
    console.log(val);
    return new Promise((res, rej) => {
      setTimeout(() => res("Bran"), 2000);
    });
  })
  .then(console.log);
```
