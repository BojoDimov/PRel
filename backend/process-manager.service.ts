import { IServiceLoader } from "./interfaces/service-loader.interface";
import { IServiceStarter } from "./interfaces/service-starter.interface";
import { IServiceMonitor } from "./interfaces/service-monitor.interface";
import { IServiceMaintainer } from "./interfaces/service-maintainer.interface";
import { IServicePerformanceMeasurer } from "./interfaces/service-performance-measurer.interface";
import { Service } from "./models/service";
import { range } from "./utils/range";

export class ProcessManager {
  constructor(
    private serviceLoader: IServiceLoader,
    private serviceStarter: IServiceStarter,
    private serviceMonitor: IServiceMonitor,
    private serviceMaintainer: IServiceMaintainer,
    private servicePerformanceMeasurer: IServicePerformanceMeasurer
  ) { }

  services: { [id: string]: Service } = {};

  init() {
    this.serviceLoader.load().forEach(service => {
      this.services[service.name] = {
        ...service,
        nodes: range(0, service.instances).map(nodeId => {
          let node = this.serviceStarter.start(service, nodeId);
          this.serviceMonitor.monitor(service, node);
          this.serviceMaintainer.maintain(service, node);
          this.servicePerformanceMeasurer.measurePerformance(service, node);
          return node;
        })
      };
    });
  }
}