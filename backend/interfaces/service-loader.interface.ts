import { Service } from "../models/service";

export interface IServiceLoader {
  load(): Service[];
}