/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import * as config from '../../services.json';

import { IServiceLoader } from "./service-loader.interface";
import { Service } from "../models/service";

export class StaticConfigServiceLoader implements IServiceLoader {
  load(): Service[] {
    return config.services;
  }
}