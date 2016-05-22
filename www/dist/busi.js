/**
 * Created by yangl on 2016/5/17.
 */
var path = "http://owiss-cloud.test.liuruidong.net/zzj/";
var path_local = "dist/data/";
var path_remote = "http://owiss-cloud.test.liuruidong.net/zzj/"
$(function () {
    'use strict';
    var loadflag = false;
    $(document).on("pageInit", "#news_page", function(e, pageId, $page) {
        console.log("果然加载资讯了。。." + loadflag);
        if (loadflag) return;
        loadflag = true;
        $.ajax({
            type:"get",//请求方式
            url: path + "news.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/news.json",//发送请求地址
//        data:{//发送给数据库的数据
//            username:$("#username").val(),
//            content:$("#content").val()
//        },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                initNews(data.data.news);
            }
        });

        refreshLoad();
        loadLast();
    });

    var flag = false;
    $(document).on("pageInit", "#news_detail_page", function(e, pageId, $page) {
        console.log("是否已经加载："+ flag);

        flag = true;

       var $newsId = GetQueryString("newsId");
       console.log("传过来的newsId:" + $newsId);
        $.ajax({
            type:"get",//请求方式
            url:path+"news_detail.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/news_detail.json",//发送请求地址
           data:{//发送给数据库的数据
               news_id:$newsId
           },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                console.log("资讯详情:" + data.data);
                initNewsDetail(data.data);
            }
        });
    });

    /**
     * 页面初始化品牌页面
     */
    var brand_page_flag = false;
    $(document).on("pageInit", "#product_page", function(e, pageId, $page) {
        console.log("果然加载资讯了。。." + loadflag);
        //if (brand_page_flag) return;
        brand_page_flag = true;
        var $brandId = GetQueryString("brandId");
        console.log("传过来的品牌Id:" + $brandId);
        giveBrandId($brandId);
        giveLoadFlag(brand_page_flag);

        $.ajax({
            type:"get",//请求方式
            url:path+"product.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/product.json",//发送请求地址
           data:{//发送给数据库的数据
               brand_id: $brandId
           },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                initProduct(data.data.product);
            }
        });
        loadLast();
        
        doLoadData();
    });


    var product_detail_flag = false;
    $(document).on("pageInit", "#product_detail_page", function(e, pageId, $page) {
        console.log("产品详情页是否已经加载："+ flag);

        product_detail_flag = true;

        var $productId = GetQueryString("productId");
        giveProductId($productId);
        console.log("传过来的productId:" + $productId);
        $.ajax({
            type:"get",//请求方式
            url:path+"product_detail.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/product_detail.json",//发送请求地址
           data:{//发送给数据库的数据
               product_id:$productId
            },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                console.log("产品详情:" + data.data);
                initProductDetail(data.data);
            }
        });
        
        loadSwiper();
    });


    var product_picture_flag = false;
    $(document).on("pageInit", "#product_picture_div", function(e, pageId, $page) {
        console.log("产品图库是否已经加载："+ flag);

        product_picture_flag = true;

        var $productId = GetQueryString("productId");
        console.log("传过来的productId:" + $productId);
        $.ajax({
            type:"get",//请求方式
            url:path+"picture_detail.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/picture_detail.json",//发送请求地址
           data:{//发送给数据库的数据
               product_id:$productId
           },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                console.log("产品详情:" + data.data);
                initProductPicture(data.data);
            }
        });

        //loadSwiper();
    });

    /**
     * 页面初始化以吨位为条件查询的商品页面
     */
    var tons_page_flag = false;
    $(document).on("pageInit", "#tons_page", function(e, pageId, $page) {
        console.log("果然加载以吨数为条件的初始页面了。。." + loadflag);
        //if (brand_page_flag) return;
        brand_page_flag = true;
        var $minTon = GetQueryString("minTon");
        var $maxTon = GetQueryString("maxTon");
        console.log("传过来的吨数最小:" + $minTon);
        giveTons($minTon, $maxTon);
        //giveLoadFlag(brand_page_flag);

        $.ajax({
            type:"get",//请求方式
            url:path+"product.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/product.json",//发送请求地址
            data:{//发送给数据库的数据
                minTon:$minTon,
                maxTon:$maxTon
            },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                initProduct(data.data.product);
            }
        });
        loadLast();

        doLoadData();

        loadBrands();
    });
    
    var video_page_flag = false;
    $(document).on("pageInit", "#video_page", function(e, pageId, $page) {
        if (video_page_flag) return;
        video_page_flag = true;

        $.ajax({
            type:"get",//请求方式
            url:path+"video.json",//发送请求地址
            //url:"http://owiss-cloud.test.liuruidong.net/zzj/video.json",//发送请求地址
            // data:{//发送给数据库的数据
            //    username:$("#username").val(),
            //    content:$("#content").val()
            // },
            async: false,
            //请求成功后的回调函数有两个参数
            success:function(data,textStatus){
                initVideo(data.data.video);
            }
        });

        //refreshLoad();
        loadLast();
    });

    var photo_page_flag = false;
    $(document).on("pageInit", "#photo_page", function(e, pageId, $page) {
        console.log("图库加载了吗？"+ photo_page_flag);
        if (photo_page_flag) return;
        photo_page_flag = true;

        loadBrands();
    });

    var video_watch_page_flag = false;
    $(document).on("pageInit", "#photo_page", function(e, pageId, $page) {
        console.log("开始播放视频加载了吗页面？"+ video_watch_page_flag);
        if (video_watch_page_flag) return;
        video_watch_page_flag = true;

        var video_src = GetQueryString("video_src");
        initVideoWatch(video_src);
        
    });

    
    $.init();
})

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}