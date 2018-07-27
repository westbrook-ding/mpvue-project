<template>
    <div class="rate">
       <span>☆☆☆☆☆</span>
       <div class="rate_cover" :style="style">
        ★★★★★
       </div>
    </div>
</template>
<script>
export default {
    name:"rate",
    props:["rate"],
    computed:{
     style(){
         return `width:${this.rate/2-0.8}em`;
     }
    }
}
</script>

<style lang="scss" scoped>
    .rate{
        position:relative;
        display:inline-block;
        .rate_cover{
            position:absolute;
            left:0;
            top:0;
            width:0;
            display:inline-block;
            overflow: hidden;
        }
    }
</style>


