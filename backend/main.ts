/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ProcessManager } from "./process-manager.service";
import { StaticConfigServiceLoader } from "./service-loader/static-config-service-loader.service";
import { SpawnServiceStarter } from "./service-starter/service-starter.service";
import { VerboseServiceMonitor } from "./service-monitor/service-monitor.service";
import { RestartServiceMaintainer } from "./service-maintainer/service-maintainer.service";
import { PidusagePerformanceMeasurer } from "./service-performance-measurer/service-performance-measurer.service";

const manager = new ProcessManager(
  new StaticConfigServiceLoader(),
  new SpawnServiceStarter(),
  new VerboseServiceMonitor(),
  new RestartServiceMaintainer(),
  new PidusagePerformanceMeasurer()
);

manager.init();