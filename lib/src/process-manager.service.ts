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
import { ServiceRuntime } from "./models/service";
import { range } from "./utils/range";
import { IServiceLogger } from "./service-logger/service-logger.interface";

export class ProcessManager {
  constructor(
    public serviceLoader: IServiceLoader,
    public serviceStarter: IServiceStarter,
    public serviceMonitor: IServiceMonitor,
    public serviceMaintainer: IServiceMaintainer,
    public servicePerformanceMeasurer: IServicePerformanceMeasurer,
    public serviceLogger: IServiceLogger
  ) {
    this.logInterval = setInterval(() => this.serviceLogger.logServices(this), 60 * 1000);
    process.on("beforeExit", () => this.destroy());
  }

  services: { [id: string]: ServiceRuntime } = {};
  logInterval: NodeJS.Timeout;

  init() {
    this.serviceLoader.load().forEach(service => {
      this.services[service.name] = service;
    });
  }

  addService() {

  }

  stopService(serviceName: string, nodeId: number) {

  }

  startService(serviceName: string) {

  }

  startNewNode(serviceName: string) {

  }

  startAll() {
    Object.keys(this.services).forEach(serviceName => {
      let service = this.services[serviceName];
      service.nodes = range(0, service.instances).map(nodeId => {
        let node = this.serviceStarter.start(service, nodeId);
        this.serviceMonitor.monitor(service, node);
        this.serviceMaintainer.maintain(service, node, this);
        this.servicePerformanceMeasurer.measurePerformance(service, node);
        return node;
      });
    });
  }

  destroy() {
    clearInterval(this.logInterval);
    this.servicePerformanceMeasurer.destroy();
  }
}