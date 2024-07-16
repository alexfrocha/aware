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

export function animateVotingScreenCard() {
  let card = {
    self: document.getElementById("card"),
    background: document.getElementById("cardbackground"),
    content: document.getElementById("cardcontent"),
  }

  let tl = gsap.timeline()


  // im newbie with gsap =/
  tl.to(card.self, {
      opacity: 1,
      duration: 1
  }, 0)

  tl.to(card.content, {
      y: "-20%",
      opacity: 1,
      duration: .6,
  }, 0)

  tl.to(card.background, {
      y: "-20%",
      opacity: 1,
      duration: .6,
  }, "-=1")

  tl.to(card.content, {
      y: "0",
      opacity: 1,
      duration: 2,
  })

  tl.to(card.background, {
      y: "0",
      opacity: 1,
      duration: 2,
  }, "-=2.3")
}

export function animateInCopyURLNotification() {
  let notification = document.getElementById("copytext")
  let tl = gsap.timeline()
  tl.to(notification, {
    y: 20,
    opacity: 1,
    duration: 1
  })
}

export function animateOutCopyURLNotification() {
  let notification = document.getElementById("copytext")
  let tl = gsap.timeline()
  tl.to(notification, {
    y: 0,
    opacity: 0,
    duration: .4
  })
}