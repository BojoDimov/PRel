/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { IServiceMaintainer } from "./service-maintainer.interface";
import { ServiceRuntime } from "../models/service";
import { ServiceNode } from "../models/service-node";
import { ProcessManager } from "../process-manager.service";

export class RestartServiceMaintainer implements IServiceMaintainer {
  maintain(service: ServiceRuntime, node: ServiceNode, pm: ProcessManager): void {
    if (service.autoRestart)
      node.process.on("exit", _ => {
        node.process = pm.serviceStarter.start(service, node.id).process;
        pm.serviceMonitor.monitor(service, node);
        pm.serviceMaintainer.maintain(service, node, pm);
        pm.servicePerformanceMeasurer.measurePerformance(service, node);
      });
  }
}

export class NoMaintenanceServiceMaintainer implements IServiceMaintainer {
  maintain(service: ServiceRuntime, node: ServiceNode, pm: ProcessManager): void {
  }
}