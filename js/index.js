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
//2.搜索框拓展
let searchInpObj = document.querySelector('.search-text');
let searchUlObj = document.querySelector('.search-res');
// console.log(searchInpObj, searchUlObj);
let searchTime = '';
searchInpObj.oninput = function() {
    clearInterval(searchTime);
    searchTime = setTimeout(function() {
        let searInVal = searchInpObj.value;
        // console.log(searInVal);
        if (searInVal) {
            searchUlObj.innerHTML = '';
            Get(searInVal);
        }
    }, 1000);
};

function Get(vals) {
    //创建节点
    let sc = document.createElement('script');
    sc.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + vals + "&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=Back";

    // 追加到页面
    document.head.appendChild(sc);
    sc.remove(); //清除scripts
};

//回调函数
function Back(data) {
    data.s.forEach(vals => { //遍历获取到的关键字数据
        let liObj = document.createElement('li'); //创建li
        liObj.innerHTML = vals; //li的内容为关键字
        searchUlObj.appendChild(liObj); //追加到ul下
    })
}
//鼠标移走ul清除
searchInpObj.onblur = function() {
    searchUlObj.innerHTML = '';
};
//3.轮播图
//节点对象的获取
let ulObj = $('.box_autoplay_list').children[0];
// console.log(ulObj);
let ulLisObj = ulObj.children;
let olObj = $('.box_autoplay_list').children[1];
let scObj = $('.box_autoplay_list');
let imgW = scObj.offsetWidth; // 图片宽度
// console.log(imgW);
// 左右箭头获取
let arrObj = $('#arr');
let leftObj = $('#left');
let rightObj = $('#right');

//索引值
let index = 0;
//1.给图片上增加索引按钮
for (let i = 0; i < ulLisObj.length; i++) {
    let newUlLisObj = document.createElement('li');
    newUlLisObj.innerHTML = i + 1;
    olObj.appendChild(newUlLisObj);

    //给第一个li设置选中属性
    i == 0 && newUlLisObj.classList.add('current');
    //给li绑定点击事件
    newUlLisObj.onclick = liClick;
}
//newUlLisObj的点击事件
function liClick() {
    //获取当前li的索引
    index = this.innerHTML - 1;
    //move函数让图片移动
    // console.log(imgW * index);
    move(ulObj, {
        left: -(imgW * index)
    }, )

    //根据对应的索引给li设置样式
    select();
}
//选中li的函数
function select() {
    //当前选中的li样式 取消
    let sel = document.querySelector('.current');
    sel.className = '';
    //给点击的li设置样式
    olObj.children[index].className = 'current';
}
//节点获取封装函数
function $(tag) {
    return document.querySelector(tag);
}

//增加左右箭头
arrObj.parentNode.onmouseenter = function() {
    arrObj.style.display = 'block'; //显示箭头
    //清除定时器，暂停轮播
    clearInterval(timer);
}
arrObj.parentNode.onmouseleave = function() {
    arrObj.style.display = 'none'; //隐藏箭头
    auto(); //播放轮播
}


// 克隆第一张图片
let cloneImg = ulLisObj[0].cloneNode(true);
// console.log(cloneImg);
// cloneImg.style.borderTop = '1px solid red';

// 追加到ul最后
ulObj.appendChild(cloneImg);

//右箭头点击事件
rightObj.onclick = function() {
    let leftWidth = ''; //ul的left
    let onOff = false; //跳转到第一张图片的开关状态值
    if (index == olObj.children.length - 1) { //当到达最后一个索引时
        index++; //让最后克隆的图片出来
        leftWidth = imgW * index; //设置ul的left值
        // console.log(leftWidth);
        index = 0; //跳转到第一张图片
        onOff = true;
        // console.log(index, onOff);
    } else {
        index++; //点一次索引加一次
        leftWidth = imgW * index; //设置ul的left值
    }
    move(ulObj, {
        left: -leftWidth
    }, function() {
        onOff && (ulObj.style.left = '0px'); //当开关为true，自动跳到第一张图片
    })
    select(); //li的样式
}


//左箭头点击事件
leftObj.addEventListener('click', function() {
    index--; //索引减1
    if (index == -1) { //当到第一张图后，下一个索引应该是最后一张图片
        ulObj.style.left = -olObj.children.length * imgW + 'px'; //left为最后一张图的left值
        index = olObj.children.length - 1; //索引为最后一个
    }
    let leftWidth = index * imgW; //ul的left值
    move(ulObj, {
        left: -leftWidth
    })
    select(); //li的样式
})

//自动播放函数
var timer = '';

function auto() {
    timer = setInterval(function() {
        rightObj.onclick();
    }, 1500)
}
auto();
//移动函数的封装
var times = '';

function move(ele, target, cb) {
    clearInterval(times);
    times = setInterval(function() {
        var onOff = true;
        // 遍历运动的方向和目标
        for (let attr in target) {
            // attr 表示运动的属性
            // console.log(attr);
            // 获取元素属性的实时值
            let tmpVal = parseInt(getPos(ele, attr))
                // 计算speed
                // console.log(tmpVal, attr);
            let speed = (target[attr] - tmpVal) / 5;
            // 取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            // 停止计时器,当一个属性运动到位置,设置开关状态
            if (tmpVal == target[attr]) onOff = true;
            // 让元素动起来
            ele.style[attr] = tmpVal + speed + 'px';
        }

        // 判断开关状态,清除定时器
        for (var moveAttr in target) {
            // 如果不相等,就说明有属性没有运动到位置,定时器不能停止
            if (target[moveAttr] !== parseInt(getPos(ele, moveAttr))) {
                onOff = false;
                break;
            }
        }
        if (onOff) {
            clearInterval(times);
            cb && cb();
        }
        // console.log(1111);
    }, 50)
}
// 获取元素的实时位置的函数
function getPos(obj, attr) {
    if (obj.currentStyle) { // 获取css的样式
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj)[attr]
    }
};


//左侧列表显示
let appListObj = document.querySelector('.leftUl').children;
// console.log(appListObj);
let leftObj2 = document.querySelector('.children-col-4');
Array.from(appListObj).forEach(v => {
    v.addEventListener('mouseover', function() {
        leftObj2.style.display = 'block';
    });
    v.addEventListener('mouseout', function() {
        leftObj2.style.display = 'none';
    });
});

//4.返回顶部
let backTopObj = document.querySelector('#backTop');
let scrTop = document.documentElement.scrollTop || document.body.scrollTop;
let backTimes = '';
// console.log(backTopObj);
window.onscroll = function() {
    window.onscroll = function() {
        scrTop = document.documentElement.scrollTop;
        if (scrTop >= 1200) {
            backTopObj.style.display = 'block';
        } else if (scrTop < 1200) {
            backTopObj.style.display = 'none';
        }
    };
    backTopObj.addEventListener('click', function() {
        scrTop = document.documentElement.scrollTop;
        if (scrTop >= 1200) {
            // console.log('点完');
            backTimes = setInterval(function() {
                scrTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrTop > 0) {
                    document.documentElement.scrollTop = scrTop - 50;
                } else if (scrTop <= 0) {
                    clearInterval(backTimes);
                }
            }, 20)
        } else {
            backTopObj.style.display = 'none';
        }
    });
};


//5.倒计时
var strobj = document.querySelector('.countdown-desc strong'); //获取节点
var hobj = document.querySelector('.hour');
var mobj = document.querySelector('.minute');
var sobj = document.querySelector('.second');

function fn() { //函数
    var date = new Date(); //当前时间
    var sh = date.getHours(); //当前时
    if (sh % 2) { //只能为偶数
        sh--;
    }
    strobj.innerHTML = sh + ':00';

    date.setHours(sh + 2); //设置结束时间，加两小时
    date.setMinutes(0);
    date.setSeconds(0);


    var newtime = new Date(); //当前时间

    var dif = date - newtime; //时间差

    var h = parseInt(dif / 1000 / 60 / 60); //转换为时
    var m = parseInt(dif / 1000 / 60 % 60); //转换为分
    var s = parseInt(dif / 1000 % 60); //转换为秒

    hobj.innerHTML = h < 10 ? '0' + h : h; //显示出来
    // console.log(hobj.innerHTML);
    mobj.innerHTML = m < 10 ? '0' + m : m;
    sobj.innerHTML = s < 10 ? '0' + s : s;
    // console.log('aaa');
};
fn();
setInterval(fn, 1000) //定时更新

//6.自动滚动
window.onload = function() {
    scrollLeft();
};

function scrollLeft() {
    var speed = 20;
    var tab = document.getElementById('demoin');
    var tab1 = document.getElementById('demo1');
    var tab2 = document.getElementById('demo2');
    tab2.innerHTML = tab1.innerHTML;

    function Marquee() {
        if (tab2.offsetWidth - tab.scrollLeft <= 0) {
            tab.scrollLeft = 0;
        } else {
            tab.scrollLeft++;
        }

    }
    var timer = setInterval(Marquee, speed);
    tab.onmouseover = function() {
        clearInterval(timer);
    };
    tab.onmouseout = function() {
        timer = setInterval(Marquee, speed);
    }
};
let scrolObj = document.querySelector('#demoin');
// console.log(scrolObj);
scrolObj.addEventListener('mouseleave', function() {
    scrolObj.style.overflowX = 'hidden';
});
scrolObj.addEventListener('mouseenter', function() {
    scrolObj.style.overflowX = 'scroll';
});
//7购物车显示内容
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