<template>
     <div class="bookInfo">
        <div class="back"><img :src="bookInfo.image" alt="" mode="aspectFill"/></div>
        <div class="main">
            <img :src="bookInfo.image" alt="" :title="bookInfo.title"  mode="aspectFill"/>
            <p>{{bookInfo.title}}</p>
            <p>{{bookInfo.author}}</p>
        </div>
        <div class="extra clearfix">
            <div class="left lf">
                <img :src="userinfo.image" alt=""/>{{userinfo.nickName}}
            </div>
            <div class="right rf primary_color">{{bookInfo.rate}}<Rate :rate="bookInfo.rate"></Rate></div>
        </div>
         <div class="extra clearfix">
            <div class="left lf">
                出版社:{{bookInfo.publisher}}
            </div>
            <div class="right rf">
                {{bookInfo.price}}
            </div>
        </div>
        <div class="tags">
            <p v-for="(tag,i) in bookInfo.tags" :key="i">{{tag}}</p>
        </div>
        <div class="summary">
            <p v-for="(sum,i) in bookInfo.summary" :key="i">{{sum}}</p>
        </div>
    </div>
</template>
<script>
import Rate from "@/components/Rate.vue"
export default {
    components:{
        Rate
    },
    props:['bookInfo'],
    computed:{
        userinfo(){
            return this.bookInfo.user_info || {};
        }
    }
}
</script>

<style lang="scss" scoped>
    .bookInfo{
        width:750rpx;
        .back{
            width:750rpx;
            height:500rpx;
            overflow: hidden;
            img{
                width:100%;
                height:100%;
                filter:blur(15px);
            }
        }
        .main{
            width:750rpx;
            position: absolute;
            left:0;
            top:0;
            text-align: center;
            color:#fff;
            margin-top:30rpx;
            img{
                width:250rpx;
                height:300rpx;
                display: block;
                margin: 0 auto;
            }
        }
        .extra{
            font-size:14px;
            margin-top:8rpx;
            padding:0 10px;
            .left{
                img{
                    width:50rpx;
                    height:50rpx;
                    border-radius:50%;
                    vertical-align: middle;
                }
            }
        }
        .tags{
            padding:0 10px;
            margin-bottom: 40rpx;
            p{
                display:inline-block;
                padding: 6px 4px;
                border-radius:6px;
                font-size:14px;
                margin:30rpx 20rpx 0 0;
                border:1px solid #EA5149;
            }
        }
        .summary{
             padding:0 20px;
             font-size:14px;
             p{
                 text-indent: 16px;
             }
        }
    }
</style>


