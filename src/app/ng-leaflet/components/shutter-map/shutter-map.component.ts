import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LeafletService } from '../../services/leaflet.service';

@Component({
  selector: 'ng-leaflet-shutter',
  templateUrl: './shutter-map.component.html',
  styleUrls: ['./shutter-map.component.css'],
  providers: [LeafletService]
})
export class ShutterMapComponent implements OnInit, AfterViewInit {
  @Input() compareLayers: any[];
  @Input() mapOption: any;
  @Input() bounds: any;
  private shutterLayer: any;
  public shutterValue = 50;
  private map: any;
  constructor(private leafletService: LeafletService) {}

  get Map() {
    return this.map;
  }
  getMap() {
    return this.map;
  }

  addOverlay(layer: any, layerName: string) {
    this.leafletService.addOverlay(layer, layerName);
  }

  zoomToExtent(extent: any) {
    this.map.flyToBounds(extent);
  }

  getLayerBounds(layer: any) {
    return layer.getBounds();
  }

  setCenter(latlng) {
    this.map.setView(latlng);
  }

  ngOnInit() {}

  ngAfterViewInit() {

    this.map = this.leafletService.map;
    this.compareLayers.forEach(item => {
      item['layer'].addTo(this.map);
      this.leafletService.addOverlay(item['layer'], item['name']);
    });
    this.shutterLayer = this.compareLayers[1]['layer'];
    this.clip();
    this.map.on('move', () => {
      const nw = this.map.containerPointToLayerPoint([0, 0]),
        se = this.map.containerPointToLayerPoint(this.map.getSize());
      // clipY = nw.y + (se.y - nw.y) * (this.shutterValue) / 100;
      // clip:rect(0px,60px,200px,0px);
      const clipX = nw.x + (se.x - nw.x) * (this.shutterValue / 100);
      const rectX = `rect(${nw.y}px ${clipX}px ${se.y}px ${nw.x}px)`;

      // const rectY = 'rect(' + [nw.y, se.x, clipY, nw.x].join('px,') + 'px)';
      this.shutterLayer.getContainer().style.clip = rectX;

      console.log('clipX:', this.shutterValue / 100);
      console.log('containerPointToLayerPoint([0, 0]):', nw);
      console.log('map size :', se);
      console.log('rect clip:', rectX);
    });
  }
  shutterChange() {
    this.map.dragging.disable();
    this.clip();
  }

  afterShutter() {
    this.map.dragging.enable();
  }

  clip() {
    const nw = this.map.containerPointToLayerPoint([0, 0]),
      se = this.map.containerPointToLayerPoint(this.map.getSize());
    // clipY = nw.y + (se.y - nw.y) * (this.shutterValue) / 100;
    // clip:rect(0px,60px,200px,0px);
    const clipX = nw.x + (se.x - nw.x) * (this.shutterValue / 100);
    const rectX = `rect(${nw.y}px ${clipX}px ${se.y}px ${nw.x}px)`;

    // const rectY = "rect(" + [nw.y, se.x, clipY, nw.x].join("px,") + "px)";
    this.shutterLayer.getContainer().style.clip = rectX;

    console.log('默认shutter：', this.shutterValue);
    console.log('clipX:', this.shutterValue / 100);
    console.log('containerPointToLayerPoint([0, 0]):', nw);
    console.log('map size :', se);
    console.log('rect clip:', rectX);
  }
}
