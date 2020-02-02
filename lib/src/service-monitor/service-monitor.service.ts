/**
 * Copyright (c) 2020 Bozhidar Dimov
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { IServiceMonitor } from "./service-monitor.interface";
import { ServiceRuntime } from "../models/service";
import { ServiceNode } from "../models/service-node";
import { ServiceLogType } from "../enums/service-log-type.enum";

export class VerboseServiceMonitor implements IServiceMonitor {
  monitor(service: ServiceRuntime, node: ServiceNode): void {
    if (node.process) {
      const message = `PM: service ${service.name}-node-${node.id} started with pid ${node.process.pid}`;
      node.logs.push({
        message: message,
        type: ServiceLogType.start,
        timestamp: new Date()
      });
      console.log(message);

      node.process.on("error", (err) => {
        const message = `PM: error spawning service ${service.name}-node-${node.id} with pid ${node.process.pid}: ${err.toString()}`;
        node.logs.push({
          message: message,
          type: ServiceLogType.error,
          timestamp: new Date()
        });
        console.error(message);
      });

      node.process.on("exit", (code, signal) => {
        const message = `PM: service ${service.name}-node-${node.id} exited. Code=${code}, Signal=${signal}`;
        node.logs.push({
          message: message,
          type: ServiceLogType.exit,
          timestamp: new Date()
        });
        console.log(message);
      });

      if (node.process.stdout)
        node.process.stdout.on("data", (data) => {
          const message = `${service.name}-node-${node.id} STDOUT: ${data.toString()}`;
          node.logs.push({
            message: message,
            type: ServiceLogType.stdout,
            timestamp: new Date()
          });
          console.log(message);
        });

      if (node.process.stderr)
        node.process.stderr.on("data", (data) => {
          const message = `${service.name}-node-${node.id} STDERR: ${data.toString()}`;
          node.logs.push({
            message: message,
            type: ServiceLogType.stderr,
            timestamp: new Date()
          });
          console.log(message);
        });
    }
  }
}