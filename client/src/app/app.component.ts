import { Component, ChangeDetectorRef } from '@angular/core';
import { Service } from '../../../lib/src/models/service';
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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  services: Service[] = [];

  selectedService: Service = null;
  selectedNode: ServiceNode = null;
  ServiceLogType = ServiceLogType;

  constructor(
    private electron: ElectronService,
    private changeDetector: ChangeDetectorRef,
    private dataMock: DataMockService
  ) {
    if (this.electron.isElectronApp) {
      electron.ipcRenderer.on("data", (event, data) => {
        console.log('Caught event', event);
        console.log('Data: ', data);
        this.transformData(data);
        this.changeDetector.detectChanges();
        console.log(this.services);
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

  selectService(service: Service) {
    this.selectedService = service;
    this.selectedNode = null;
    this.changeDetector.detectChanges();
  }

  selectNode(node: ServiceNode) {
    this.selectedNode = node;
    this.changeDetector.detectChanges();
  }
}
