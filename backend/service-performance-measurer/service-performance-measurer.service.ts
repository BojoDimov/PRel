import { IServicePerformanceMeasurer } from "./service-performance-measurer.interface";
import { Service } from "../models/service";
import { ServiceNode } from "../models/service-node";

export class PidusagePerformanceMeasurer implements IServicePerformanceMeasurer {
  measurePerformance(service: Service, node: ServiceNode): void {

  }
}