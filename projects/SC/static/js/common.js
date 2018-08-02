/**
 * 公用函数
 * @date    2017-11-10 14:54:02
 */
define(['jquery', 'easyui'], function ($) {
    $(function () {
        // var userName = xcookie.get("UserName");
        // $('.headpic span').text(userName);
        //退出登陆
        $('.logout').click(function () {
            $.ajax({
                url: '/logout',
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function () {
                        window.location.href = '/login';
                },
                error: function () {
                        window.location.href = '/login';
                }  
            });
        });

        $('.nav li').mouseover(function(event) {
            var $this = $(this),
                num = $this.data('num'),
                imgSrc = "../static/img/icon_hover" + num + ".png",
                img = $this.find('img');

                img.attr('src', imgSrc);

        }).mouseleave(function(event) {
            var $this = $(this),
                num = $this.data('num'),
                imgSrc = "../static/img/icon" + num + ".png",
                img = $this.find('img');

                img.attr('src', imgSrc);
        });

        $('.menu .bar').click(function () {
            var menu = $(this).parent();
            if (0 == menu.offset().left)
                _animate({menu: '-210px', main: '0'});
            else
                _animate({menu: '0', main: '210px'});
            function _animate(offset) {
                menu.animate({'left': offset.menu}, 500);
                $('.main').animate({'left': offset.main}, 500);
            }
        });
    });

    return {
        /**
         * [setTips 提示]
         * @param {[type]} status [提示类型：error：错误提示；success：成功提示；warning：警告提示]
         * @param {[type]} text   [提示内容]
         */
        setTips: function (status, text) {
            var getTipsBox = $('.smarty-tips');
            if ('error' === status) {

                getTipsBox.show().animate({'top': '65px'}).html('<span class="error">' + text + '</span>');

                setTimeout(function () {
                    getTipsBox.hide().css({'top': '22px'});
                }, 3000);

            } else if ('success' === status) {

                getTipsBox.show().animate({'top': '65px'}).html('<span class="success">' + text + '</span>');

                setTimeout(function () {
                    getTipsBox.hide().css({'top': '22px'});
                }, 2000);

            } else {

                getTipsBox.show().animate({'top': '65px'}).html('<span class="warning">' + text + '</span>');

                setTimeout(function () {
                    getTipsBox.hide().css({'top': '22px'});
                }, 3000);
            }
        },
        /**
         * [确认调用关闭弹窗]
         * @param  {[string]} winId [弹窗的Id]
         */
        closeWindow: function (winId) {
            var $winId = $(winId),
                $footer = $winId.find('.win-footer');
            $winId.window('close');
            if ($footer.length != 0) {
                $footer.remove();
            }
        },
        /**
         * 格式化日期
         * 格式：var d = new xdate(2015, 01, 05, 21, 11, 30);
         *      console.log(d.format('yyyy年MM月dd日 hh点mm分ss秒'));
         * 返回：2015年01月05日 21点11分30秒
         * @param {String} fmt
         * @returns {String}
         */
        format: function (date, fmt) {
            var regStr = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds()             //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in regStr)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (regStr[k]) : (("00" + regStr[k]).substr(("" + regStr[k]).length)));
            return fmt;
        },
        /**
         * [日期选择框]
         * @param  {String} id       [日期选择框的ID]
         */
        dateBox: function (id) {
            $(id).datebox({
                height: 28,
                formatter: function (date) {
                    var y = date.getFullYear();
                    var m = date.getMonth()+1;
                    var d = date.getDate();
                    return y + '-' + (m < 10 ? ('0' + m) : m ) + '-' + (d < 10 ? ('0' + d ) : d);
                },
                parser: function (s) {
                    if (!s) return new Date();
                    var ss = (s.split('-'));
                    var y = parseInt(ss[0],10);
                    var m = parseInt(ss[1],10);
                    var d = parseInt(ss[2],10);
                    if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
                        return new Date(y, m-1, d);
                    } else {
                        return new Date();
                    }
                }
            });
        }
    }
});
