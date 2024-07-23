import { firebaseApp } from './firebase'
import { VueFire, VueFireAuth } from 'vuefire'
import { createApp } from 'vue'
import Vue3Editor from 'vue3-editor'
import store from './store'
import App from './App.vue'
import router from './router'
import { quillEditor } from 'vue3-quill'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

const app = createApp(App)
library.add(fas, far, fab)
app.use(Vue3Editor)
app.use(store)
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
app.use(quillEditor)

app.mount('#app')
