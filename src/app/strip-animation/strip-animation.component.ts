import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { IotService } from "../iot.service";

enum Animation {
  CHRISTMAS_1 = "CHRISTMAS_1",
  CHRISTMAS_1_SHORT = "CHRISTMAS_1_SHORT",
  RAINBOW = "RAINBOW",
  NONE = "NONE"
}

interface AnimationValue {
  animation: Animation;
}

@Component({
  selector: "app-strip-animation",
  templateUrl: "./strip-animation.component.html",
  styleUrls: ["./strip-animation.component.scss"]
})
export class StripAnimationComponent implements OnInit {
  state: Animation = undefined;
  @Input() deviceUuid: string;
  @Input() variableUuid: string;

  @ViewChild("slickModal", { static: false })
  slickModal: ElementRef;

  slides = [
    { type: Animation.CHRISTMAS_1, text: "Christmas 1" },
    { type: Animation.RAINBOW, text: "Rainbow" },
    { type: Animation.NONE, text: "Off" }
  ];

  slideConfig = { slidesToShow: 1, slidesToScroll: 1, arrows: false };

  constructor(private iot: IotService) {}

  ngOnInit() {
    setTimeout(() => {
      this.iot
        .getController()
        .observe(this.deviceUuid, this.variableUuid)
        .subscribe((newValue: AnimationValue) => {
          console.log("new value", newValue);
          if (newValue !== undefined) {
            this.state = newValue.animation;
            const slideNumer = this.getCurrentSlideNumber();

            (this.slickModal as any).slickGoTo(slideNumer);
          } else {
            this.state = undefined;
          }
        });
    }, 1000);
  }

  afterChange(e) {
    if (this.slides[e.currentSlide].type !== this.state) {
      this.iot.getController().setValue(this.deviceUuid, this.variableUuid, {
        animation: this.slides[e.currentSlide].type
      });
    }
  }

  getCurrentSlideNumber() {
    return this.slides.findIndex(item => item.type === this.state);
  }

  changeSetting() {
    (this.slickModal as any).slickNext();
  }
}
