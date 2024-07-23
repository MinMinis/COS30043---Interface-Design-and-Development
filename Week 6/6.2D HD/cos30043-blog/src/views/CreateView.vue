<template>
  <div class="container">
    <div class="d-flex my-4 w-100">
      <div class="row w-100">
        <div class="col-sm-12 col-lg-6">
          <label for="title" class="form-label">Post Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="blogTitle"
            placeholder="Enter your post title"
          />
        </div>
        <div class="col-sm-12 col-lg-6 d-flex my-2 my-lg-0 row">
          <label for="cover-photo" class="form-label">Cover Photo</label>
          <input
            type="file"
            id="cover-photo"
            class="form-control col-4"
            accept=".png, .jpg, .jpeg"
            @change="handlePhotoUpload"
          />
          <button
            class="btn mt-2 btn-primary col-4"
            v-if="blogPhotoName"
            data-bs-toggle="modal"
            data-bs-target="#photoModal"
            id="photoModalButton"
          >
            Preview Photo
          </button>
        </div>
      </div>
    </div>
    <TheError v-if="error" :error="error" />
    <quill-editor
      v-model:value="blogHTML"
      content-type="html"
      :options="editorSettings"
      @change="imageHandler"
    ></quill-editor>
    <the-modal title="Preview Photo" id="photoModal" submit="Close">
      <template #body>
        <img :src="blogPhotoFileURL" class="img-fluid" alt="Blog Cover Photo" />
      </template>
    </the-modal>
    <button class="btn btn-primary mt-4" @click="createPost">Create Post</button>
    <router-link :to="{ name: 'preview-post' }" class="btn btn-secondary mt-4"
      >Preview Post</router-link
    >
  </div>
</template>

<script>
import { Quill } from 'vue3-quill'
import ImageUploader from 'quill-image-uploader'
import ImageResize from 'quill-image-resize-vue'
import TheError from '@/components/TheError.vue'
import TheModal from '@/components/TheModal.vue'
import { mapGetters, mapMutations } from 'vuex'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

Quill.register('modules/imageUploader', ImageUploader)
Quill.register('modules/imageResize', ImageResize)

export default {
  components: {
    TheError,
    TheModal
  },
  data() {
    return {
      isUploading: false,
      error: null,
      blogTitle: '',
      blogPhotoName: '',
      blogHTML: '',
      blogPhotoFileURL: '',
      uploadedImages: new Set(),
      editorSettings: {
        modules: {
          imageResize: {},
          imageUploader: {
            upload: this.imageUploaderUploadMethod
          }
        },
        theme: 'snow'
      }
    }
  },
  computed: {
    ...mapGetters([
      'getBlogPhotoName',
      'getBlogHTML',
      'getBlogPhotoFileURL',
      'getBlogTitle',
      'getUploadedImages'
    ])
  },
  methods: {
    ...mapMutations([
      'updateBlogTitle',
      'updateBlogPhotoName',
      'updateBlogHTML',
      'updateBlogPhotoFileURL',
      'updateUploadedImages'
    ]),
    handlePhotoUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.blogPhotoName = file.name
        this.updateBlogPhotoName(file.name)
        this.blogPhotoFileURL = URL.createObjectURL(file)
        this.updateBlogPhotoFileURL(this.blogPhotoFileURL)
      }
    },
    imageUploaderUploadMethod(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imageDataURL = e.target.result
          if (!imageDataURL) {
            return reject(new Error('Failed to read file'))
          }
          const fileName = this.generateRandomString() + '.jpg'
          const blob = this.dataURLToBlob(imageDataURL)
          const storageRef = ref(getStorage(), `blog-photos/${fileName}`)
          uploadBytesResumable(storageRef, blob)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
              console.log('Uploaded image URL:', url)
              this.uploadedImages.add(url)
              this.updateUploadedImages(this.uploadedImages)
              resolve(url)
            })
            .catch((error) => {
              console.error('Error uploading image:', error)
              reject(error)
            })
        }
        reader.onerror = (e) => reject(e)
        reader.readAsDataURL(file)
      })
    },

    imageHandler() {
      const imgTagRegex = /<img.*?src="(.*?)"/g
      const matches = Array.from(this.blogHTML.matchAll(imgTagRegex))
      if (!matches.length) {
        return
      }
      this.isUploading = false
      matches.forEach((match) => {
        const imageUrl = match[1]
        if (imageUrl && !this.uploadedImages.has(imageUrl) && !this.isUploading) {
          const fileName = this.generateRandomString() + '.jpg'
          const xhr = new XMLHttpRequest()
          xhr.open('GET', imageUrl)
          xhr.responseType = 'blob'
          xhr.onload = () => {
            const blob = xhr.response
            const storageRef = ref(getStorage(), `blog-photos/${fileName}`)
            uploadBytesResumable(storageRef, blob)
              .then((snapshot) => getDownloadURL(snapshot.ref))
              .then((url) => {
                console.log('Uploaded image URL:', url)
                this.uploadedImages.add(url)
                this.updateUploadedImages(this.uploadedImages)
              })
              .catch((error) => console.error('Error uploading image:', error))
          }
          xhr.send()
        }
      })
      this.isUploading = true
    },
    dataURLToBlob(dataURL) {
      if (!dataURL) {
        throw new Error('Invalid dataURL')
      }
      const arr = dataURL.split(',')
      if (arr.length < 2) {
        throw new Error('Invalid dataURL format')
      }
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    generateRandomString() {
      const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 10; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
      }
      return result
    },
    async createPost() {
      this.error = null
      if (this.blogTitle.length < 1) {
        this.error = 'Please enter a title for your post'
        this.clearErrorAfterTimeout()
        return
      }
      if (this.blogHTML.length < 1) {
        this.error = 'Please enter content for your post'
        this.clearErrorAfterTimeout()
        return
      }
      if (!this.blogPhotoName) {
        this.error = 'Please upload a cover photo for your post'
        this.clearErrorAfterTimeout()
        return
      }
      try {
        const fileInput = document.getElementById('cover-photo')
        const file = fileInput.files[0]
        if (!file) {
          throw new Error('No file selected')
        }
        const storageRef = ref(getStorage(), `blog-photos-cover/${this.blogPhotoName}`)
        const snapshot = await uploadBytesResumable(storageRef, file)
        const coverPhotoURL = await getDownloadURL(snapshot.ref)
        console.log('Uploaded cover photo URL:', coverPhotoURL)
        const result = await this.$store.dispatch('createBlogPost', {
          title: this.blogTitle,
          content: this.blogHTML,
          coverPhotoURL: coverPhotoURL
        })
        if (result) {
          this.$router.replace({ name: 'preview-post' })
        }
      } catch (error) {
        console.error('Error uploading cover photo:', error)
        this.error = 'Error uploading cover photo'
        this.clearErrorAfterTimeout()
      }
    },
    clearErrorAfterTimeout() {
      setTimeout(() => {
        this.error = null
      }, 4000)
    }
  },
  watch: {
    blogTitle(newTitle) {
      this.updateBlogTitle(newTitle)
    },
    blogHTML(newHTML) {
      this.updateBlogHTML(newHTML)
    }
  },
  mounted() {
    this.blogTitle = this.getBlogTitle || ''
    this.blogHTML = this.getBlogHTML || ''
    this.blogPhotoFileURL = this.getBlogPhotoFileURL || ''
    this.blogPhotoName = this.getBlogPhotoName || ''
    this.uploadedImages = new Set(this.getUploadedImages || [])
    console.log(this.$store.getters)
  }
}
</script>

<style>
.ql-editor {
  height: 70vh;
}
.ql-container {
  height: 100%;
  overflow: scroll;
}
</style>
