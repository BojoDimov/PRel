/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ServiceRuntime } from "../models/service";
import { ServiceNode } from "../models/service-node";

export interface IServiceMonitor {
  monitor(service: ServiceRuntime, node: ServiceNode): void;
}