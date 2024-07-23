<template>
  <div>
    <slot name="header"></slot>
    <form @submit.prevent="onSubmit">
      <div v-for="(field, index) in fields" :key="index" class="mb-3">
        <label :for="field.name" class="form-label">{{ field.label }}</label>
        <input
          :type="field.type"
          :id="field.name"
          :name="field.name"
          v-model="formData[field.name]"
          class="form-control"
        />
        <div v-if="errors[field.name]" class="text-danger">{{ errors[field.name] }}</div>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ submitLabel }}
        </button>
      </div>
    </form>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    submitLabel: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {
      formData: {},
      errors: {},
      isSubmitting: false
    }
  },
  created() {
    this.fields.forEach((field) => {
      this.formData[field.name] = ''
      this.errors[field.name] = ''
    })
  },
  methods: {
    validateForm() {
      this.errors = {}
      let valid = true
      this.fields.forEach((field) => {
        if (!this.formData[field.name]) {
          this.errors[field.name] = `${field.label} is required`
          valid = false
        }
      })
      return valid
    },
    async onSubmit(event) {
      event.preventDefault()
      if (this.validateForm()) {
        this.isSubmitting = true
        this.$emit('submit', this.formData)
      }
    }
  }
}
</script>
