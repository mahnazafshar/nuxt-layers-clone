import { useEventListener } from "@vueuse/core";
import gsap from "gsap";

export const useDraggableSmoother = (el, { getValidX, onComplete }) => {
  let draggable = unref(el);

  let mouseIsDown = false;
  useEventListener(draggable, ["mousedown", "touchstart"], function () {
    mouseIsDown = true;
  }, { passive: true });
  let direction = "";
  let oldx = 0;
  let anim;

  let timestamp = 0;
  let mx = 0;
  let speed;
  let distance;
  useEventListener(window, ["mousemove", "touchmove"], function (event) {
    if (mouseIsDown) {
      const getX = () => {
        return event?.x ?? event.touches?.[0].clientX
      }
      let now = Date.now();
      const currentmx = getX();
      let dt = now - timestamp;
       distance = Math.abs(currentmx - mx);
      speed = Math.round((distance / dt) * 1000);
      // console.log("speed", speed);

      mx = currentmx;
      timestamp = now;

      if (getX() < oldx) {
        direction = "left";
      } else if (getX() > oldx) {
        direction = "right";
      }

      oldx = getX();

      const currentX = +gsap.getProperty(unref(el), "x");
      if (speed > 15) {
        anim = gsap.to(draggable, {
          duration: 0.5,
          overwrite: true,
          x:
            direction == "right"
              ? getValidX(currentX + 2)
              : getValidX(currentX - 2),
          // y: `${event.clientY - 25}`,
        });
      }
    }
  }, { passive: true });
  useEventListener(window, ["mouseup", "touchend"], function () {
    if (mouseIsDown) {
      //if mouse was down on draggable area
      anim?.kill();
      const currentX = +gsap.getProperty(unref(el), "x");
      if (speed > 15&&distance>5) {
        //don't animate if click
        gsap.to(draggable, {
          duration: 0.5,
          overwrite: true,
          x:
            direction == "right"
              ? getValidX(currentX + speed / 7)
              : getValidX(currentX - speed / 7),
          onComplete: () => {
            onComplete?.();
          },
          // y: `${event.clientY - 25}`,
        });
      } else {
        onComplete?.();
      }
    }
    mouseIsDown = false;
  }, { passive: true });

}
