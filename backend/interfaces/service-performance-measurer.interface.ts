import { Service } from "../models/service";
import { ServiceNode } from "../models/service-node";

export interface IServicePerformanceMeasurer {
  measurePerformance(service: Service, node: ServiceNode): void;
}