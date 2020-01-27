import { Service } from '../../../lib/src/models/service';

export class DataMockService {
  get(): Service[] {
    return [
      {
        name: "Slack",
        instances: 1,
        nodes: [
          {
            id: 0,
            logs: [

            ],
            performance: [],
            process: null
          }
        ],
        path: "C:\\Users\\Bojo\\AppData\\Local\\slack\\Slack.exe",
        args: [],
        shell: false
      }
    ];
  }
}