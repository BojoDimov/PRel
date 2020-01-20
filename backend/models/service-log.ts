import { ServiceLogType } from "../enums/service-log-type.enum";

export class ServiceLog {
  message: string;
  type: ServiceLogType;
  timestamp: Date;
}