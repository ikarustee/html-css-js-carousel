const track = document.querySelector(".carousel__track")
// Store all slides within an array
// Array.from creates a new, shallow-copied Array instance from an iterable or array-like object.
const slides = Array.from(track.children)
// console.log(track.childElementCount)
// console.log(slides)

const prevBtn = document.querySelector(".carousel__button--left")
const nextBtn = document.querySelector(".carousel__button--right")
const dotsNav = document.querySelector(".carousel__nav")
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width // gets the width of the element

// arrange the slides next to one another
// Create a named function which makes it easy for someone else to read id
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px"
}
// this makes it a lot more obvious of what we're doing
// take the slides and for each slide use that function
slides.forEach(setSlidePosition) // take the setSlidePosition function as parameter for the forEach

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`
  currentSlide.classList.remove("current-slide")
  targetSlide.classList.add("current-slide")
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide")
  targetDot.classList.add("current-slide")
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("is-hidden")
    nextBtn.classList.remove("is-hidden")
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove("is-hidden")
    nextBtn.classList.add("is-hidden")
  } else {
    prevBtn.classList.remove("is-hidden")
    nextBtn.classList.remove("is-hidden")
  }
}

// When I click left move slides to left
prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide")
  const prevSlide = currentSlide.previousElementSibling
  const currentDot = dotsNav.querySelector(".current-slide")
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex((slide) => slide === prevSlide)

  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex)
})

// When I click right move slides to right
nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide")
  const nextSlide = currentSlide.nextElementSibling
  const currentDot = dotsNav.querySelector(".current-slide")
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slides.findIndex((slide) => slide === nextSlide)

  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex)
})

// When I click the nav indicator, move to that slide
dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked
  const targetDot = e.target.closest("button")
  if (!targetDot) return

  const currentSlide = track.querySelector(".current-slide")
  const currentDot = dotsNav.querySelector(".current-slide")
  const targetIndex = dots.findIndex((dot) => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex)
})
