- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
let one = new Promise((res) => {
  setTimeout(() => res(1), 1000);
});

let two = new Promise((res) => {
  setTimeout(() => res(2), 2000);
});

let three = new Promise((res) => {
  setTimeout(() => res(3), 3000);
});

let four = new Promise((res) => {
  setTimeout(() => res(4), 4000);
});

Promise.all([one, two, three, four]).then((values) => console.log(values));
```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
let usernames = ["mojombo", "defunkt", "pjhyett", "wycats", "ezmobius"];
let userData = Promise.all(
  usernames.map((username) =>
    fetch(`https://api.github.com/users/${username}`).then((res) => res.json())
  )
).then((users) => users.forEach((user) => console.log(user.followers)));
```

- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
let promise1 = fetch(`https://random.dog/woof.json`);
let promise2 = fetch(`https://aws.random.cat/meow`);
Promise.race([promise1, promise2]).then((res) => console.log(res));
```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve("Arya"), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Whoops!")), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve("John"), 3000)
);
Promise.allSettled([one, two, three]).then((res) =>
  res.forEach((response) => console.log(response))
);

Promise.all([one, two, three]).then((res) =>
  res.forEach((response) => console.log(response))
);
//Promise {<rejected>: Error: Whoops!}
// Doesnt work
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("Arya"), 1000);
  }),
  "Sam",
  { name: "John" },
]).then(console.log);
/*Output
["Arya',"Sam",{ name: "John" }]
*/
// It will take 1 second to resolve the promise
```
