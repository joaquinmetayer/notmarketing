const app = new Vue({
    el: '#app',
    data() {
      return {
        colors: ['#D53738', '#638867', '#FAF429','#fff'],
        current: 0
      }
    },
    mounted() {
      let timeline = anime.timeline({
        autoplay: true,
        duration: 2000,
        easing: 'linear',
        loop: true
      })
      
      this.colors.forEach((color, index) => {
        timeline.add({
          targets: document.querySelectorAll('nav > div')[index].children[0],
          width: '100%',
          changeBegin: (a) => {
            this.current = index
          }
        })
      })
    }
  })