<template>
  <div class="row" style="margin-top: 2%">
    <div class="col-2 list-img" style="margin-left: 2%; margin-top: 1%">
      <div v-for="(x, index) in product?.listImage" :key="index">
        <img
          :src="'http://localhost:8000/api/products/show?url=' + x.url"
          alt="  "
          :width="60"
          data-bs-target="#carouselExampleControls"
          :data-bs-slide-to="index"
        />
      </div>
    </div>
    <div class="col-9">
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div v-for="(x, index) in product?.listImage" :key="index" @click="show(index)">
            <div :class="!index > 0 ? 'carousel-item active' : 'carousel-item'">
              <img
                :src="'http://localhost:8000/api/products/show?url=' + x.url"
                :width="439"
                alt=' One and Only " SLAM DUNK " Hanamichi Sakuragi '
              />
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Array,
      required: true
    },
  },
  methods: {
    show(index) {
        console.log(this)
      this.$viewerApi({
        images: this.array_move(this.$props.product.listImage, index, 0),
      });
    },
    array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    },
  },
};
</script>

<style>
img {
}
.list-img img {
  margin-bottom: 9%;
}
</style>
