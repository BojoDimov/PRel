/**
 * Copyright (c) 2020 Bozhidar Dimov
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

export function range(start: number, end: number, step: number = 1) {
  let result = [];
  for (let i = start; i < end; i += step)
    result.push(i);
  return result;
}