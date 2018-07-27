<template>
    <div class='swiper'>
        <swiper
        :indicator-dots='true'
        indicator-color='#EA5A49'
        :autoplay='true'
        :interval='4000'
        :duration='1000'
        :circular='true'
        >
            <div :key='imgindex' v-for='(top,imgindex) in imgs'>
                <swiper-item>
                    <img @click="to_detail(oneimg.id)" mode='aspectFit'  class='slide-image' :src="oneimg.image" v-for="(oneimg,index) in top" :key="index"/>
                </swiper-item>
            </div>
        </swiper>
  </div>
</template>

<script>
export default {
    props:['topData'],
    computed:{
        imgs(){
            const imgsArr=this.topData;
            return [imgsArr.slice(0,3),imgsArr.slice(3,6),imgsArr.slice(6)]
        }
    },
    methods:{
        to_detail (id) {
            wx.navigateTo({
                url:'/pages/detail/main?id='+id
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .swiper{
        width:100%;
        margin-top:10rpx;
        .slide-image{
            width:33%;
            height:250rpx;
        }
    }

</style>


