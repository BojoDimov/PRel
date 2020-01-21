/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ServiceNode } from "./service-node";

export class Service {
  name: string;
  path: string;
  shell: boolean;
  args: string[];
  instances: number;
  nodes: ServiceNode[];
}