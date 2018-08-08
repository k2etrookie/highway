import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Renderer2,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
  TemplateRef
} from '@angular/core';

import * as elementResizeEvent from 'element-resize-event';

@Component({
  selector: 'nc-overlay-panel',
  templateUrl: './nc-overlay-panel.component.html',
  styleUrls: ['./nc-overlay-panel.component.css']
})
export class NcOverlayPanelComponent implements OnInit, AfterViewInit {
  private maximum: boolean; // 面板是否最大化
  private showValue = false; // 面板是否可见
  private container: HTMLElement;
  private originStyle: any;
  @Output() onClose;
  @Input() maxEnabled: boolean;
  @Input() closeEnabled: boolean;
  @Input() titleEnabled: boolean;

  @Input() panelTitle: string; // 面板标题
  @Output() showChange = new EventEmitter();
  @Input()
  get show() {
    return this.showValue;
  }
  set show(val) {
    this.showValue = val;
    this.showChange.emit(this.showValue);
    if (this.showValue) {
      // this.elementRef.nativeElement.style['display'] = 'block';
    } else {
      // this.elementRef.nativeElement.style['display'] = 'none';
    }
  }

  /**
   *
   * @param cesiumService
   * @param el
   * @param render
   */
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {
    this.maximum = false;
    this.maxEnabled = false;
    this.closeEnabled = false;
    this.titleEnabled = true;
    // this.container = document.createElement('div');
    // this.container.className = 'overlay-panel-container';
    // this.elementRef.nativeElement.appendChild(this.container);
    // this.renderer.setStyle(this.container, 'width', '100%');
    // this.renderer.setStyle(this.container, 'height', '100%');

    this.onClose = new EventEmitter();
  }

  /**
   * 组件初始化
   */
  ngOnInit() {}

  ngAfterViewInit() {
    const parentDiv = this.elementRef.nativeElement.parentNode;

    // 注册resize监听
    elementResizeEvent(parentDiv, () => {
      console.log('div size changed');
      if (this.maximum) {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'width',
          getComputedStyle(parentDiv).width
        );
      }
    });

    // 初始化时样式
    this.originStyle = Object.assign(
      {},
      getComputedStyle(this.elementRef.nativeElement)
    );
  }

  closeHandle(el) {
    // this.elementRef.nativeElement.style.display = 'none';
    this.onClose.emit(false);
    // this.show = false;
  }

  /**
   *
   *
   * @param {any} el
   * @memberof NcOverlayPanelComponent
   */
  maxResetHandle(el) {
    if (this.maximum) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'width',
        this.originStyle.width
      );
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'height',
        this.originStyle.height
      );
      this.maximum = false;
    } else {
      const maximumStyle = getComputedStyle(
        // this.elementRef.nativeElement.parentNode
        document.getElementsByClassName('cesium-viewer')[0]
      );
      if (maximumStyle['width'] === 'auto') {
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', '100%');
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'height',
          'calc(100%-40px)'
        );
      } else {
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'width',
          maximumStyle.width
        );
        this.renderer.setStyle(
          this.elementRef.nativeElement,
          'height',
          (
            Number(
              maximumStyle.height.substr(0, maximumStyle.height.length - 2)
            ) - 40
          ).toString() + 'px'
        );
      }

      this.maximum = true;
    }
  }
}
