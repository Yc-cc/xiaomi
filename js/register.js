// 1 收集表单数据
$(':button').click(function() {
    // let data = $('form').serialize();
    // console.log(data);
    let user = $('#user').val();
    let pwd = $('#pwd').val();
    let Users = [];
    // 2 验证为空则提示
    if (!user) {
        layer.msg('用户名不能为空!')
        return;
    };
    if (!pwd) {
        layer.msg('密码不能为空!')
        return;
    };
    // 3 发送请求
    $.post('./server/index.php', {
        fn: 'sel',
        'user': user,
        'pwd': pwd
    }, function(data) {
        data = JSON.parse(data); //转化数据
        // console.log(data);
        data.forEach(val => {
            // console.log(val.user);
            Users.push(val.user); //将用户名存入数组
        });
        // console.log(Users);
        Users.forEach(vals => { //遍历数组
            // console.log(vals);
            if (user == vals) { //存在用户名
                $.post('./server/index.php', { //发送请求
                    fn: 'sel',
                    'user': user
                }, function(res) { //得到对应用户名的密码
                    res = JSON.parse(res);
                    res.forEach(p => {
                        // console.log(p.pwd);
                        //判断密码值
                        if (pwd == p.pwd) {
                            layer.msg('欢迎你回来我的主人！');
                            // location.assign("http://localhost/mi/index.html?id=1");
                            let t = encodeURI(encodeURI(user));
                            setTimeout(function() { UrlFn(t) }, 2000);
                        } else {
                            layer.msg('密码不正确！');
                        }
                    });
                });
            } else if (user != vals) {
                layer.msg('用户名不存在！');
                // console.log('1');
            };


        });

    });
});

function UrlFn(data) {
    let da = data;
    window.location.href = 'http://localhost/mi/index.html?user=' + da;
};