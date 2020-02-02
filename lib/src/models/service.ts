/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ServiceNode } from "./service-node";

export class ServiceConfiguration {
  name: string;
  path: string;
  shell: boolean = false;
  args: string[] = [];
  instances: number = 1;
  autoRestart: boolean = false;
}

export class ServiceRuntime extends ServiceConfiguration {
  isRunning: boolean = false;
  nodes: ServiceNode[] = [];
}