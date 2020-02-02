import { IServicePerformanceMeasurer } from "./service-performance-measurer.interface";
import { ServiceRuntime } from "../models/service";
import { ServiceNode } from "../models/service-node";
import pidusage from "pidusage";

export class PidUsagePerformanceMeasurer implements IServicePerformanceMeasurer {
  interval: NodeJS.Timeout;
  measurePerformance(service: ServiceRuntime, node: ServiceNode): void {
    setInterval(() => this.getStats(node), 5 * 1000);
  }

  getStats(node: ServiceNode): Promise<void> {
    return pidusage(node.process.pid)
      .then(stats => node.performance.unshift(stats))
      .catch(err => { })
      .then(_ => { });
  }

  destroy(): void {
    if (this.interval)
      clearInterval(this.interval);
  }
}