import gsap from "gsap";

export function animateIn(element: any, duration: number) {
    gsap.timeline()
      .to(element, {
        y: '400%',
        duration: 0.3,
        ease: 'elastic.inOut'
      })
      .to(element, {
        y: '-46%',
        opacity: 1,
        duration: duration,
        display: 'flex',
        ease: 'power3.inOut'
      });
}

export function animateOut(element: any, duration: number) {
    gsap.timeline()
      .to(element, {
        y: '-500%',
        opacity: 0,
        duration: duration,
        ease: 'power3.inOut'
      });
}