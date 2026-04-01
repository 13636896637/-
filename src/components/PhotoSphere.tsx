import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const defaultImages = [
  "https://picsum.photos/seed/p1/400/400",
  "https://picsum.photos/seed/p2/400/400",
  "https://picsum.photos/seed/p3/400/400",
  "https://picsum.photos/seed/p4/400/400",
  "https://picsum.photos/seed/p5/400/400",
  "https://picsum.photos/seed/p6/400/400",
  "https://picsum.photos/seed/p7/400/400",
  "https://picsum.photos/seed/p8/400/400",
  "https://picsum.photos/seed/p9/400/400",
  "https://picsum.photos/seed/p10/400/400",
  "https://picsum.photos/seed/p11/400/400",
  "https://picsum.photos/seed/p12/400/400",
  "https://picsum.photos/seed/p13/400/400",
  "https://picsum.photos/seed/p14/400/400",
  "https://picsum.photos/seed/p15/400/400",
  "https://picsum.photos/seed/p16/400/400",
  "https://picsum.photos/seed/p17/400/400",
  "https://picsum.photos/seed/p18/400/400",
  "https://picsum.photos/seed/p19/400/400",
  "https://picsum.photos/seed/p20/400/400",
  "https://picsum.photos/seed/p21/400/400",
  "https://picsum.photos/seed/p22/400/400",
  "https://picsum.photos/seed/p23/400/400",
  "https://picsum.photos/seed/p24/400/400",
  "https://picsum.photos/seed/p25/400/400",
];

export default function PhotoSphere() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !cloudRef.current) return;

    const wrapper = wrapperRef.current;
    const tagCloud = cloudRef.current;
    const MAX_TAGS = 36;
    let radius = Math.min(wrapper.offsetWidth, wrapper.offsetHeight, 1000) / 2;

    let angleX = 0, angleY = 0;
    let velX = 0, velY = 0.05;
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    const friction = 0.98;
    let userHasInteracted = false;
    const MOVE_THRESHOLD_PX = 2;

    const tagElements: HTMLElement[] = [];
    let animationFrameId: number;

    function createTags() {
      tagCloud.innerHTML = "";
      tagElements.length = 0;
      const uniqueList = [...new Set(defaultImages)];
      const totalTags = Math.min(MAX_TAGS, uniqueList.length);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < totalTags; i++) {
        const imageUrl = uniqueList[i];
        const tagEl = document.createElement("div");
        tagEl.className = "absolute top-1/2 left-1/2 m-0 whitespace-nowrap select-none origin-top-left transition-opacity duration-200";
        tagEl.style.transformStyle = "preserve-3d";
        tagEl.style.willChange = "transform";

        const imgEl = document.createElement("img");
        imgEl.src = imageUrl;
        imgEl.className = "inline-block w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-lg border-2 border-white/20 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-accent-peach/50 hover:border-accent-peach";
        imgEl.style.transform = "translate(-50%, -50%)";
        imgEl.style.backfaceVisibility = "visible";
        imgEl.draggable = false;
        imgEl.referrerPolicy = "no-referrer";

        let clickStartX = 0, clickStartY = 0;
        let hasDragged = false;

        imgEl.onmousedown = (e) => {
          e.stopPropagation();
          clickStartX = e.clientX;
          clickStartY = e.clientY;
          hasDragged = false;
        };

        imgEl.onmousemove = (e) => {
          if (Math.abs(e.clientX - clickStartX) > 5 || Math.abs(e.clientY - clickStartY) > 5) {
            hasDragged = true;
          }
        };

        imgEl.onclick = (e) => {
          e.stopPropagation();
          if (!hasDragged) {
            setModalImage(imageUrl);
          }
          hasDragged = false;
        };

        // Touch support for image click
        imgEl.ontouchstart = (e) => {
          clickStartX = e.touches[0].clientX;
          clickStartY = e.touches[0].clientY;
          hasDragged = false;
        };

        imgEl.ontouchmove = (e) => {
          if (Math.abs(e.touches[0].clientX - clickStartX) > 5 || Math.abs(e.touches[0].clientY - clickStartY) > 5) {
            hasDragged = true;
          }
        };

        tagEl.appendChild(imgEl);

        const y = 1 - (2 * (i + 0.5)) / totalTags;
        const radiusAtY = Math.sqrt(Math.max(1 - y * y, 0.01));
        const theta = goldenAngle * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        const finalX = x * radius;
        const finalY = y * radius;
        const finalZ = z * radius;

        const yaw = Math.atan2(x, z);
        const pitch = Math.atan2(y, Math.sqrt(x * x + z * z));
        const yaw_deg = (yaw * 180) / Math.PI;
        const pitch_deg = (pitch * 180) / Math.PI;
        
        tagEl.style.transform = `translate3d(${finalX}px, ${finalY}px, ${finalZ}px) rotateY(${yaw_deg}deg) rotateX(${-pitch_deg}deg)`;
        
        tagEl.dataset.x = String(x);
        tagEl.dataset.y = String(y);
        tagEl.dataset.z = String(z);
        
        tagElements.push(tagEl);
        tagCloud.appendChild(tagEl);
      }
    }

    function updateBackfaceVisibility() {
      const ax = (-angleX * Math.PI) / 180;
      const ay = (angleY * Math.PI) / 180;
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      
      tagElements.forEach((el) => {
        const x = parseFloat(el.dataset.x!);
        const y = parseFloat(el.dataset.y!);
        const z = parseFloat(el.dataset.z!);
        const zAfterX = y * sinX + z * cosX;
        const viewZ = -x * sinY + zAfterX * cosY;
        
        if (viewZ < 0) {
          el.style.opacity = "0.3";
          el.style.pointerEvents = "none";
          el.style.zIndex = "0";
        } else {
          el.style.opacity = "1";
          el.style.pointerEvents = "auto";
          el.style.zIndex = "10";
        }
      });
    }

    function animate() {
      if (!isDragging) {
        angleY += velY;
        angleX += velX;
        velY *= friction;
        velX *= friction;
        
        // 缓慢自转 (Slow auto-rotation)
        const baseSpeed = 0.08;
        if (Math.abs(velY) < baseSpeed) {
          velY = velY < 0 ? -baseSpeed : baseSpeed;
        }
      }

      tagCloud.style.transform = `translate(-50%, -50%) rotateY(${angleY}deg) rotateX(${-angleX}deg)`;
      updateBackfaceVisibility();

      animationFrameId = requestAnimationFrame(animate);
    }

    function screenDeltaToAngleDelta(dx: number, dy: number) {
      const sensitivity = 0.08;
      const ay = (angleY * Math.PI) / 180;
      const cosY = Math.cos(ay);
      const signY = cosY >= 0 ? 1 : -1;
      return {
        dAngleX: dy * sensitivity * signY,
        dAngleY: dx * sensitivity,
      };
    }

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") return;
      isDragging = true;
      userHasInteracted = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      wrapper.style.cursor = "grabbing";
      velX = 0;
      velY = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      const totalMove = Math.sqrt((e.clientX - dragStartX) ** 2 + (e.clientY - dragStartY) ** 2);
      
      if (totalMove >= MOVE_THRESHOLD_PX) {
        const { dAngleX, dAngleY } = screenDeltaToAngleDelta(dx, dy);
        angleX += dAngleX;
        angleY += dAngleY;
        const velocityBlend = 0.4;
        velX = velX * (1 - velocityBlend) + dAngleX * velocityBlend;
        velY = velY * (1 - velocityBlend) + dAngleY * velocityBlend;
      }
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        wrapper.style.cursor = "grab";
      }
    };

    wrapper.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    wrapper.addEventListener("mouseleave", handleMouseUp);

    let isVerticalSwipe = false;
    let hasDeterminedDirection = false;

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      userHasInteracted = true;
      dragStartX = e.touches[0].clientX;
      dragStartY = e.touches[0].clientY;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
      velX = 0;
      velY = 0;
      hasDeterminedDirection = false;
      isVerticalSwipe = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const dx = e.touches[0].clientX - lastMouseX;
      const dy = e.touches[0].clientY - lastMouseY;
      
      if (!hasDeterminedDirection) {
        const totalDx = Math.abs(e.touches[0].clientX - dragStartX);
        const totalDy = Math.abs(e.touches[0].clientY - dragStartY);
        if (totalDx > 5 || totalDy > 5) {
          hasDeterminedDirection = true;
          isVerticalSwipe = totalDy > totalDx;
        }
      }

      if (hasDeterminedDirection && isVerticalSwipe) {
        isDragging = false;
        return;
      }

      if (e.cancelable) {
        e.preventDefault();
      }

      const totalMove = Math.sqrt((e.touches[0].clientX - dragStartX) ** 2 + (e.touches[0].clientY - dragStartY) ** 2);
      
      if (totalMove >= MOVE_THRESHOLD_PX) {
        const { dAngleX, dAngleY } = screenDeltaToAngleDelta(dx, dy);
        angleX += dAngleX;
        angleY += dAngleY;
        const velocityBlend = 0.4;
        velX = velX * (1 - velocityBlend) + dAngleX * velocityBlend;
        velY = velY * (1 - velocityBlend) + dAngleY * velocityBlend;
      }
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        isDragging = false;
      }
    };

    wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    const handleResize = () => {
      radius = Math.min(wrapper.offsetWidth, wrapper.offsetHeight, 1000) / 2;
      createTags();
    };
    window.addEventListener("resize", handleResize);

    createTags();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      wrapper.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      wrapper.removeEventListener("mouseleave", handleMouseUp);
      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div 
        ref={wrapperRef} 
        className="absolute inset-0 w-full h-full cursor-grab touch-pan-y z-10"
        style={{ perspective: '1000px' }}
      >
        <div 
          ref={cloudRef} 
          className="absolute top-1/2 left-1/2 w-full h-full origin-center"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform', transform: 'translate(-50%, -50%)' }}
        ></div>
      </div>

      {modalImage && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 animate-in fade-in duration-300"
          onClick={() => setModalImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setModalImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={modalImage} 
            alt="Enlarged" 
            className="max-w-[90%] max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300" 
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </>
  );
}
