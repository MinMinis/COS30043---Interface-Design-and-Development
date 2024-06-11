<template>
  <div class="home">
    <h2 class="text-center">Welcome {{ input.fname }} {{ input.lname }} !</h2>
    <p class="text-center">What is your name?</p>
    <div class="my-4">
      <label for="fname" class="form-label">First Name:</label>
      <input type="text" class="form-control mb-2" v-model="input.fname" placeholder="First Name" />
      <label for="lname" class="form-label">Last Name:</label>
      <input type="text" class="form-control" v-model="input.lname" placeholder="Last Name" />
    </div>
    <div class="form-check my-4">
      <input
        class="form-check-input"
        type="radio"
        id="ocean"
        name="img"
        value="ocean"
        v-model="input.img"
      />
      <label class="form-check-label" for="ocean">Ocean</label><br />
      <input
        class="form-check-input"
        type="radio"
        id="mountain"
        name="img"
        value="mountain"
        v-model="input.img"
      />
      <label class="form-check-label" for="mountain">Mountain</label><br />
    </div>
    <div class="text-center" v-if="input.img !== ''">
      <img :src="imgSrc" alt="image" class="img-fluid" style="width: 300px; height: 300px" />
    </div>
  </div>
</template>
<script>
import oceanImage from '@/assets/ocean.jpg'
import mountainImage from '@/assets/mountain.jpg'
export default {
  name: 'TheHome',
  data() {
    return {
      input: { fname: '', lname: '', img: '' }
    }
  },
  computed: {
    imgSrc() {
      if (this.input.img === 'ocean') {
        return oceanImage
      } else if (this.input.img === 'mountain') {
        return mountainImage
      } else {
        return ''
      }
    }
  }
}
</script>
