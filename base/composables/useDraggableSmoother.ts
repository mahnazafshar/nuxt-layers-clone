import { useEventListener } from "@vueuse/core";
import gsap from "gsap";

export const useDraggableSmoother = (el, { getValidX, onComplete, onReleased, onStart }) => {
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
  let my = 0;
  let speed;
  let speedY;
  let distance;
  let distanceY;
  useEventListener(window, ["mousemove", "touchmove"], function (event) {
    if (mouseIsDown) {
      const getX = () => {
        return event?.x ?? event.touches?.[0].clientX
      }
      const getY = () => {
        return event?.y ?? event.touches?.[0].clientY
      }
      let now = Date.now();
      const currentmx = getX();
      const currentmy = getY();
      let dt = now - timestamp;
       distance = Math.abs(currentmx - mx);
       distanceY = Math.abs(currentmy - my);
      speed = Math.round((distance / dt) * 1000);
      speedY = Math.round((distanceY / dt) * 1000);
      // console.log("speed", speed);

      mx = currentmx;
      my = currentmy;
      timestamp = now;

      if (getX() < oldx) {
        direction = "left";
      } else if (getX() > oldx) {
        direction = "right";
      }

      oldx = getX();

      const currentX = +gsap.getProperty(unref(el), "x");
      if (speed > 10 && distanceY<10 && speedY<10) {
        anim = gsap.to(draggable, {
          duration: 0.5,
          overwrite: true,
          x:
            direction == "right"
              ? getValidX(currentX + distance+2)
              : getValidX(currentX - distance-2),
          // y: `${event.clientY - 25}`,
        });
      }
    }
  }, { passive: true });
  useEventListener(window, ["mouseup", "touchend"], function () {
    // if(mouseIsDown){
    //   alert(speedY)
    // }
    if (mouseIsDown) {
      console.log("mouseIsDown",mouseIsDown)
      //if mouse was down on draggable area
      anim?.kill();
      const currentX = +gsap.getProperty(unref(el), "x");
     const shouldContinue= onReleased?.({speed,distance,distanceY,direction})
     if(!shouldContinue){
       mouseIsDown = false
      onComplete?.();
      return;
     }
      if (speed>4 && distance>1 && (distanceY<30||distance>10||speed>10)) {
        //don't animate if click
        const num=speed>9 ? speed/3 : speed*2
        gsap.to(draggable, {
          duration: 0.5,
          overwrite: true,
          x:
          direction == "right"
          ? getValidX(currentX + num)
          : getValidX(currentX - num),
          onStart:()=>{
            onStart?.();
          },
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
