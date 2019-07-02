const Pool = require('worker-threads-pool');
const path = require('path')
const { parentPort, workerData, isMainThread, Worker } = require("worker_threads");
var express = require('express');

var app = express();

const mas = [2,1,5,4,3,7,6,10,9,8];
const pool = new Pool({max: 2})
app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/test', (req, res) => {
  // const workerScript = path.join(__dirname, "./worker.js");
  let mass = [];
  let newMass = [];
  for(let i = 0; i < mas.length; i++) {
    /* const worker = new Worker(workerScript, { workerData: mas[0] })

    worker.on("message", (sortedArray) => console.log(sortedArray));
    worker.on("error", (error) => console.error("error", error));
    worker.on("exit", () => console.log("exit")); */
    pool.acquire("./worker.js", { workerData: { elem: mas[i], index: i, size: mas.length} } ,(err, worker) => {
      worker.on("message", (data) => {
        newMass.push(data.elem)
        if (!data.status) {
          res.send(newMass)
        }
      });
      worker.on("error", (error) => console.error("error", error));
      worker.on("exit", () => console.log("exit"));
    })
  }
})

app.listen(8010, '0.0.0.0')