<template>
   <a :href="detailUrl">
        <div class="card clearfix">
            <div class="card_img lf"><image @click.stop="scale(bookinfo.image)" :src="bookinfo.image" alt="" mode="aspectFit" style="width:100%;height:100%;"></image></div>
            <div class="lf card_box"> 
                    <div class="card_info clearfix">
                        <div class="left lf primary_color">
                            {{bookinfo.title}}
                        </div>
                        <div class="right rf primary_color">
                            {{bookinfo.rate}}<Rate :rate="bookinfo.rate"></Rate>
                        </div>
                    </div>
                    <div class="card_info clearfix">
                        <div class="left lf">
                            {{bookinfo.author}}
                        </div>
                        <div class="right  rf primary_color">
                            浏览:{{bookinfo.count}}
                        </div>
                    </div>
                    <div class="card_info clearfix">
                        <div class="left lf">   
                            {{bookinfo.publisher}}
                        </div>
                        <div class="right rf">
                            {{bookinfo.user_info.nickName}}
                        </div>
                    </div>
            </div>
        </div>
    </a>      
</template>

<script>
import Rate from "@/components/Rate.vue"
export default {
    name:"Card",
    props:['bookinfo'],
    data () {
        return{

        }
    },
    methods:{
        scale (url) {
            wx.previewImage({
                current:url,
                urls:[url]
            })
        }
    },
    computed:{
        detailUrl(){
            return '/pages/detail/main?id='+this.bookinfo.id;
        }
    },
    components:{
        Rate
    }
}
</script>

<style lang="scss" scoped>
    .card{
        padding:0 20rpx;
        margin-top: 20rpx;
        .card_img{
            width:148rpx;
            height:178rpx;
        }
        .card_box{
            width:533rpx;
            padding-left:30rpx;
            font-size:28rpx;
            line-height: 44rpx;
        }
    }
</style>


