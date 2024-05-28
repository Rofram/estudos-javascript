import { Worker } from "node:worker_threads";

const thread = new Worker(import.meta.dirname + "/child.mjs", { workerData: "Rofran" });

thread.on("message", function(data) {
  console.log("message receive: ", data);
});
