import { Service } from "../models/service";
import { ServiceNode } from "../models/service-node";

export interface IServiceMaintainer {
  maintain(service: Service, node: ServiceNode): void;
}