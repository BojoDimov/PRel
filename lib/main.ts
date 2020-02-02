/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ProcessManager } from "./src/process-manager.service";
import { DynamicFileServiceLoader } from "./src/service-loader/static-config-service-loader.service";
import { SpawnServiceStarter } from "./src/service-starter/service-starter.service";
import { VerboseServiceMonitor } from "./src/service-monitor/service-monitor.service";
import { RestartServiceMaintainer } from "./src/service-maintainer/service-maintainer.service";
import { PidUsagePerformanceMeasurer } from "./src/service-performance-measurer/service-performance-measurer.service";
import { DumpServiceLogger } from "./src/service-logger/dump-services-logger.service";

let manager;

// let config = {
//   servicesConfigPath: "C:\\Projects\\PRel\\lib\\services.json",
//   logDirectoryPath: "C:\\Projects\\PRel\\logs"
// }

// let manager = new ProcessManager(
//   new DynamicFileServiceLoader(config.servicesConfigPath),
//   new SpawnServiceStarter(),
//   new VerboseServiceMonitor(),
//   new RestartServiceMaintainer(),
//   new PidUsagePerformanceMeasurer(),
//   new DumpServiceLogger(config.logDirectoryPath)
// );

// manager.init();
// manager.startAll();

module.exports = {
  create: (config: { servicesConfigPath: string, logDirectoryPath: string }) => {
    manager = new ProcessManager(
      new DynamicFileServiceLoader(config.servicesConfigPath),
      new SpawnServiceStarter(),
      new VerboseServiceMonitor(),
      new RestartServiceMaintainer(),
      new PidUsagePerformanceMeasurer(),
      new DumpServiceLogger(config.logDirectoryPath)
    );

    return manager;
  }
}