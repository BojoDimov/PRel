/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { ServiceRuntime } from "../models/service";

export interface IServiceLoader {
  load(): ServiceRuntime[];
}