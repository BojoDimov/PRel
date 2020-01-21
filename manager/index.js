/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */


const child_process = require('child_process');
const services = require("./configurations.json").services;

function range(start, end, step = 1) {
  let result = [];
  for (let i = start; i < end; i++)
    result.push(i);
  return result;
}

const runtime = {};

services.forEach(service => {
  runtime[service.name] = {
    ...service,
    nodes: range(0, service.instances)
      .map(instance => start(service, null, createRestartExitHandler(service, instance)))
  };

  runtime[service.name].nodes.forEach((node, index) => {
    //node.stdout.on("data", data => console.log(`${service.name}-node-${index} LOG: ${data.toString()}`));
    //node.stderr.on("data", data => console.error(`${service.name}-node-${index} ERROR: ${data.toString()}`));
  });
});


function start(service, errorHandler, exitHandler) {
  let process = child_process.spawn(service.path, service.args, { shell: service.shell });
  process.on("error", (err) => {
    console.error(`SPAWN: error spawning process ${process.pid}: ${err.toString()}`);
    if (errorHandler)
      errorHandler(err);
  });
  process.on("exit", (code, signal) => {
    console.log(`SPAWN: process ${process.pid} exited. Code=${code}, Signal=${signal}`);
    if (exitHandler)
      exitHandler(code, signal);
  });

  console.log(`SPAWN: service ${service.name} started. Pid=${process.pid}`);
  return process;
}

function createRestartExitHandler(service, index) {
  return function (code, signal) {
    runtime[service.name].nodes[index] = start(service, null, createRestartExitHandler(service, index));
  };
}