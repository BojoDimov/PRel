import { Component, ChangeDetectorRef } from '@angular/core';
import { Service } from '../../../lib/src/models/service';
import { ElectronService } from 'ngx-electron';
import { DataMockService } from 'src/services/data-mock.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  services: Service[] = [];

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
}
