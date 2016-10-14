# vue-editable

Allow inline edition for vuejs.

![](http://ww1.sinaimg.cn/large/823603acgw1ez9njhopgwg20dv07iq61.gif)
 

# Usage

```
<table id="app">
    <tr v-for="user in users">
        <td @dblclick="editable($event, user, 'firstname')">{{user.firstname}}</td>
        <td @dblclick="editable($event, user, 'lastname')">{{user.lastname}}</td>
    </tr>
</table>

<script src="js/vue.js"></script>
<script src="js/vue-editable.js"></script>

<script>
Vue.use(VueEditable);

var app = new Vue({ 
    el: '#app', 
    data: {...},
    methods: {
        editable: function(evt, user, key) {
            this.$editable(evt, function(value){
                user[key] = value;
            });         
        },
    },
});
</script>
```
