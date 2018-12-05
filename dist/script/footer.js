;window.onload = function(){
    console.log(11111)
    $("footer").on("click","li",function(){
        console.log($(this).index());
        switch(true){
            case $(this).index() == 0 :
                location.href = "hourui.html";
            break;
            case $(this).index() == 1 :
                location.href = "liuyingjie.html";
            break;
            case $(this).index() == 2 :
                location.href = "songzhanyu.html";
            break;
            case $(this).index() == 3 :
                location.href = "zhousong";
            break;
            case $(this).index() == 4 :
                location.href = "suzhig.html";
            break;
        }
    })
}