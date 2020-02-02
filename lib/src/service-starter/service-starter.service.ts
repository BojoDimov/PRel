/**
 * Copyright (c) 2020 Bozhidar Dimov
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import * as ChildProcess from "child_process";
import { IServiceStarter } from "./service-starter.interface";
import { ServiceNode } from "../models/service-node";
import { ServiceRuntime } from "../models/service";


export class SpawnServiceStarter implements IServiceStarter {
  start(service: ServiceRuntime, nodeId: number): ServiceNode {
    return {
      id: nodeId,
      process: ChildProcess.spawn(service.path, service.args, { shell: service.shell }),
      logs: [],
      performance: []
    };
  }
}