//------------------------------------------------------------------------------
/**
 * motal窗
 * 基于easyui的window方法
 *
 */
define(['jquery', 'easyui'], function ($) {

    /**
     * [xwindow 弹窗公共方法]
     * @param  {[string]} id         [弹窗div的id(如果要提示对话框ID传dialog)]
     * @param  {[string]} title      [弹窗的标题]
     * @param  {[int]} width      [弹窗的宽]
     * @param  {[int]} height     [弹窗的高]
     * @param  {[bool]} btn        [是否显示按钮]
     * @param  {[string]} content    [提示对话框（dialog），提示内容]
     * @param  {[function]} confirmFun [确认回调函数]
     * @param  {[type]} cData      [确认回调函数的参数]
     * @return {[type]}            [description]
     */
    function xwindow(id, title, width, height, btn, content, confirmFun, cData) {
        var winId = '#' + id;

        if(id == 'dialog') 
            $('.dialog-content').html('<i class="fa fa-exclamation-triangle"></i>' + content);
        

        $(winId).window({
            width: width || 400,
            height: height || 200,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            closable: false,
            resizable: false,
            title: '<span>'+ title + '</span><a id="' + id + '-close" class="fa fa-times"></a>' ,
            modal: true
        });

        if (btn == true) {
           $(winId).append('<div class="win-footer"><button id="' + id + '-confirm">确定</button><button id="' + id + '-cancel">取消</button></div>');     
        }

        //关闭弹窗
        $(winId + '-close').off('click').on('click', function () {
            $(winId).window('close');
            if (btn == true) {
                $(winId + " .win-footer").remove();
            }
        });

        //取消按钮
        $(winId + '-cancel').off('click').on('click', function () {
            $(winId).window('close');
            if (btn == true) {
                $(winId + " .win-footer").remove();
            }
        });

        //确认按钮
        $(winId + '-confirm').off('click').on('click', function () {
            if ($.isFunction(confirmFun))
                confirmFun(cData);
        });

    }

    
    return xwindow;
});