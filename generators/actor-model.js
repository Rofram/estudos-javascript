let players = {};
let queue = [];

function send(name, msg) {
  queue.push([name, msg]);
}

function run() {
  while (queue.length) {
    let [name, msg] = queue.shift();
    players[name].next(msg);
  }
}

function* knocker() {
  send("asker", "knock knock");
  let question = yield;
  if (question !== "who's there?") return;
  send("asker", "gene");
  question = yield;
  if (question !== "gene who?") return;
  send("asker", "generator!");
}

function* asker() {
  let knock = yield;
  if (knock !== "knock knock") return;
  send("knocker", "who's there?");
  let answer = yield;
  send("knocker", `${answer} who?`);
}

players.knocker = knocker();
players.asker = asker();
send("asker", "asker get ready..."); // call first .next()
send("knocker", "knocker go!"); // start the conversation
run();

// asker get ready...
// knocker go!
// knock knock
// who's there?
// gene
// gene who?
// generator!

function ping(n) {
  console.log("ping", n);
  return pong(n + 1);
}

function pong(n) {
  console.log("pong", n);
  return ping(n + 1);
}

// ping(0)
// ping 0
// pong 1
// ...
// ping 27210
// pong 27211
// InternalError: too much recursion (Stack overflow!!!)

// Generator co-op escapes the limit!
// Warning: Try at your own risk!

function* ping() {
  let n;
  while (true) {
    n = yield;
    console.log("ping", n);
    send("pong", ++n);
  }
}

function* pong() {
  let n;
  while (true) {
    n = yield;
    console.log("pong", n);
    send("ping", ++n);
  }
}

players.ping = ping();
send("ping", "get ready");
players.pong = pong();
send("pong", "get ready");
send("ping", 0);
run();
// ping 0
// pong 1
// ping 2
// ...
// pong 999999
// ping 1000000
// ...no stack overflow error!
