/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ProcessManager } from "./src/process-manager.service";
import { StaticConfigServiceLoader } from "./src/service-loader/static-config-service-loader.service";
import { SpawnServiceStarter } from "./src/service-starter/service-starter.service";
import { VerboseServiceMonitor } from "./src/service-monitor/service-monitor.service";
import { RestartServiceMaintainer, NoMaintenanceServiceMaintainer } from "./src/service-maintainer/service-maintainer.service";
import { PidUsagePerformanceMeasurer } from "./src/service-performance-measurer/service-performance-measurer.service";

const manager = new ProcessManager(
  new StaticConfigServiceLoader(),
  new SpawnServiceStarter(),
  new VerboseServiceMonitor(),
  new NoMaintenanceServiceMaintainer(),
  new PidUsagePerformanceMeasurer()
);

manager.init();