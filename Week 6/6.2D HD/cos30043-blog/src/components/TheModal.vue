<script>
export default {
  props: {
    title: {
      type: String
    },
    submit: {
      type: String,
      default: 'Save changes'
    },
    id: {
      type: String,
      default: 'myModal'
    }
  }
}
</script>
<template>
  <div class="modal" :id="id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-if="title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
            {{ submit }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
