import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class LeafletService {
  private _L: any;
  private _map: any;
  private _layerControl: any;

  constructor() {
    this._L = L;
    console.log('leafletservice init');
  }

  /**
   * @prop {L.map} map 地图
   */
  get map() {
    return this._map;
  }

  get layerControl() {
    return this._layerControl;
  }
  /**
   *
   *
   * @param {HTMLElement} container
   * @param {object} [leafletOptions]
   * @param {object} [leafletLayersControl]
   * @memberof LeafletService
   */
  init(
    container: HTMLElement,
    leafletOptions?: any,
    leafletLayersControl?: any
  ) {
    this._map = this._L.map(container, leafletOptions);

    // 矢量地图
    const vectorMap = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
      maxZoom: 18
    });
    const vectorAnn = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {});
    const vecGroup = L.layerGroup([vectorMap, vectorAnn]);
    // 影像地图
    const imgMap = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {});
    const imgAnn = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {});
    const imgGroup = L.layerGroup([imgMap, imgAnn]);
    // 地形地图
    const terrainMap = L.tileLayer.chinaProvider('TianDiTu.Terrain.Map', {});
    const terrainAnn = L.tileLayer.chinaProvider(
      'TianDiTu.Terrain.Annotion',
      {}
    );
    const terrainGroup = L.layerGroup([terrainMap, terrainAnn]);

    const osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    );

    const layers = {
      baseLayers: {
        OSM矢量地图: osm,
        矢量地图: vecGroup,
        影像地图: imgGroup,
        地形地图: terrainGroup
      },
      overlays: {}
    };

    if (leafletOptions.layersControl) {
      this._layerControl = this._L.control
        .layers(layers.baseLayers, layers.overlays, { collapsed: true })
        .addTo(this._map);
    }
    if (leafletOptions.baseLayer) {
      imgGroup.addTo(this._map);
    }
    if (leafletOptions.measureCtl) {
      L.control
        .measure({
          position: 'topright',
          primaryLengthUnit: 'kilometers',
          secondaryLengthUnit: undefined,
          primaryAreaUnit: 'sqmeters',
          secondaryAreaUnit: undefined,
          activeColor: '#08316F',
          completedColor: '#08316F',
          localization: 'cn'
        })
        .addTo(this._map);
    }

    // 初始化地图事件(随UI变化地图更新)
    const that = this;
    this._map.whenReady(() => {
      setTimeout(() => {
        that._map.invalidateSize(true);
      });
      that._map.on('resize', e => {
        that._map.invalidateSize(true);
        console.log('map resize');
      });

      that._map.on('viewreset', e => {
        that._map.invalidateSize(true);
        console.log('map view reset');
      });
    });
  }

  createWmsLayer(url, layerName) {
    return L.tileLayer.wms(url, {
      layers: layerName,
      format: 'image/png',
      transparent: true
    });
  }

  addOverlay(layer: any, layerName: string) {
    this._layerControl.addOverlay(layer, layerName);
  }

  flyTo(latLng) {
    this._map.flyTo(latLng, 14);
  }

  flyToTyphoon(latLng) {
    this._map.flyTo(latLng, 7);
  }

  getLayerBounds(layer: any) {
    return layer.getBounds();
  }

  setCenter(latlng) {
    this._map.setView(latlng, 14);
  }

  zoomToExtent(extent: any) {
    this._map.flyToBounds(extent, {animate: false});
  }
}
