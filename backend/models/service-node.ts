import { ChildProcess } from "child_process";
import { ServiceLog } from "./service-log";
import { ServicePerformance } from "./service-performance";

export class ServiceNode {
  id: number;
  process: ChildProcess;
  logs: ServiceLog[];
  performance: ServicePerformance[];
}