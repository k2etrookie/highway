import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { ShutterMapComponent } from './components/shutter-map/shutter-map.component';
import { LeafletDirective } from './directives/leaflet.directive';
import { LeafletService } from './services/leaflet.service';
import { NcOverlayPanelComponent } from './components/nc-overlay-panel/nc-overlay-panel.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgZorroAntdModule],
  declarations: [
    LeafletDirective,
    ShutterMapComponent,
    NcOverlayPanelComponent
  ],
  exports: [LeafletDirective, NcOverlayPanelComponent, ShutterMapComponent]
})
export class NgLeafletModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgLeafletModule,
      providers: [LeafletService]
    };
  }
}
