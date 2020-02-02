/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import fs from "fs";
import { IServiceLoader } from "./service-loader.interface";
import { ServiceConfiguration, ServiceRuntime } from "../models/service";

export class StaticConfigServiceLoader implements IServiceLoader {
  constructor(private services: ServiceConfiguration[]) { }

  load(): ServiceRuntime[] {
    return this.services.map(service => {
      return {
        ...service,
        isRunning: false,
        nodes: []
      }
    });
  }
}

export class DynamicFileServiceLoader implements IServiceLoader {
  constructor(private servicesConfigPath: string) { }

  load(): ServiceRuntime[] {
    let stringContent = fs.readFileSync(this.servicesConfigPath, { encoding: "utf8" });
    return JSON.parse(stringContent);
  }
}