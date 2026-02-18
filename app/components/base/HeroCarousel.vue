<template>
  <section id="hero-carousel" class="relative w-full h-[60vh] md:h-[90vh] overflow-hidden bg-black mt-16">
    <div ref="sliderRef" class="w-full h-full pointer-events-none" />
    <!-- Navigation dots -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
      <button
        v-for="(_, i) in images"
        :key="i"
        class="w-3 h-3 rounded-full border border-white/60 transition-all duration-300"
        :class="i === currentIndex ? 'bg-yellow-neon scale-110 border-yellow-neon shadow-[0_0_8px_rgba(253,227,4,0.6)]' : 'bg-white/20 hover:bg-white/40'"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const AUTOPLAY_DELAY = 5000
const TWEEN_DURATION = 1.5

// Simple easeOut tween — replaces GSAP for animating a single value
function tween(
  target: { value: number },
  to: number,
  duration: number,
  onComplete: () => void,
) {
  const from = target.value
  const start = performance.now()
  const ms = duration * 1000

  function tick(now: number) {
    const elapsed = now - start
    const rawProgress = Math.min(elapsed / ms, 1)
    // easeOut (power2): 1 - (1 - t)^2
    const eased = 1 - (1 - rawProgress) ** 2
    target.value = from + (to - from) * eased

    if (rawProgress < 1) {
      requestAnimationFrame(tick)
    }
    else {
      target.value = to
      onComplete()
    }
  }

  requestAnimationFrame(tick)
}

const { hero } = useHero()

const images = computed(() =>
  (hero.value?.carouselImages || [])
    .filter(img => img.url)
    .map(
      img => `/api/sanity/image-proxy?url=${encodeURIComponent(sanityImageUrl(img.url, 1920, 80))}`,
    ),
)

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform float progress;
  uniform float width;
  uniform float scaleX;
  uniform float scaleY;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform vec4 resolution;
  varying vec2 vUv;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec4 fade(vec4 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  float cnoise(vec4 P){
    vec4 Pi0 = floor(P);
    vec4 Pi1 = Pi0 + 1.0;
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec4 Pf0 = fract(P);
    vec4 Pf1 = Pf0 - 1.0;
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 / 7.0;
    vec4 gy00 = floor(gx00) / 7.0;
    vec4 gz00 = floor(gy00) / 6.0;
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 / 7.0;
    vec4 gy01 = floor(gx01) / 7.0;
    vec4 gz01 = floor(gy01) / 6.0;
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 / 7.0;
    vec4 gy10 = floor(gx10) / 7.0;
    vec4 gz10 = floor(gy10) / 6.0;
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 / 7.0;
    vec4 gy11 = floor(gx11) / 7.0;
    vec4 gz11 = floor(gy11) / 6.0;
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000,g0000), dot(g0100,g0100), dot(g1000,g1000), dot(g1100,g1100)));
    g0000 *= norm00.x; g0100 *= norm00.y; g1000 *= norm00.z; g1100 *= norm00.w;
    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001,g0001), dot(g0101,g0101), dot(g1001,g1001), dot(g1101,g1101)));
    g0001 *= norm01.x; g0101 *= norm01.y; g1001 *= norm01.z; g1101 *= norm01.w;
    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010,g0010), dot(g0110,g0110), dot(g1010,g1010), dot(g1110,g1110)));
    g0010 *= norm10.x; g0110 *= norm10.y; g1010 *= norm10.z; g1110 *= norm10.w;
    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011,g0011), dot(g0111,g0111), dot(g1011,g1011), dot(g1111,g1111)));
    g0011 *= norm11.x; g0111 *= norm11.y; g1011 *= norm11.z; g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = fade(Pf0);
    vec4 n_0w = mix(vec4(n0000,n1000,n0100,n1100), vec4(n0001,n1001,n0101,n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010,n1010,n0110,n1110), vec4(n0011,n1011,n0111,n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
  }

  float parabola(float x, float k) {
    return pow(4.0 * x * (1.0 - x), k);
  }

  void main() {
    float dt = parabola(progress, 1.0);
    float border = 1.0;
    float yOffset = 0.5 + (1.0 - resolution.w) * 0.5;
    vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5, yOffset);
    vec4 color1 = texture2D(texture1, newUV);
    vec4 color2 = texture2D(texture2, newUV);

    float realnoise = 0.5 * (cnoise(vec4(newUV.x * scaleX, newUV.y * scaleY, 0.0, 0.0)) + 1.0);

    float w = width * dt;
    float maskvalue = smoothstep(1.0 - w, 1.0, vUv.x + mix(-w / 2.0, 1.0 - w / 2.0, progress));
    float mask = maskvalue + maskvalue * realnoise;
    float final = smoothstep(border, border + 0.01, mask);

    gl_FragColor = mix(color1, color2, final);
  }
`

const sliderRef = ref<HTMLElement | null>(null)

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let material: THREE.ShaderMaterial
let plane: THREE.Mesh
let textures: THREE.Texture[] = []
const currentIndex = ref(0)
let isRunning = false
let time = 0
let animationId: number

function loadTextures(urls: string[]): Promise<THREE.Texture[]> {
  const loader = new THREE.TextureLoader()
  return Promise.all(urls.map(url => new Promise<THREE.Texture>((resolve) => {
    loader.load(url, resolve)
  })))
}

function resize() {
  if (!sliderRef.value || !material || !camera || !plane) { return }

  const width = sliderRef.value.offsetWidth
  const height = sliderRef.value.offsetHeight
  renderer.setSize(width, height)
  camera.aspect = width / height

  const imageAspect = textures[0].image.height / textures[0].image.width
  let a1, a2
  if (height / width > imageAspect) {
    a1 = (width / height) * imageAspect
    a2 = 1
  }
  else {
    a1 = 1
    a2 = (height / width) / imageAspect
  }

  material.uniforms.resolution.value.x = width
  material.uniforms.resolution.value.y = height
  material.uniforms.resolution.value.z = a1
  material.uniforms.resolution.value.w = a2

  const dist = camera.position.z
  camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * dist))
  plane.scale.x = camera.aspect
  plane.scale.y = 1
  camera.updateProjectionMatrix()
}

function next() {
  if (isRunning) { return }
  isRunning = true

  const len = textures.length
  const nextTexture = textures[(currentIndex.value + 1) % len]
  material.uniforms.texture2.value = nextTexture

  tween(material.uniforms.progress, 1, TWEEN_DURATION, () => {
    currentIndex.value = (currentIndex.value + 1) % len
    material.uniforms.texture1.value = nextTexture
    material.uniforms.progress.value = 0
    isRunning = false
  })
}

function prev() {
  if (isRunning) { return }
  isRunning = true

  const len = textures.length
  const prevTexture = textures[(currentIndex.value - 1 + len) % len]
  material.uniforms.texture2.value = prevTexture

  tween(material.uniforms.progress, 1, TWEEN_DURATION, () => {
    currentIndex.value = (currentIndex.value - 1 + len) % len
    material.uniforms.texture1.value = prevTexture
    material.uniforms.progress.value = 0
    isRunning = false
  })
}

function render() {
  animationId = requestAnimationFrame(render)
  time += 0.05
  material.uniforms.time.value = time
  renderer.render(scene, camera)
}

function goNext() {
  next()
  resetAutoplay()
}

function goPrev() {
  prev()
  resetAutoplay()
}

function goTo(index: number) {
  if (isRunning || index === currentIndex.value) { return }
  isRunning = true

  const targetTexture = textures[index]
  material.uniforms.texture2.value = targetTexture

  tween(material.uniforms.progress, 1, TWEEN_DURATION, () => {
    currentIndex.value = index
    material.uniforms.texture1.value = targetTexture
    material.uniforms.progress.value = 0
    isRunning = false
  })
  resetAutoplay()
}

// Autoplay
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function startAutoplay() {
  stopAutoplay()
  autoplayTimer = setInterval(next, AUTOPLAY_DELAY)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function resetAutoplay() {
  stopAutoplay()
  startAutoplay()
}

async function initSlider() {
  if (!sliderRef.value || images.value.length < 2) { return }

  textures = await loadTextures(images.value)

  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)
  sliderRef.value.appendChild(renderer.domElement)

  camera = new THREE.PerspectiveCamera(70, 1, 0.001, 1000)
  camera.position.set(0, 0, 2)

  material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      width: { value: 0.5 },
      scaleX: { value: 40 },
      scaleY: { value: 40 },
      texture1: { value: textures[0] },
      texture2: { value: textures[1] },
      resolution: { value: new THREE.Vector4() },
    },
    vertexShader,
    fragmentShader,
  })

  const geometry = new THREE.PlaneGeometry(1, 1, 2, 2)
  plane = new THREE.Mesh(geometry, material)
  scene.add(plane)

  resize()
  window.addEventListener('resize', resize)
  render()
  startAutoplay()
}

onMounted(() => {
  // If images are already available, init right away
  if (images.value.length >= 2) {
    initSlider()
  }
})

// Watch for images arriving after mount (async fetch)
watch(images, (newImages) => {
  if (newImages.length >= 2 && !renderer) {
    initSlider()
  }
})

onUnmounted(() => {
  stopAutoplay()
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  renderer?.dispose()
})
</script>
