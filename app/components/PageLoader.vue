<template>
  <Transition name="loader-fade">
    <div v-if="isLoading" class="page-loader">
      <!-- Subtle grid background -->
      <div class="grid-background"></div>

      <!-- Single expanding ring -->
      <div class="energy-ring"></div>

      <div class="loader-content">
        <!-- SVG crosshair -->
        <div ref="crosshairContainer" class="crosshair-container">
          <svg ref="crosshairSvg" class="crosshair-svg" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
            <path ref="crosshairPath" class="crosshair-path" d="M236,124H219.90771A92.11679,92.11679,0,0,0,132,36.09229V20a4,4,0,0,0-8,0V36.09229A92.11679,92.11679,0,0,0,36.09229,124H20a4,4,0,0,0,0,8H36.09229A92.11679,92.11679,0,0,0,124,219.90771V236a4,4,0,0,0,8,0V219.90771A92.11679,92.11679,0,0,0,219.90771,132H236a4,4,0,0,0,0-8ZM132,211.89844V196a4,4,0,0,0-8,0v15.89844A84.10665,84.10665,0,0,1,44.10156,132H60a4,4,0,0,0,0-8H44.10156A84.10665,84.10665,0,0,1,124,44.10156V60a4,4,0,0,0,8,0V44.10156A84.10666,84.10666,0,0,1,211.89844,124H196a4,4,0,0,0,0,8h15.89844A84.10666,84.10666,0,0,1,132,211.89844ZM128,92a36,36,0,1,0,36,36A36.04061,36.04061,0,0,0,128,92Zm0,64a28,28,0,1,1,28-28A28.03146,28.03146,0,0,1,128,156Z"/>
          </svg>
          <div ref="crosshairGlow" class="crosshair-glow"></div>
        </div>
      </div>

      <!-- Curtains -->
      <div ref="curtainLeft" class="curtain curtain-left"></div>
      <div ref="curtainRight" class="curtain curtain-right"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const isLoading = ref(true)

const crosshairContainer = ref<HTMLElement | null>(null)
const crosshairSvg = ref<SVGElement | null>(null)
const crosshairPath = ref<SVGPathElement | null>(null)
const crosshairGlow = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)
const curtainLeft = ref<HTMLElement | null>(null)
const curtainRight = ref<HTMLElement | null>(null)

onMounted(() => {
  const tl = gsap.timeline()

  // Crosshair container появляется с вращением
  tl.from(crosshairContainer.value, {
    scale: 0.3,
    rotation: -360,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
  })

  // Рисуем путь прицела
  if (crosshairPath.value) {
    const pathLength = crosshairPath.value.getTotalLength()
    gsap.set(crosshairPath.value, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    })

    tl.to(crosshairPath.value, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    }, '-=0.5')
  }

  // Пульсация свечения
  tl.to(crosshairGlow.value, {
    scale: 1.2,
    opacity: 0.8,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  }, '-=0.5')

  // Пульсация самого прицела
  tl.to(crosshairSvg.value, {
    scale: 1.05,
    duration: 0.8,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  }, '<')

  // Закрытие через 2 секунды
  setTimeout(() => {
    // Fade out контента
    gsap.to('.loader-content', {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.in',
    })

    // Шторки разъезжаются
    gsap.to(curtainLeft.value, {
      x: '-100%',
      duration: 0.8,
      ease: 'back.in(1.2)',
    })

    gsap.to(curtainRight.value, {
      x: '100%',
      duration: 0.8,
      ease: 'back.in(1.2)',
      onComplete: () => {
        isLoading.value = false
      },
    })
  }, 2000)
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Subtle grid */
.grid-background {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 107, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 107, 0, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.5;
}

/* Single energy ring */
.energy-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid var(--color-accent-primary);
  border-radius: 50%;
  animation: ringPulse 2s ease-out infinite;
  opacity: 0.3;
}

@keyframes ringPulse {
  0% {
    width: 100px;
    height: 100px;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}

/* Content */
.loader-content {
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* Crosshair container */
.crosshair-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
}

.crosshair-svg {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--color-accent-primary);
  stroke-width: 2;
  filter: drop-shadow(0 0 20px rgba(255, 107, 0, 0.8));
}

.crosshair-path {
  /* GSAP will handle animation */
}

.crosshair-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  z-index: 1;
}

/* Progress bar */
.progress-container {
  width: 400px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg,
    var(--color-accent-primary),
    #fbbf24,
    var(--color-accent-primary)
  );
  background-size: 200% 100%;
  animation: progressShine 1.5s linear infinite;
  border-radius: 2px;
  box-shadow: 0 0 15px rgba(255, 107, 0, 0.6);
  width: 0;
}

@keyframes progressShine {
  to {
    background-position: 200% center;
  }
}

/* Curtains */
.curtain {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%);
  z-index: 10;
}

.curtain-left {
  left: 0;
}

.curtain-right {
  right: 0;
}

@keyframes slideLeft {
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideRight {
  to {
    transform: translateX(100%);
  }
}

/* Fade out */
.loader-fade-leave-active {
  transition: opacity 0.3s ease;
}

.loader-fade-leave-to {
  opacity: 0;
}
</style>
