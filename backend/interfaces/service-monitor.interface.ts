import { Service } from "../models/service";
import { ServiceNode } from "../models/service-node";

export interface IServiceMonitor {
  monitor(service: Service, node: ServiceNode): void;
}