class Car {
    constructor() {
        this.getLocalStorage();

        //3.获取全选按钮,子选项节点
        this.allCheck = document.querySelectorAll('.check-all');
        this.oneCheck = document.querySelectorAll('.check-one');
        // 3.全选按钮,绑定事件
        this.allCheck[0].addEventListener('click', this.allClick.bind(this, 1))
        this.allCheck[1].addEventListener('click', this.allClick.bind(this, 0));

        //4.单选按钮,绑定事件
        this.oneClick();
        this.closShow();
        let onecheObj = this.oneCheck;
        // console.log(onecheObj);
        onecheObj.forEach(v => {
            // console.log(v);
            v.addEventListener('click', function() {
                // console.log(v.checked);
                if (!v.checked) {
                    $('#closing').popover('show');
                } else {
                    $('#closing').popover('hide');
                };
                onecheObj.forEach(val => {
                    if (val.checked) {
                        $('#closing').popover('hide');
                    };
                });
            });
        });

        //5.给＋号绑定点击事件
        this.$('tbody').addEventListener('click', this.tbodyFn.bind(this));

    };
    //3-1统计数量和总价
    totalNum(oneObj = '') {
        // console.log(111);
        // 删除的时候,重新获取check-one数据
        this.oneCheck = oneObj || this.oneCheck;
        //定义总共的数量和价格
        let totalnum = 0;
        let totalprice = 0;

        //循环所有购物车商品，选择选中的
        this.oneCheck.forEach(v => {
            // console.log(v);
            if (v.checked) { //选中的商品
                //获取选中的商品的数量和小计
                let num = v.parentNode.parentNode.querySelector('.count-input').value - 0;
                let tprice = v.parentNode.parentNode.querySelector('.subtotal').innerHTML - 0;

                //计算总的数量和价格
                totalnum += num;
                totalprice += tprice;
            };
            //讲总的数量和价格给结算
            this.$('#selectedTotal').innerHTML = totalnum;
            this.$('#priceTotal').innerHTML = totalprice;
        });
    };

    //3.全选按钮点击事件
    allClick(index, eve) {
        //获取全选按钮的状态值
        // console.log(eve.target);
        let allStatus = eve.target.checked;
        //让子选项的状态值跟随全选按钮
        this.oneCheck.forEach(v => {
            v.checked = allStatus;
        });
        //另外一个全选按钮状态值
        this.allCheck[index].checked = allStatus;
        //调用统计函数
        this.totalNum();
    };

    //4.单选按钮,绑定事件
    oneClick() {
        // console.log(this);
        //改变this指向
        let that = this;
        //定义计数
        // let count = 0;
        //获取子选项的长度
        let len = this.oneCheck.length;
        //遍历子选项
        this.oneCheck.forEach(v => {
            //点击状态,数量加1
            // v.checked && count++;
            //在给他们绑定点击事件
            v.onclick = function() {
                /* if (v.checked) {
                    count++;
                    //全选按钮选中
                    count == len && (that.allCheck[0].checked = true);
                    count == len && (that.allCheck[1].checked = true);
                } else {
                    count--;
                    //全选按钮不选中
                    that.allCheck[1].checked = false;
                    that.allCheck[0].checked = false;
                } */
                if (v.checked) { //选项为选中状态
                    var sum = 0;
                    that.oneCheck.forEach(v => { //遍历所有的子选项
                        v.checked && sum++; //选中则加1
                    });
                    if (sum == len) { //长度和数量相等
                        that.allCheck[1].checked = true; //全选按钮选中
                        that.allCheck[0].checked = true;
                    }
                } else {
                    that.allCheck[1].checked = false; //全选按钮不选中
                    that.allCheck[0].checked = false;
                };
                //调用统计函数
                that.totalNum();
            };
        });

    };


    //5.tbody号绑定点击事件
    tbodyFn(eve) {
        // console.log(eve.target);
        //判断是哪个节点的点击
        if (eve.target.className == 'add') {
            // console.log('add');
            this.addFn(eve.target);
        }
        if (eve.target.className == 'delete') {
            // console.log('delete');
            this.deleteFn(eve.target);
        };
        if (eve.target.className == 'reduce') {
            // console.log('delete');
            this.reduceFn(eve.target);
        }
    };


    //6.增加方法
    addFn(eve) {
        //获取到数量的对象,加1
        let valueObj = eve.previousElementSibling;
        let value = valueObj.value - 0 + 1;
        // console.log(value);
        //重新给数量赋值
        valueObj.value = value;

        //取出商品的单价
        let price = eve.parentNode.previousElementSibling.innerHTML;
        //获取小计节点
        let total = eve.parentNode.nextElementSibling;
        total = total.parentNode.children[7];

        //更新小计
        total.innerHTML = price * value;

        //获取子选项节点
        let trObj = eve.parentNode.parentNode.children[0];
        // console.log(trObj);
        //判断如果选中
        trObj.firstElementChild.checked && this.totalNum();

        //获取到商品的id
        let id = trObj.parentNode.getAttribute('goods-id');
        // console.log(id);
        //调用更新localStorage方法
        this.newStorage(id, value);
    };
    //7.删除方法
    deleteFn(eve) {
        // console.log(eve);
        //获取到当前商品的id
        let idObj = eve.parentNode.parentNode;
        let id = idObj.getAttribute('goods-id');
        let num = idObj.getAttribute('num');
        let ram = idObj.getAttribute('ram');

        //获取商品的索引
        let godInd = idObj.getAttribute('goods-ind');
        //获取所有的删除按钮
        let delArr = document.querySelectorAll('.delete');
        delArr.forEach(function(v, k) {
            // console.log(k);
            v.addEventListener('click', function() {
                console.log(k);
                if (k == godInd) {
                    // console.log(id);
                    let that = this;
                    // 弹出框,是否删除
                    layer.confirm('是否删除？', {
                        btn: ['确定', '取消'] //按钮
                    }, function(index) {
                        layer.close(index);
                        //删除当前的tr
                        idObj.remove();
                        //如果删除的商品处于选中状态，更新结算的值
                        if ((idObj.children)[0].firstElementChild.checked) {
                            that.totalNum(document.querySelectorAll('.check-one'));
                        };
                        //更新localStorage
                        that.newStorage(godInd);
                    });
                } else {

                }
            });
        });

        // console.log(id);
        let that = this;
        // 弹出框,是否删除
        layer.confirm('是否删除？', {
            btn: ['确定', '取消'] //按钮
        }, function(index) {
            layer.close(index);
            //删除当前的tr
            idObj.remove();
            //如果删除的商品处于选中状态，更新结算的值
            if ((idObj.children)[0].firstElementChild.checked) {
                that.totalNum(document.querySelectorAll('.check-one'));
            };
            //更新localStorage
            that.newStorage(id, num, ram);
        });
    };


    //9.减少方法
    reduceFn(eve) {
        //获取到数量的对象,减1
        let valueObj = eve.nextElementSibling;
        let value = valueObj.value - 1;
        if (value <= 1) {
            value = 1;
        }
        //重新给数量赋值
        valueObj.value = value;
        //取出商品的单价
        let price = valueObj.parentNode.previousElementSibling.innerHTML;
        //获取小计节点
        let total = valueObj.parentNode.nextElementSibling;
        total = total.parentNode.children[7];
        //更新小计
        total.innerHTML = price * value;

        //获取子选项节点
        let trObj = valueObj.parentNode.parentNode.children[0];
        // console.log(trObj);
        //判断如果选中
        trObj.firstElementChild.checked && this.totalNum();

        //获取到商品的id
        let id = trObj.parentNode.getAttribute('goods-id');
        // console.log(id);
        //调用更新localStorage方法
        this.newStorage(id, value);
    };


    //8.更新localStorage方法
    newStorage(id, num, ram) {
        //获取localStorage数据
        let localS = localStorage.getItem('Cart');
        //判断数据是否为空
        if (!localS) return;

        //转化
        localS = JSON.parse(localS);
        //遍历更新数据
        localS.forEach((v, k) => {
            if (v.id == id || v.ram == ram) {
                if (num) v.num = num;
                else { localS.splice(k, 1) }
            }
        });
        // 更新到local中
        localStorage.setItem('Cart', JSON.stringify(localS))
    };
    //2.获取localStorage数据，追加到页面上
    getLocalStorage() {
        //获取localStorage
        let content = localStorage.getItem('Cart');
        let html = '';
        if (!content) {
            html = `<div class="null_shopping">
            <div class="null_shopping_pic">
                <h2>您的购物车是空的！</h2>
                <a href="./index.html">马上去购物</a>
            </div>
        </div>`;
            //追加
            this.$('tbody').innerHTML = html;
        } else {
            let count = JSON.parse(content).length;
            //如果没有数据
            if (count == 0) {
                html = `<div class="null_shopping">
            <div class="null_shopping_pic">
                <h2>您的购物车是空的！</h2>
                <a href="./index.html">马上去购物</a>
            </div>
        </div>`;
                // this.$('colora').innerHTML = html;
            } else {
                //遍历数据追加到页面上
                JSON.parse(content).forEach(function(v, k) {
                    // console.log(v);
                    html += `<tr goods-id="${v.id}" goods-ind="${k}">
            <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
            <td class="shopps"><img src="${v.src}" alt="" /><span>${v.shopName}</span></td>
            <td class="price">${v.price}</td>
            <td class="count">
                <span class="reduce">-</span>
                <input class="count-input" type="text" value="${v.num}" />
                <span class="add">+</span>
            </td>
            <td class="color">${v.color}</td>
            <td class="ram">${v.ram}</td>
            <td class="menu">${v.menu}</td>
            <td class="subtotal">${v.price * v.num}</td>
            <td class="operation" ><span class="delete">x</span></td>
        </tr>`;
                });
            };
            //追加
            this.$('tbody').innerHTML = html;
        };
    };
    //结算的显示框
    closShow() {
        this.oneCheck.forEach(v => {
            // console.log(v.checked);
            if (!v.checked) {
                $('#closing').popover('show');
            } else {
                $('#closing').popover('hide');
            };
        });
    };
    //1.获取节点的方法
    $(tag) {
        return document.querySelector(tag);
    }
}
new Car;