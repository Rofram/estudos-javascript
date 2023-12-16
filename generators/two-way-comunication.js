// yield is a two-way street
// pass in a value with .next(input)

function* listener() {
  console.log("listening...");
  while (true) {
    let msg = yield;
    console.log("heard:", msg);
  }
}

let l = listener();
l.next("are you there?"); // listening...
l.next("how about now?"); // heard: how about now?
l.next("blah blah"); // heard: blah blah

// generators remember state, oh hey there state machines

function* bankAccount() {
  let balance = 0;
  while (balance >= 0) {
    balance += yield balance;
  }
  return "bankrupt!";
}

let acct = bankAccount();
console.log(acct.next()); // { value: 0, done: false }
console.log(acct.next(50)); // { value: 50, done: false }
console.log(acct.next(-10)); // { value: 40, done: false }
console.log(acct.next(-60)); // { value: "bankrupt!", done: true }
