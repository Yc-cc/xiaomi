//1.顶部列表显示
let listObj = document.querySelector('.list').children;
let itemObj = document.querySelector('.item-children');
// console.log(listObj);
Array.from(listObj).forEach(v => {
    v.addEventListener('mouseover', function() {
        itemObj.style.display = 'block';
    });
    v.addEventListener('mouseout', function() {
        itemObj.style.display = 'none';
    });
});
//2.导航栏的设置
(function() {
    var fixedNavbar = document.getElementById("fixed");
    // console.log(fixedNavbar);
    var staticNavbar = document.getElementById("static");
    var y = staticNavbar.offsetTop + staticNavbar.offsetHeight;
    var positionY = 0;
    var timer = setInterval(function() {
        positionY += 1;
        if (positionY <= staticNavbar.offsetTop) {
            window.scrollTo(0, positionY);
        } else {
            clearInterval(timer);
        }
    }, 2)
    var show = function() {
        fixedNavbar.classList.add("active");
    }
    var hide = function() {
        fixedNavbar.classList.remove("active");
    }

    window.addEventListener("scroll", function() {
        if (window.scrollY > y) {
            show();
        } else {
            hide();
        }
    })
})()
//3.放大镜
class biGer {
    constructor() {
        this.boxObj = this.$('#big_box');
        this.smallObj = this.$('#small');
        this.maskObj = this.$('#mask');
        this.bigObj = this.$('#big');
        this.bImg = this.$('#bimg');

        //鼠标移入事件
        this.smallObj.addEventListener('mouseenter', this.enterFn.bind(this));
        //鼠标移出事件
        this.smallObj.addEventListener('mouseleave', this.leaveFn.bind(this));

        // 绑定鼠标移动事件
        this.smallObj.addEventListener('mousemove', this.moveFn.bind(this));


    };
    //鼠标移入事件
    enterFn() {
        //显示小黄块
        this.maskObj.style.display = 'block';
        //显示大图
        this.bigObj.style.display = 'block';
    }

    //鼠标移出事件
    leaveFn() {
        //隐藏小黄块
        this.maskObj.style.display = 'none';
        //隐藏大图
        this.bigObj.style.display = 'none';
    }

    //移动函数
    moveFn(event) {
        //获取鼠标的位置
        let mouX = event.pageX;
        let mouY = event.pageY;
        //获取box的大小
        let boxX = this.boxObj.offsetLeft;
        let boxY = this.boxObj.offsetTop;
        /* offsetLeft：表示元素的左外边框至offsetParent元素的左内边框之间的像素距离
        offsetTop：表示元素的上外边框至offsetParent元素的上内边框之间的像素距离 */
        // 下面的146和138计算
        //计算黄块的位置
        let maskX = mouX - boxX - 146 - this.maskObj.offsetWidth / 2;
        let maskY = mouY - boxY - 220 - this.maskObj.offsetHeight / 2;
        //计算最大坐标
        let maxL = this.smallObj.offsetWidth - this.maskObj.offsetWidth;
        let maxT = this.smallObj.offsetHeight - this.maskObj.offsetHeight;
        //边界值的判断
        if (maskX < 0) maskX = 0;
        if (maskY < 0) maskY = 0;
        if (maskX > maxL) maskX = maxL;
        if (maskY > maxT) maskY = maxT;
        //设置黄块的位置
        this.maskObj.style.left = maskX + 'px';
        this.maskObj.style.top = maskY + 'px';

        //黄块的位置除以最大范围等于大图的可视位置除以最大范围
        // 计算大图在div中,移动的最大位置
        let bigL = this.bigObj.offsetWidth - this.bImg.offsetWidth;
        let bigT = this.bigObj.offsetHeight - this.bImg.offsetHeight;
        // 计算大图的实时位置
        let tmpBigT = maskY / maxT * bigT;
        let tmpBigL = maskX / maxL * bigL;

        // 实时位置设置给大图
        this.bImg.style.left = tmpBigL + 'px';
        this.bImg.style.top = tmpBigT + 'px';
    }

    //创建节点对象方法
    $(tag) {
        return document.querySelector(tag);
    }

}
new biGer;
//4.点击改变数量
let jiaObj = document.querySelector('.jia');
let jianObj = document.querySelector('.jian');
let inpObj = document.querySelector('#total-number');
//获取总计和单价节点
let totalObj = document.querySelector('#shopPrice');
let danjia = document.querySelector('.shopPric').innerHTML;
// console.log(totalObj);
//给加减绑定点击事件
jiaObj.addEventListener('click', function() {
    let count = inpObj.value;
    count++;
    inpObj.value = count;
    //改变总计
    totalObj.innerHTML = danjia * count;
});
jianObj.addEventListener('click', function() {
    let count = inpObj.value;
    count--;
    if (count <= 1) {
        inpObj.value = 1;
        totalObj.innerHTML = danjia
    } else {
        inpObj.value = count;
        //改变总计
        totalObj.innerHTML = danjia * count;
    }
});



//5.点击改变商品的类型
//获取节点
let leiObj = document.querySelectorAll('.clearfixs');
let shopRamObj = document.querySelector('#shopRam');
let shopColObj = document.querySelector('#shopColor');
let RamObj = document.querySelector('.Ram').children;
let ColorObj = document.querySelector('.Color').children;
// console.log(RamObj);
leiObj.forEach(v => {
    // console.log(v.children);
    let ulObj = v.children;
    Array.from(ulObj).forEach(val => {
        let liObj = val;
        // console.log(liObj);
        // liObj.classList.remove('yc');
        liObj.addEventListener('click', function() {
            Array.from(ulObj).forEach(val => {
                val.classList.remove('yc');
            });
            liObj.classList.add('yc');
            //改变内存和颜色
            Array.from(RamObj).forEach(v => {
                if (v.className == 'yc') {
                    shopRamObj.innerHTML = v.innerHTML;
                }
            });
            Array.from(ColorObj).forEach(v => {
                if (v.className == 'yc') {
                    shopColObj.innerHTML = v.innerHTML;
                }
            });

        });

    });
});



//6.加入购物车
// 获取节点
let clickObj = document.querySelector('.btn-primary');
let id = 0;
let shopName = document.querySelector('#shopName').innerHTML;
let src = document.querySelector('#shopSrc').src;
let price = document.querySelector('#shopPrice').innerHTML;
let num = document.querySelector('#total-number').value;
let choObj = document.querySelectorAll('.clearfixs');

if (shopName == 'Xiaomi Civi') {
    id = 1;
} else if (shopName == 'Xiaomi MIX 4') {
    id = 2;
} else if (shopName == 'Xiaomi MIX FOLD') {
    id = 3;
} else if (shopName == 'Xiaomi 11 Ultra') {
    id = 4;
} else if (shopName == 'Xiaomi 11 Pro') {
    id = 5;
} else if (shopName == 'Xiaomi 11 youngth') {
    id = 6;
};
// console.log(clickObj);
clickObj.addEventListener('click', function() { shopCarts(id, shopName, src, price, num) });

//增加到购物车点击事件
function shopCarts(id, shopName, src, price, num) {
    let ram = choObj[0].children;
    let color = choObj[1].children;
    let menu = choObj[2].children;
    num = document.querySelector('#total-number').value;
    Array.from(ram).forEach(v => {
        if (v.className == 'yc') {
            ram = v;
        }
    });
    ram = ram.innerHTML;
    Array.from(color).forEach(v => {
        if (v.className == 'yc') {
            color = v;
        }
    });
    color = color.innerHTML;
    Array.from(menu).forEach(v => {
        if (v.className == 'yc') {
            menu = v;
        }
    });
    menu = menu.innerHTML;
    // console.log(color);

    //获取购物车的数据
    let msgCart = localStorage.getItem('Cart');
    //1.判断购物车是否有数据
    if (msgCart) { //2有数据
        // console.log(msgCart);
        msgCart = JSON.parse(msgCart); //转化数据
        //4.商品是否存在
        let key = false; //判断存在的标识
        msgCart.forEach(v => { //遍历数据
            if (v.id == id && v.color == color && v.ram == ram && v.menu == menu) { //4.1存在
                //给商品数量增加
                v.num = (v.num - 0) + (num - 0);
                // console.log(v.num);
                key = true; //存在
            };
        });
        //4.2不存在
        if (!key) {
            msgCart.push({ //添加该商品信息
                id,
                shopName,
                src,
                price,
                num,
                ram,
                color,
                menu
            });
        }

        //重新更新存入localStorage
        localStorage.setItem('Cart', JSON.stringify(msgCart));

    } else { //3没数据
        //以数组对象形式保存
        let objGoods = {
            id,
            shopName,
            src,
            price,
            num,
            ram,
            color,
            menu
        };
        let arrGoods = [objGoods];
        //增加到localStorage
        localStorage.setItem('Cart', JSON.stringify(arrGoods))
    }
};


//7.购物车显示内容
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




//8.给评论区增加信息
let talObj = document.querySelectorAll('#talImg');
talObj.forEach(v => {
    v.src = srca;
});
//8.加载更多的点击事件
let moreObj = document.querySelector("#more");
// console.log(moreObj);
let mukObj = document.querySelector('.comment-mid');
let mukInh = mukObj.innerHTML;
moreObj.onclick = talAdd;

function talAdd() {
    // console.log('1');
    moreObj = document.querySelector("#more");
    moreObj.remove();
    mukInh = mukObj.innerHTML;
    mukInh += `<div class="mid-left">
    <div class="l-content">
        <div class="comps">
            <div class="common">
                <div class="top">
                    <a href="javascript:void(0);" class="port"><img id="talImg" src=""></a>
                    <div class="timea"><a href="javascript:void(0);" class="tit">101*****53</a>
                        <div class="times">2021-10-07</div>
                    </div>
                    <div class="lovea">超爱</div>
                </div>
                <a href="#none" class="des">希望出白色款式好轻 好用拍照效果很好～</a>
                <div class="images clearfix">
                    <div class="image big"><img id="talImg" src="" style="width: auto; height: 100%; left: -55.5069px;"></div>
                </div>
                <div class="reply"><input type="text" placeholder="回复楼主" class="input J_reply_input">
                    <div class="btn replyBtn" onclick ="repAdd()">回复</div>
                </div>
                <div class="commentList"></div>
            </div>
        </div>
    </div>
    <div class="more" id="more" onclick="talAdd()">
        加载更多
    </div>
</div>`;
    mukObj.innerHTML = mukInh;

    //给新增的评论增加信息
    talObj = document.querySelectorAll('#talImg');
    talObj.forEach(v => {
        v.src = srca;
    });

    //回复函数
    repObj = document.querySelectorAll('.replyBtn');

    repAdd(); //回复函数
    rep = '';
    repObj.forEach(v => {
        v.addEventListener('click', repAdd.bind(this));
    });

    //返回顶部
    goTObj = document.querySelector('#goTop');
    scrTop = document.documentElement.scrollTop || document.body.scrollTop;
    times = '';

    scrFn(); //返回顶部函数
};

//9.给回复按钮绑定点击事件
let repObj = document.querySelectorAll('.replyBtn');
let repComObj = document.querySelector('.commentList') //追加内容的位置
    // console.log(repObj);
let repInpObj = document.querySelector('.J_reply_input'); //输入框
let rep = ''; //增加的内容

repObj.forEach(v => {
    v.addEventListener('click', repAdd.bind(this));
});

function repAdd(eve) {
    // console.log('1');
    // console.log(repObj);
    if (eve) {
        // console.log(eve.target);
        //判断自定义属性的值
        repObj = document.querySelectorAll('.replyBtn');
        repInpObj = document.querySelectorAll('.J_reply_input');
        repInpObj.forEach(val => {
            repVal = val.value;
        });

        // console.log(repVal);
        rep += `
    <div class="comments">
    <a href="javascript:void(0);"><img src="" id="talImg"></a>
    <div class="c-right"><a href="javascript:void(0);" class="c-t">Yc</a>
        <div class="c-b"><span>${repVal}</span></div>
    </div>
</div>
`;
        repObj = document.querySelectorAll('.replyBtn');
        repInpObj = document.querySelectorAll('.J_reply_input');
        let parObj = eve.target.parentNode.nextElementSibling;
        // console.log(parObj);
        // repComObj = document.querySelector('.commentList');
        parObj.innerHTML = rep;

        //给新增的评论增加信息
        talObj = document.querySelectorAll('#talImg');
        talObj.forEach(v => {
            v.src = srca;
        });
    };
};

//10.返回顶部
let goTObj = document.querySelector('#goTop');
let scrTop = document.documentElement.scrollTop || document.body.scrollTop;
let times = '';
// console.log(goTObj);
scrFn();

function scrFn() {
    window.onscroll = function() {
        scrTop = document.documentElement.scrollTop;
        if (scrTop >= 1200) {
            goTObj.style.display = 'block';
        } else if (scrTop < 1200) {
            goTObj.style.display = 'none';
        }
    };
    goTObj.addEventListener('click', function() {
        scrTop = document.documentElement.scrollTop;
        if (scrTop >= 1200) {
            // console.log('点完');
            times = setInterval(function() {
                scrTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrTop > 0) {
                    document.documentElement.scrollTop = scrTop - 50;
                } else if (scrTop <= 0) {
                    clearInterval(times);
                }
            }, 20)
        } else {
            goTObj.style.display = 'none';
        }
    });
};


//小商品的右左点击
let smallShopRObj = document.querySelector('.shopListR');
let smallShopLObj = document.querySelector('.shopListL');
let smallUlObj = document.querySelector('.smallUl');
let speed = 80;
let smallLeft = smallUlObj.style.left;
smallShopRObj.addEventListener('click', function() {
    smallLeft = smallUlObj.style.left;
    if (smallLeft == '0px') {
        let ling = parseInt(smallLeft);
        smallUlObj.style.left = -ling - speed + 'px';
        // console.log('1');
    } else {
        // console.log(smallLeft);
        let leftLeng = smallLeft.length;
        let leftstring = smallLeft.substring(1, leftLeng - 1);
        let leftnum = parseInt(leftstring);
        // console.log(leftnum);
        //判断left最大值
        smallUlObj.style.left = -leftnum - speed + 'px';
        if (Math.abs(leftnum) >= 480) {
            smallUlObj.style.left = -leftnum + 'px';
        }
    }

});

smallShopLObj.addEventListener('click', function() {
    smallLeft = smallUlObj.style.left;
    if (smallLeft == '') {

    } else {
        let leftLeng = smallLeft.length;
        let leftstring = smallLeft.substring(1, leftLeng - 1);
        let leftnum = parseInt(leftstring);
        // console.log(leftnum);
        //判断left最小值
        smallUlObj.style.left = -leftnum + speed + 'px';
    }
});

//小商品的移入事件
let smallLiObj = smallUlObj.children;
let changeObj = document.querySelectorAll('.changSmall');
// console.log(changeObj);

smallUlObj.onmouseover = function(ev) {
    Array.from(smallLiObj).forEach(v => {
        v.classList.remove('checked');
    });
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if (target.nodeName.toLowerCase() == "img") {
        target.parentNode.classList.add('checked');
        let newImg = target.src;
        // console.log(newImg);
        changeObj.forEach(val => {
            val.src = newImg;
        });
    }
};
/* smallUlObj.onclick = function(eve) {
    Array.from(smallLiObj).forEach(v => {
        v.classList.remove('checked');
    });
    if (eve.target.className == 'li')
        let eveLiObj = eve.target.parentNode;
    eveLiObj.classList.add('checked');
    let newImg = eve.target.src;
    // console.log(newImg);
    changeObj.forEach(val => {
        val.src = newImg;
    });
}; */