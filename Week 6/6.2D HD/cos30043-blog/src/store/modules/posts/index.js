import postsAction from './actions.js'
import postsGetter from './getters.js'
import postsMutation from './mutations.js'
const posts = {
  state() {
    return {
      editPost: false,
      posts: []
      // posts: [
      //   {
      //     id: 1,
      //     title: 'The Future of Web Development',
      //     content:
      //       'The future of web development is bright. With the rise of new technologies such as React, Angular, and Vue.js, developers have more tools at their disposal than ever before. In this blog post, we will discuss the latest trends in web development and how you can stay ahead of the curve.',
      //     imageUrl:
      //       'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      //     date: 'June 30, 2024'
      //   },
      //   {
      //     id: 2,
      //     title: 'The Rise of JavaScript Frameworks',
      //     content:
      //       'JavaScript frameworks have become an essential part of modern web development. With the rise of React, Angular, and Vue.js, developers have more options than ever before. In this blog post, we will discuss the latest trends in JavaScript frameworks and how you can use them to build better web applications.',
      //     imageUrl:
      //       'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      //     date: 'June 30, 2024'
      //   },
      //   {
      //     id: 3,
      //     title: 'The Importance of Responsive Design',
      //     content:
      //       'Responsive design is essential for modern web development. With the rise of mobile devices, developers need to ensure that their websites are accessible on all devices. In this blog post, we will discuss the importance of responsive design and how you can use it to create better user experiences.',
      //     imageUrl:
      //       'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      //     date: 'June 30, 2024'
      //   },
      //   {
      //     id: 4,
      //     title: 'The Serverless Architecture',
      //     content:
      //       'Serverless architecture is a new approach to web development that allows developers to build applications without managing servers. In this blog post, we will discuss the benefits of serverless architecture and how you can use it to create better web applications.',
      //     imageUrl:
      //       'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      //     date: 'June 30, 2024'
      //   }
      // ]
    }
  },
  mutations: postsMutation,
  actions: postsAction,
  getters: postsGetter
}
export default posts
