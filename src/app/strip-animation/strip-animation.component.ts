import { Component, OnInit, Input } from "@angular/core";
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

  slides = [
    { type: Animation.CHRISTMAS_1 },
    { type: Animation.RAINBOW },
    { type: Animation.NONE }
  ];

  slideConfig = { slidesToShow: 1, slidesToScroll: 1, arrows: false };

  constructor(private iot: IotService) {}

  ngOnInit() {
    setTimeout(() => {
      this.iot
        .observe(this.deviceUuid, this.variableUuid)
        .subscribe((newValue: AnimationValue) => {
          console.log("new value", newValue);
          if (newValue !== undefined) {
            this.state = newValue.animation;
          } else {
            this.state = undefined;
          }
        });
    }, 1000);
  }

  afterChange(e) {
    this.iot.setValue(this.deviceUuid, this.variableUuid, {
      animation: this.slides[e.currentSlide].type
    });
  }
}
