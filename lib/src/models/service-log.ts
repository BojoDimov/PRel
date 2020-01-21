/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ServiceLogType } from "../enums/service-log-type.enum";

export class ServiceLog {
  message: string;
  type: ServiceLogType;
  timestamp: Date;
}