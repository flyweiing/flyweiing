define(['jquery'],
    function ($) {
        return {
            //获取灯杆列表
            getLampItemHtml: function (data) {
                var listHtml = '';

                for (var i in data) {
                    var select = (i == 0) ? "selected" : "";

                    listHtml += '<div class="list-item lamp-item ' + select + '" data-code="' + data[i].nodecode + '" data-longitude="' + data[i].longitude + '" data-latitude="' + data[i].latitude + '">';
                    listHtml += '<div class="name">' + data[i].nodename + '</div>';
                    listHtml += '<div>' + data[i].nodecode + '</div>';
                    listHtml += '<div data-status="1" class="status green">正常</div>';
                    listHtml += '</div>';

                }
                return listHtml;

            },
            getLampHtml: function () {
                var html = '';

                html += '<div class="lamp-operate switch">';
                html += '<label>路灯开关</label>';
                html += '<button id="switch" class="switch-on" data-mode="0" data-value="0"></button>';
                html += '</div>';
                html += '<div class="lamp-operate dimming">';
                html += '<label>智能调光</label>';
                html += '<div class="dimming-slider"><input id="dimming" class="easyui-slider"></div>';
                html += '</div>';
                html += '<div class="lamp-operate strategy">';
                html += '<label>灯杆信息</label>';
                html += '<div class="lamp-details"><span>灯杆名称：</span><span class="name">竖琴灯杆</span></div>';
                html += '<div class="lamp-details"><span>灯杆编号：</span><span class="num">ULZH-SQS-04M-0902</span></div>';
                html += '<div class="lamp-details"><span>路灯状态：</span><span class="status green">正常</span></div>';
                html += '<div class="lamp-details"><span>开关状态：</span><span class="switch-status green">开灯</span></div>';
                html += '</div>';

                return html;
            }, 
            //获取摄像头列表
            getCameraItemHtml: function () {
                var listHtml = '';

                listHtml += '<div class="list-item camera-item selected" data-ip="192.168.3.65" data-username="admin" data-password="admin123">';
                listHtml += '<div class="name">擎天灯杆</div>';
                listHtml += '<div>140804</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item camera-item"  data-ip="192.168.3.64" data-username="admin" data-password="admin123">';
                listHtml += '<div class="name">竖琴灯杆</div>';
                listHtml += '<div>140800</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item camera-item"  data-ip="192.168.3.60" data-username="admin" data-password="admin123">';
                listHtml += '<div class="name">樊花灯杆</div>';
                listHtml += '<div>140803</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item camera-item"  data-ip="192.168.3.67" data-username="admin" data-password="admin123">';
                listHtml += '<div class="name">展厅竖琴</div>';
                listHtml += '<div>134144</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item camera-item"  data-ip="192.168.3.69" data-username="admin" data-password="admin123">';
                listHtml += '<div class="name">展厅永恒</div>';
                listHtml += '<div>148224</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item camera-item"  data-ip="192.168.3.68" data-username="admin" data-password="admin123">';
                listHtml += '<div class="name">展会永恒</div>';
                listHtml += '<div>150784</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';

                return listHtml;
            },
            getCameraHtml: function () {
                var html = "";

                html += '<div id="cameraControl"></div>';
                html += '<div class="video-item ptz-dir">';
                html += '<label>云台控制</label>';
                html += '<div class="directions">';
                html += '<span class="direction left-up" data-ptz="5" title="左上"></span>';
                html += '<span class="direction up" data-ptz="1" title="向上"></span>';
                html += '<span class="direction right-up" data-ptz="7" title="右上"></span>';
                html += '<span class="direction left" data-ptz="3" title="向左"></span>';
                html += '<span class="direction center" data-ptz="9" title="自动"></span>';
                html += '<span class="direction right" data-ptz="4" title="向右"></span>';
                html += '<span class="direction left-down" data-ptz="6" title="左下"></span>';
                html += '<span class="direction down" data-ptz="2" title="向下"></span>';
                html += '<span class="direction right-down" data-ptz="8" title="右下"></span>';
                html += '</div>';
                html += '</div>';
                html += '<div class="video-item speed">';
                html += '<label>云台速度</label>';
                html += '<select id="ptzspeed" class="sel">';
                html += '<option>1</option>';
                html += '<option>2</option>';
                html += '<option selected>3</option>';
                html += '<option>4</option>';
                html += '<option>5</option>';
                html += '<option>6</option>';
                html += '<option>7</option>';
                html += '</select>';
                html += '</div>';
                html += '<div class="video-item operation">';
                html += '<label>镜头控制</label>';
                html += '<div class="lens"><span>调焦</span><i class="zoomin fa fa-plus-square"></i><i class="zoomout fa fa-minus-square"></i></div>';
                html += '<div class="lens"><span>聚焦</span><i class="focusin fa fa-plus-square"></i><i class="focusout fa fa-minus-square"></i></div>';
                html += '<div class="lens"><span>光圈</span><i class="irisin fa fa-plus-square"></i><i class="irisout fa fa-minus-square"></i></div>';
                html += '</div>';
                html += '<div class="video-item player">';
                html += '<span id="video-player" class="play fa fa-pause"></span>';
                html += '</div>';

                return html;
            },
            //获取LED显示屏列表
            getLedItemHtml: function () {
                var listHtml = '';

                listHtml += '<div class="list-item led-item selected" data-code="y10-b15-01036">';
                listHtml += '<div class="name">擎天灯杆</div>';
                listHtml += '<div>140804</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item led-item" data-code="y10-b15-01036">';
                listHtml += '<div class="name">竖琴灯杆</div>';
                listHtml += '<div>140800</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item led-item" data-code="y10-b15-01036">';
                listHtml += '<div class="name">总部一号灯杆</div>';
                listHtml += '<div>140802</div>';
                listHtml += '<div data-status="2" class="status red">故障</div>';
                listHtml += '</div>';

                return listHtml;
            },
            getLedHtml: function () {
                var html = "";
                
                html += '<div class="upload-img left">';
                html += '<input id="input-file" name="image" type="file" accept="image/gif,image/jpeg,image/jpg,image/png">'
                html += '<div class="img-size"><span>宽度(px)&nbsp;&nbsp;|&nbsp;&nbsp;</span><em class="width">128</em></div>';
                html += '<div class="img-size"><span>宽度(px)&nbsp;&nbsp;|&nbsp;&nbsp;</span><em class="height">256</em></div>';
                html += '<button class="img-btn" id="select-img">选择图片</button>';
                html += '<button class="img-btn" id="clear-img">清除图片</button>';
                html += '</div>';
                html += '<div class="preview-img left">';
                html += '<img id="program-img" src="../static/img/program5.jpg" alt="program2">';
                html += '</div>';
                html += '<div class="led-operate left">';
                html += '<button class="img-btn" id="send-program">发送节目</button>';
                html += '<button class="img-btn" id="stop-program">停止播放</button>';
                html += '</div>';
                return html;
            },
            //获取wifi列表
            getWifiItemHtml: function () {
                var listHtml = '';

                listHtml += '<div class="list-item wifi-item selected">';
                listHtml += '<div class="name">竖琴灯杆</div>';
                listHtml += '<div>140800</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item wifi-item">';
                listHtml += '<div class="name">总部一号灯杆</div>';
                listHtml += '<div>140802</div>';
                listHtml += '<div data-status="2" class="status red">故障</div>';
                listHtml += '</div>';

                return listHtml;
            },
            getWifiHtml: function () {
                var html = '<img style="width: 100%;height: 100%;" src="../static/img/bg_wifi.png" alt="">';
                return html;
            },
            //获取紧急求助列表
            getChargerItemHtml: function () {
                var listHtml = '';

                listHtml += '<div class="list-item charger-item selected">';
                listHtml += '<div class="name">擎天灯杆</div>';
                listHtml += '<div>140804</div>';
                listHtml += '<div data-status="1" class="status green">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item charger-item">';
                listHtml += '<div class="name">总部一号灯杆</div>';
                listHtml += '<div>140802</div>';
                listHtml += '<div data-status="2" class="status red">故障</div>';
                listHtml += '</div>';

                return listHtml;
            },
            getChargerHtml: function () {
                var html = '<img style="width: 100%;height: 100%;" src="../static/img/bg_charger.png" alt="">';
                return html;
            },
            //获取语音广播列表
            getAiringItemHtml: function () {
                var listHtml = '';

                listHtml += '<div class="list-item airing-item">';
                listHtml += '<div class="name">银川一号灯杆</div>';
                listHtml += '<div>140801</div>';
                listHtml += '<div data-status="1" class="status greed">正常</div>';
                listHtml += '</div>';
                listHtml += '<div class="list-item airing-item">';
                listHtml += '<div class="name">总部二号灯杆</div>';
                listHtml += '<div>140802</div>';
                listHtml += '<div data-status="2" class="status red">故障</div>';
                listHtml += '</div>';

                return listHtml;
            },
            getAiringHtml: function () {
                var html = '<img style="width: 100%;height: 100%;" src="../static/img/bg_airing.png" alt="">';
                return html;
            }

        };
    });
