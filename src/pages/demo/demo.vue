<template>
  <div>
      <input-tag placeholder="Add Tag" v-model="tags" :limit="limit"></input-tag>
  </div>
</template>
  
<script>
export default {
  name: "demo",
  data() {
    return {
      info: "demo",
      tags:[],
      limit:5,
    };
  }
};
</script>