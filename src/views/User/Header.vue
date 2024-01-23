<script setup>
defineProps({
  image: {
    type: String,
    default: "",
  },
  title: {
    type: [String, Object],
    default: "",
    text: String,
    variant: {
      validator(value) {
        return ["h1", "h2", "h3", "h4", "h5", "h6"].includes(value);
      },
    },
    class: {
      type: String,
      default: "",
    },
  },
  description: {
    type: [String, Object],
    default: "",
    text: String,
    class: String,
  },
  mask: {
    type: String,
    default: "mask bg-gradient-success opacity-4",
  },
  center: {
    type: Boolean,
    default: false,
  },
  minHeight: {
    type: String,
    default: " min-vh-75",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <header class="header-2">
    <div
      id="carouselExample"
      class="page-header carousel slide"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://theme.hstatic.net/1000160337/1000885200/14/slide_1_img.jpg?v=298" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="https://theme.hstatic.net/1000160337/1000885200/14/slide_2_img.jpg?v=298" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="https://theme.hstatic.net/1000160337/1000885200/14/slide_3_img.jpg?v=298" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="https://theme.hstatic.net/1000160337/1000885200/14/slide_4_img.jpg?v=298" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </header>
</template>
<style scoped>
  .page-header {
    width: 100% !important;
  }
  .carousel {
    margin-top: 0;
    margin-left: 0;
  }
</style>