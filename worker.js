// import { parentPort } from 'worker_threads'
const { parentPort, workerData, isMainThread } = require("worker_threads");

// CPU consuming function (sorting a big array)
function sortBigArray(data) {
  // new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.index !== data.size - 1) {
        parentPort.postMessage({ elem: data.elem + 1, status: true})
      } else {
        parentPort.postMessage({ elem: data.elem + 1, status: false})
      }
    }, 3000)
  // })
}

// check that the sorter was called as a worker thread
if (!isMainThread) {
  // make sure we got an array of data
  /* if (!Array.isArray(workerData)) {
    // we can throw an error to emit the "error" event from the worker
    throw new Error("workerData must be an array of numbers");
  }*/
  // we post a message through the parent port, to emit the "message" event
  sortBigArray(workerData);
}
/* parentPort.on('message', (data) => {
  const result = data + 1;
  parentPort.postMessage(result)
}) */

/* export function countPlus(num) {
  return num + 1;
} */