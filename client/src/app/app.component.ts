import { Component, ChangeDetectorRef } from '@angular/core';
import { ServiceRuntime } from '../../../lib/src/models/service';
import { ElectronService } from 'ngx-electron';
import { DataMockService } from 'src/services/data-mock.service';
import { ServiceNode } from '../../../lib/src/models/service-node';

enum ServiceLogType {
  start = 1,
  exit = 2,
  restart = 3,
  error = 4,
  stdout = 5,
  stderr = 6
}

export enum CommunicationChannel {
  startAll = "start-all",
  addService = "add-service",
  openLogs = "open-logs",
  serviceStopAllNodes = "service-stop-all-nodes",
  serviceStartNewNode = "service-start-new-node",
  serviceStartNode = "service-start-node",
  serviceStopNode = "service-stop-node"
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  services: ServiceRuntime[] = [];

  selectedService: ServiceRuntime = null;
  selectedNode: ServiceNode = null;
  ServiceLogType = ServiceLogType;
  CommunicationChannel = CommunicationChannel;

  constructor(
    private electron: ElectronService,
    private changeDetector: ChangeDetectorRef,
    private dataMock: DataMockService
  ) {
    if (this.electron.isElectronApp) {
      electron.ipcRenderer.on("data", (event, data) => {
        this.services = data;
        console.log(this.services);
        this.changeDetector.detectChanges();
      });
    }
    else {
      this.services = dataMock.get();
    }
  }

  transformData(data: any) {
    this.services = [];
    Object.keys(data).forEach(key => {
      this.services.push(data[key]);
    });
  }

  selectService(service: ServiceRuntime) {
    this.selectedService = service;
    this.selectedNode = null;
    this.changeDetector.detectChanges();
  }

  selectNode(node: ServiceNode) {
    this.selectedNode = node;
    this.changeDetector.detectChanges();
  }

  callProcessManager(channel: CommunicationChannel, options: any) {
    if (this.electron.isElectronApp)
      this.electron.ipcRenderer.send(channel, options);
  }
}
