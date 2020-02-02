import * as fs from "fs";
import * as path from "path";
import { IServiceLogger } from "./service-logger.interface";
import { ProcessManager } from "../process-manager.service";
import { ServiceNode } from "../models/service-node";
import { ServiceRuntime } from "../models/service";
import { ChildProcess } from "child_process";

export class DumpServiceLogger implements IServiceLogger {
  constructor(private logDirectory: string) { }

  logServices(pm: ProcessManager) {
    let date = new Date();
    let logName = `log-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
    let file = fs.openSync(path.join(this.logDirectory, logName), "ax+");
    let dump = <{ [id: string]: ServiceRuntime }>JSON.parse(JSON.stringify(pm.services));

    Object.keys(dump).forEach(key => {
      dump[key].nodes.forEach((node: ServiceNode) => node.process = <ChildProcess>{});
    });
    fs.writeSync(file, JSON.stringify(dump));
  }
}