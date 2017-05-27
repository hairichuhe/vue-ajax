# vue-ajax
vue2.x ajax插件,同jQuery调用方式,简洁

## install
```
npm install https://github.com/hairichuhe/vue-ajax.git
```

## quickliy start
```
import vueAjax from 'vue-ajax'
Vue.use(vueAjax)

this.$ajax({
  type:"GET",
  url:_this.$root.host+"/user",
  dataType:"json",
  success:function(res){
    alert(res;
  }
})
```
