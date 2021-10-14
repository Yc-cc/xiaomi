class Mes {
    constructor() {
        this.getLocalStorage();
    };
    //2.获取localStorage数据，追加到页面上
    getLocalStorage() {
        //获取localStorage
        let content = localStorage.getItem('Cart');
        //定义页面内容
        let html = '';
        let len = JSON.parse(content).length;
        let arr = JSON.parse(content);
        let obj = arr[len - 1];
        // console.log(obj.shopName);
        html += `<div class="buy-succ-box">
                <div id="J_goodsBox" class="goods-content">
                    <div class="goods-img"><img src="images/success.png" width="64" height="64"></div>
                    <div class="goods-info">
                        <h3>已成功加入购物车！</h3>
                        <span class="name">${obj.shopName} ${obj.ram} ${obj.color}</span>
                    </div>
                </div>
                <div class="J_actBox">
                    <a href="./index.html" class="btn-line-gray ">返回上一级</a> <a href="./shopping.html" class="btn-primary">去购物车结算</a></div>
            </div>`;
        //追加
        this.$('.container').innerHTML = html;
    };
    //1.获取节点的方法
    $(tag) {
        return document.querySelector(tag);
    };
};
new Mes;



//购物车显示内容
let shoppObj = document.querySelector('.shopping');
let spanObj = document.querySelector('.shopNum');
let HideObj = document.querySelector('.shopHide');
let UlObj = document.querySelector('.hideUl');
//获取localStorage数据
let content = localStorage.getItem('Cart');
let html = '';
if (!content) {
    shoppObj.addEventListener('mouseenter', function() {
        html = `<div class = 'shopNull'></div>
                <a href ='./index.html' class = 'nullA'>购物车为空哦！！</a>
        `;
        UlObj.innerHTML = html;
    });
    shoppObj.addEventListener('mouseleave', function() {
        html = ``;
        UlObj.innerHTML = html;
    });
    UlObj.addEventListener('mouseenter', function() {
        html = `<div class = 'shopNull'></div>
        <a href ='./index.html' class = 'nullA'>购物车为空哦！！</a>
`;
        UlObj.innerHTML = html;
    });
    UlObj.addEventListener('mouseleave', function() {
        html = '';
        UlObj.innerHTML = html;
    });

} else {
    let len = JSON.parse(content).length;
    spanObj.innerHTML = len;
    // console.log(spanObj);

    shoppObj.addEventListener('mouseenter', function() {
        HideObj.style.display = 'block';
        if (len == 0) {
            html = `<div class = 'shopNull'></div>
                <a href ='./index.html' class = 'nullA'>购物车为空哦！！</a>
        `;
        } else {
            JSON.parse(content).forEach(v => {
                // console.log(v);
                html += `<li class="hideLi" goods-id = '${v.id}'>
            <a href="./shopping.html"><img src="${v.src}" alt=""></a><a href="./shopping.html" class="hideName">${v.shopName}</a><a class="hideRam">${v.ram}</a><a class="hideColor">${v.color}</a><br><a class="hidePrice">${v.price} x</a><a class="hideNum">${v.num}</a>
        </li>`;
            });
        }
        UlObj.innerHTML = html;
    });
    shoppObj.addEventListener('mouseleave', function() {
        HideObj.style.display = 'block';
        html = '';
        UlObj.innerHTML = html;
    });
    UlObj.addEventListener('mouseleave', function() {
        HideObj.style.display = 'block';
        html = '';
        UlObj.innerHTML = html;
    });
};