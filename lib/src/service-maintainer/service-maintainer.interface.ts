/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ServiceRuntime } from "../models/service";
import { ServiceNode } from "../models/service-node";
import { ProcessManager } from "../process-manager.service";

export interface IServiceMaintainer {
  maintain(service: ServiceRuntime, node: ServiceNode, processManager: ProcessManager): void;
}