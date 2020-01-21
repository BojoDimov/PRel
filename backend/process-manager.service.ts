/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { IServiceLoader } from "./service-loader/service-loader.interface";
import { IServiceStarter } from "./service-starter/service-starter.interface";
import { IServiceMonitor } from "./service-monitor/service-monitor.interface";
import { IServiceMaintainer } from "./service-maintainer/service-maintainer.interface";
import { IServicePerformanceMeasurer } from "./service-performance-measurer/service-performance-measurer.interface";
import { Service } from "./models/service";
import { range } from "./utils/range";

export class ProcessManager {
  constructor(
    public serviceLoader: IServiceLoader,
    public serviceStarter: IServiceStarter,
    public serviceMonitor: IServiceMonitor,
    public serviceMaintainer: IServiceMaintainer,
    public servicePerformanceMeasurer: IServicePerformanceMeasurer
  ) { }

  services: { [id: string]: Service } = {};

  init() {
    this.serviceLoader.load().forEach(service => {
      this.services[service.name] = {
        ...service,
        nodes: range(0, service.instances).map(nodeId => {
          let node = this.serviceStarter.start(service, nodeId);
          this.serviceMonitor.monitor(service, node);
          this.serviceMaintainer.maintain(service, node, this);
          this.servicePerformanceMeasurer.measurePerformance(service, node);
          return node;
        })
      };
    });
  }
}