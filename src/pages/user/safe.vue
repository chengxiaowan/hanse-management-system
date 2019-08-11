<template>
    <div>
        <v-title page="安全设置"></v-title>
    </div>
</template>
<script>
import title from '../../components/title'
export default {
    name:"safe",
    components:{
        "v-title":title,
    },
    data(){
        return{
            info:"安全设置"
        }
    }
}
</script>