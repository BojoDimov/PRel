import { Service } from "../models/service";
import { ServiceNode } from "../models/service-node";

export interface IServiceStarter {
  start(service: Service, node: number): ServiceNode;
}