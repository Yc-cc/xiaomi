//正则判断
let userObj = document.querySelector('#username');
let pwdObj = document.querySelector('#login_password');
let repwdObj = document.querySelector('#confirm_password');
let dataUObj = document.querySelector('#data-user');
let dataPObj = document.querySelector('#data-pwd');
let dataRObj = document.querySelector('#data-repwd');
// console.log(dataUObj.getAttribute('data-content'));
// console.log(userObj.getAttribute('type'));
userObj.addEventListener('blur', function() {
    let userVal = userObj.value;
    if (!userVal) {
        $('#data-user').popover('hide');
    } else {
        let res1 = /^[\u4e00-\u9fa5\a-zA-Z]{2,5}$/;
        if (res1.test(userVal)) {
            // console.log($('#data-user').getAttribute('data-content'));
            dataUObj.setAttribute('data-content', '用户名合法')
            $('#data-user').popover('show');
        } else {
            $('#data-user').popover('show');
        }
    }

});
pwdObj.addEventListener('blur', function() {
    let pwdVal = pwdObj.value;
    if (!pwdVal) {
        $('#data-pwd').popover('hide');
    } else {
        if (pwdVal.length >= 6 && pwdVal.length <= 10) {
            let res2 = /^[0-9a-zA-Z]{6,10}$/;
            if (res2.test(pwdVal)) {
                dataPObj.setAttribute('data-content', '密码合法')
                $('#data-pwd').popover('show');
            } else {
                dataPObj.setAttribute('data-content', '密码只能是数字和字母')
                $('#data-pwd').popover('show');
            }
        } else {
            dataPObj.setAttribute('data-content', '密码长度不符合')
            $('#data-pwd').popover('show');
        }
    }

});
repwdObj.addEventListener('blur', function() {
    let repwdVal = repwdObj.value;
    if (!repwdVal) {
        $('#data-repwd').popover('hide');
    } else {
        let pwdVal = pwdObj.value;
        if (repwdVal == pwdVal) {
            dataRObj.setAttribute('data-content', '第二次密码合法')
            $('#data-repwd').popover('show');
        } else {
            dataRObj.setAttribute('data-content', '两次密码不一样')
            $('#data-repwd').popover('show');
        }
    }

});

//数据验证
let inpV = document.querySelector('#agreeInp').checked;
// 1 收集表单数据
$(':button').click(function() {
    let user = document.querySelector('#username').value;
    let pwd = document.querySelector('#login_password').value;
    let repwd = document.querySelector('#confirm_password').value;
    inpV = document.querySelector('#agreeInp').checked;
    let Users = [];
    // console.log(inpV);
    // console.log(user);
    // 2 验证为空则提示
    if (!user) {
        layer.msg('用户名不能为空!')
        return;
    };
    if (!pwd) {
        layer.msg('密码不能为空!')
        return;
    };
    if (!repwd) {
        layer.msg('重复密码不能为空!')
        return;
    };
    //判断用户名是否存在
    $.post('./server/index.php', {
        fn: 'sel',
        'user': user,
    }, function(data) {
        data = JSON.parse(data); //转化数据
        // console.log(data.length);
        // console.log(vals);
        if (data.length != 0) { //存在用户名
            layer.msg('用户名已经存在，请重新命名！')
            return;
        } else {
            //创建用户
            if (repwd == pwd) {
                if (inpV == true) {
                    //创建用户信息
                    $.post('./server/index.php', {
                        fn: 'add',
                        user,
                        pwd
                    }).then(data => {
                        if (data == 1) {
                            location.reload()
                        }
                    });
                } else {
                    layer.msg('请勾选用户协议！');
                }
            } else {
                layer.msg('重复密码和密码不相等');
            };
        };
    });




});

$(function() {

});