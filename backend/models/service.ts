import { ServiceNode } from "./service-node";

export class Service {
  name: string;
  path: string;
  shell: boolean;
  args: string[];
  instances: number;
  nodes: ServiceNode[];
}