<template>
  <section class="bg-primary-500 py-16">
    <div class="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-10">
      <img src="/images/get-ready-to-merch-yellow.png" alt="Get ready to merch" class="h-64 object-contain">
      <div class="flip-card flip-card--sm">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="/images/album-front.jpg" alt="Album front" class="w-full h-full object-cover">
          </div>
          <div class="flip-card-back">
            <img src="/images/album-back.png" alt="Album back" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
      <div class="flip-card flip-card--sm">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="/images/circle_logo_red.png" alt="Logo" class="w-full h-full object-contain">
          </div>
          <div class="flip-card-back">
            <img src="/images/circle_logo_red.png" alt="Logo" class="w-full h-full object-contain">
          </div>
        </div>
      </div>
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img src="/images/t-shirt-cover-with-print-transparent.png" alt="T-shirt front" class="w-full h-full object-contain">
          </div>
          <div class="flip-card-back">
            <img src="/images/t-shirt-back-transparent.png" alt="T-shirt back" class="w-full h-full object-contain">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flip-card {
  perspective: 1000px;
  width: 320px;
  height: 320px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s ease;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flip-card--sm {
  width: 260px;
  height: 260px;
}
</style>
