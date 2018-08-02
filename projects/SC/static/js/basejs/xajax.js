//------------------------------------------------------------------------------
/**
 * Ajax请求主入口
 * 基于jQuery的Ajax方法
 *
 * function xajax(url, data, success, error, timeout, sync);
 * @requires jquery
 * @param {jQuery} $
 * @returns {Function}
 */
//------------------------------------------------------------------------------
define(['jquery'], function ($) {
    //------------------------------------------------------------------------------
    /**
     * 发起Ajax请求, 返回jqXHR对象
     * 请求和应答的数据类型都为Json
     * @param {String}      url         请求URL地址
     * @param {Object}      data        请求数据Json对象
     * @param {Function}    success     请求成功的回调方法
     * @param {Function}    error       请求失败的回调方法
     * @param {Boolean}     sync        请求是否同步执行, 默认为false
     * @returns {jqXHR}
     */
    return function (url, data, success, error, type, sync) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'json',
            type: type || 'POST',
            contentType : "application/json",
            async: sync ? false : true,
            cache: false,
            success: function (data, textStatus, xhr) {
                xhr = null;
                var result = data || null;
                if ($.isFunction(success))
                    success(result);
            },
            error: function (xhr, textStatus, errorThrown) {
                if ($.isFunction(error))
                    error(xhr.status, '', textStatus, errorThrown);
            }
        }).fail(function (xhr) {
            console.log(xhr.responseText);
        });
    };
    //------------------------------------------------------------------------------
});


