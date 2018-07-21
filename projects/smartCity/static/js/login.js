/**
 *登录功能
 */
require(['jquery', 'basejs/xajax', 'basejs/md5.min'], function($, xajax) {
    $(function () {
        var myDate = new Date();
        var fullYear = myDate.getFullYear();
        $('.footer').html('© 2004-' + fullYear + ' 深圳市洲明科技有限公司版权所有 V1.0.0');
        capitalTip('password');

        var accountInput = $('input[name=account]'),
            passwordInput = $('input[name=password]'),
            account = '',
            password = '';

        //填充上一次登录的用户
        if (localStorage.getItem('username')) {
            accountInput.val(localStorage.getItem('username'));
            passwordInput.focus();
        }

        //登录操作
        $('.form-box .submit').click(function () {
            account = $.trim(accountInput.val());
            password = hex_md5(hex_md5(passwordInput.val()).toUpperCase()).toUpperCase();
            if (!checkForm())
                return false;
            setTips('loading', '正通过安全隧道为您登录');
            //登录请求(加上时间戳是为了解决IE下退出然后再登录时的bug：ajax请求304)
            xajax('/v1/user/login', {username: account, password: password}, loginSuccess, loginError, 'GET');
        });

        //绑定回车键登录
        $(document).unbind('keyup').bind('keyup', function (even) {
            var currKey = even.keyCode;
            if (13 == currKey)
                $('.form-box .submit').click();
        });


        //登录成功处理
        function loginSuccess(data) {
            setTimeout(function () {
                var userName = accountInput.val();

                if (data == "login success") {
                    localStorage.setItem('username', userName); //记住登录用户

                    setTips('success', '登录成功！');
                    setTimeout(function () {
                        window.location.href = '/lamppost';
                    }, 500);
                }
                else 
                    setTips('error', '用户名或者密码错误！')
            }, 1500);
        }

        //登录失败处理
        function loginError(code) {
            setTips('error', '账户或者密码错误！');
        }


        // 验证表单
        function checkForm() {
            if (1 > account.length) {
                setTips('error', '用户名不能为空！');
                accountInput.focus();
                return false;
            }
            if (1 > password.length) {
                setTips('error', '密码不能为空！');
                passwordInput.focus();
                return false;
            }
            return true;
        }

        function setTips(status, text) {
            var getTipsBox = $('.tips-box');
            if ('loading' === status)
                getTipsBox.html('<span class="loading"><em class="fa fa-spinner fa-spin fa-3x fa-fw"></em>' + text + '</span>');
            else if ('error' === status)
                getTipsBox.html('<span class="error">' + text + '</span>');
            else
                getTipsBox.html('<span class="success">' + text + '</span>');
        }

        //密码大写输入提示
        function capitalTip(id){
            $('#' + id).after('<div class="capslock" id="capital_password">大写锁定已开启</div>');
            var capital = false; //聚焦初始化，防止刚聚焦时点击Caps按键提示信息显隐错误
            
            // 获取大写提示的标签，并提供大写提示显示隐藏的调用接口
            var capitalTip = {
                $elem: $('#capital_'+id),
                toggle: function (s) {
                    if(s === 'none'){
                        this.$elem.fadeOut();
                    }else if(s === 'block'){
                        this.$elem.fadeIn();
                    }else if(this.$elem.is(':hidden')){
                        this.$elem.fadeIn();
                    }else{
                        this.$elem.fadeOut();
                    }
                }
            }
            $('#' + id).on('keydown.caps',function(e){
                if (e.keyCode === 20 && capital) { // 点击Caps大写提示显隐切换
                    capitalTip.toggle();
                }
            }).on('focus.caps',function(){capital = false}).on('keypress.caps',function(e){capsLock(e)}).on('blur.caps',function(e){
                
                //输入框失去焦点，提示隐藏
                capitalTip.toggle('none');
            });
            function capsLock(e){
                var keyCode = e.keyCode || e.which;// 按键的keyCode
                var isShift = e.shiftKey || keyCode === 16 || false;// shift键是否按住
                if(keyCode === 9){
                    capitalTip.toggle('none');
                }else{
                  //指定位置的字符的 Unicode 编码 , 通过与shift键对于的keycode，就可以判断capslock是否开启了
                  // 90 Caps Lock 打开，且没有按住shift键
                  if (((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)) {
                      // 122 Caps Lock打开，且按住shift键
                      capitalTip.toggle('block'); // 大写开启时弹出提示框
                      capital = true;
                  } else {
                      capitalTip.toggle('none');
                      capital = true;
                  }
                }
            }
        };
    });

});

