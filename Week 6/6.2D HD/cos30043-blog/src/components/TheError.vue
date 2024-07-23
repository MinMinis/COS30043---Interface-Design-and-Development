<script>
export default {
  props: {
    error: {
      type: String,
      required: true
    }
  }
}
</script>
<template>
  <div class="text-danger text-center w-100">{{ error }}</div>
</template>
