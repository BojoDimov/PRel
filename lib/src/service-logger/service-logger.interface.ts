import { ProcessManager } from "../process-manager.service";

export interface IServiceLogger {
  logServices(pm: ProcessManager): void;
}