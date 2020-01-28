import { Service } from '../../../lib/src/models/service';

export class DataMockService {
  get(): Service[] {
    return [
      {
        "name": "Spotify",
        "path": "C:\\Users\\Bozhidar Dimov\\AppData\\Roaming\\Spotify\\Spotify.exe",
        "args": [],
        "shell": false,
        "instances": 1,
        "nodes": [
          {
            "id": 0,
            "logs": [
              {
                "message": "PM: service Spotify-node-0 started with pid 7880",
                "type": 1,
                "timestamp": "2020-01-28T09:28:46.794Z"
              },
              {
                "message": "PM: service Spotify-node-0 exited. Code=0, Signal=null",
                "type": 2,
                "timestamp": "2020-01-28T09:28:47.095Z"
              }
            ],
            "performance": []
          }
        ]
      },
      {
        "name": "Slack",
        "path": "C:\\Users\\Bozhidar Dimov\\AppData\\Local\\slack\\Slack.exe",
        "args": [],
        "shell": false,
        "instances": 1,
        "nodes": [
          {
            "id": 0,
            "logs": [
              {
                "message": "PM: service Slack-node-0 started with pid 5072",
                "type": 1,
                "timestamp": "2020-01-28T09:28:46.801Z"
              },
              {
                "message": "Slack-node-0 STDOUT: \r\n",
                "type": 5,
                "timestamp": "2020-01-28T09:28:46.866Z"
              },
              {
                "message": "PM: service Slack-node-0 exited. Code=0, Signal=null",
                "type": 2,
                "timestamp": "2020-01-28T09:28:47.948Z"
              }
            ],
            "performance": []
          }
        ]
      },
      {
        "name": "VS Code",
        "path": "C:\\Program Files\\Microsoft VS Code\\Code.exe",
        "args": [],
        "shell": false,
        "instances": 3,
        "nodes": [
          {
            "id": 0,
            "logs": [
              {
                "message": "PM: service VS Code-node-0 started with pid 7852",
                "type": 1,
                "timestamp": "2020-01-28T09:28:46.806Z"
              },
              {
                "message": "VS Code-node-0 STDOUT: \r\n",
                "type": 5,
                "timestamp": "2020-01-28T09:28:46.852Z"
              },
              {
                "message": "PM: service VS Code-node-0 exited. Code=0, Signal=null",
                "type": 2,
                "timestamp": "2020-01-28T09:28:48.246Z"
              }
            ],
            "performance": []
          },
          {
            "id": 1,
            "logs": [
              {
                "message": "PM: service VS Code-node-1 started with pid 14240",
                "type": 1,
                "timestamp": "2020-01-28T09:28:46.821Z"
              },
              {
                "message": "VS Code-node-1 STDOUT: \r\n",
                "type": 5,
                "timestamp": "2020-01-28T09:28:46.861Z"
              },
              {
                "message": "PM: service VS Code-node-1 exited. Code=0, Signal=null",
                "type": 2,
                "timestamp": "2020-01-28T09:28:48.297Z"
              }
            ],
            "performance": []
          },
          {
            "id": 2,
            "logs": [
              {
                "message": "PM: service VS Code-node-2 started with pid 6340",
                "type": 1,
                "timestamp": "2020-01-28T09:28:46.827Z"
              },
              {
                "message": "VS Code-node-2 STDOUT: \r\n",
                "type": 5,
                "timestamp": "2020-01-28T09:28:46.862Z"
              },
              {
                "message": "PM: service VS Code-node-2 exited. Code=0, Signal=null",
                "type": 2,
                "timestamp": "2020-01-28T09:28:48.269Z"
              }
            ],
            "performance": []
          }
        ]
      }
    ];
  }
}