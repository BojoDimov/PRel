/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ChildProcess } from "child_process";
import { ServiceLog } from "./service-log";
import { ServicePerformance } from "./service-performance";

export class ServiceNode {
  id: number;
  process?: ChildProcess;
  logs: ServiceLog[];
  performance: ServicePerformance[];
}