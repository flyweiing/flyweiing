/**
 * 策略管理
 * @date    2017-11-10 14:54:02
 */

require(['jquery', 'common', 'easyui', 'basejs/xajax', 'basejs/xwindow'], function ($, common, ui, xajax, xwindow) {
	$(function () {
	    $('.nav .strategy').addClass('active');

	    getStrategyList();

	    //添加策略弹窗
	    $('#add-strategy').click(function () {
	    	$('input[name="strategyname"]').val('');
	    	xwindow('win-add', '添加策略', 320, 320, true, '', addStrategyFun);
			common.dateBox('#begin-day');
			common.dateBox('#end-day');
	    });
		function addStrategyFun() {
			if (!checkAddForm())
                return false;

			var data = {
					'strategyname': $.trim($('input[name="strategyname"]').val()),
					'startdate': $('#begin-day').val(),
					'enddate': $('#end-day').val()
				};

			xajax('/strategy/addStrategy', data, addSuccess, addError, 'GET');
			function addSuccess(data) {
				if (!data || data.code == 500) {
		    		common.setTips('error', '添加失败！');
		    		return;
		    	}

				common.setTips('success', '添加成功！');
				getStrategyList();

				common.closeWindow('#win-add');
			}
			function addError(data) {
				console.log(data);
				common.setTips('error', '添加失败！');
				common.closeWindow('#win-add');
			}
		} 


		//获取策略列表
		function getStrategyList() {
		    xajax('/strategy/getStrategyItems', '', getStrSuccess, getStrError, 'GET');
		    function getStrSuccess(data) {
		    	var itemHtml = '',
		    		strategyList = $('.strategy-list');

		    	if (!data || data.code == 500) {
		    		itemHtml += '<div class="list-null">暂无数据！</div>';
		    		strategyList.html(itemHtml);
		    		return;
		    	}
	            for (var i in data) {
	                itemHtml += '<tr data-id="' + data[i].id + '"><td class="name">' + data[i].strategyname + '</td>';
	                itemHtml += '<td class="effective-date">' + data[i].startdate + '</td>';
	                itemHtml += '<td class="expiration-date">' + data[i].enddate + '</td>';
	                itemHtml += '<td class="operation"><a class="modify">修改</a> <a class="delete">删除</a> <a class="details">详情</a></td></tr>';
	            }
	            strategyList.html(itemHtml);
	            bindStrategyModify();
	            bindStrateyDel();
	            bindStrategyDetails();
		    }
		    function getStrError(data) {
		    	console.log(data);

		    }
		}



	    //修改策略弹窗
	    function bindStrategyModify() {
		    $('a.modify').off('click').bind('click', function () {
		    	var $this = $(this),
		    		parent = $this.parents('tr'),
		    		name = parent.find('.name').text(),
		    		begin = parent.find('.effective-date').text(),
		    		end = parent.find('.expiration-date').text();

		    	$('#win-add').data('strategyId', parent.data('id'));
		    	$('input[name="strategyname"]').val(name);
		    	xwindow('win-add', '修改策略', 320, 320, true, '', modifyStrategyFun);
                common.dateBox('#begin-day');
                common.dateBox('#end-day');
                $('#begin-day').datebox('setValue', begin);
                $('#end-day').datebox('setValue', end);
		    });
	    }
	    function modifyStrategyFun() {
			if (!checkAddForm())
                return false;

			var data = {
					'id': $('#win-add').data('strategyId'),
					'strategyname': $.trim($('input[name="strategyname"]').val()),
					'startdate': $('#begin-day').val(),
					'enddate': $('#end-day').val()
				};

			xajax('/strategy/updateStrategy', data, updateSuccess, updateError, 'GET');
			function updateSuccess(data) {
				if (!data || data.code == 500) {
		    		common.setTips('error', '修改失败！');
		    		return;
		    	}

				common.setTips('success', '修改成功！');
				getStrategyList();

				common.closeWindow('#win-add');
			}
			function updateError(data) {
				console.log(data);
				common.setTips('error', '修改失败！');
				common.closeWindow('#win-add');
			}
		}


	    //删除策略弹窗
	    function bindStrateyDel() {
		    $('a.delete').off('click').bind('click', function () {
		    	var $this = $(this),
		    		parent = $this.parents('tr');

		    	xwindow('dialog', '删除提示', 260, 150, true, '是否确认删除该策略！', deleteStrategy);
		    	function deleteStrategy() {
		    		xajax('/strategy/deleteStrategy', {'id': parent.data('id')}, deleteSuccess, deleteError, 'GET')
		    		function deleteSuccess(data) {
				    	if (!data || data.code == 500) {
				    		common.setTips('error', '删除失败！');
				    		return;
				    	} 

		    			common.setTips('success', '删除成功！');
		    			parent.remove();
		    			var dList = $('.details-list');
		    			if (dList.length == 0)
		    				dList.html('<div class="list-null">暂无数据！</div>');

		    		}
		    		function deleteError(data) {
		    			common.setTips('error', '删除失败！');
		    		}

		    		common.closeWindow('#dialog');
		    	}
		    });
	    }


	   	//详情弹窗
	   	function bindStrategyDetails() {
		    $('a.details').off('click').bind('click', function () {
		    	var details = $('.details-list'),
		    		dParent = $(this).parents('tr'),
		    		name = dParent.find('.name').text();

				$('#win-details').data('strategyName', name);

		    	details.html('');
		    	bindDetailAdd();
		    	xwindow('win-details', '策略详情' , 800, 520);

		    	//获取详细列表
			    xajax('/strategy/getActionsItems', {'strategyname': name}, getActSuccess, getActError, 'GET');
			    function getActSuccess(data) {
			    	var itemHtml = '';

			    	if (!data || data.code == 500) {
			    		itemHtml += '<div class="list-null">暂无数据！</div>';
			    		details.html(itemHtml);
			    		return;
			    	} 
		            for (var i in data) {
		                itemHtml += '<tr data-id="' + data[i].id + '"><td class="detail-time">' + data[i].time + '</td>';
		                itemHtml += '<td class="detail-brightness">' + data[i].action + '</td>';
		                itemHtml += '<td class="detail-operation"><a class="fa fa-pencil-square-o detail-modify" title="修改"></a><a class="fa fa-trash detail-delete" title="删除"></a>';
		                itemHtml += '<a class="fa fa-floppy-o detail-save" title="保存"></a><a class="fa fa-times detail-cancel" title="取消"></a></td></tr>';
		            }

		            details.html(itemHtml);

		            bindDetailDel();
		            bindDetailModify();
			    }
			    function getActError(data) {
			    	console.log(data);

			    }
		    });	   		
	   	}
	   	//详情添加
	   	function bindDetailAdd() {
	   		$('#add-detail').off('click').bind('click', function () {
	   			var listNull = $('.window .list-null');
	   			if (listNull.length != 0)
	   				listNull.remove();
	   			if ($('#defaultSlider').length != 0) {
	   				common.setTips('error', '存在未保存详情！');
	   				return;
	   			}

	   			var newItem = '<tr class="modify-item new"><td class="detail-time"><input id="detail-time" type="text"></td>';
	   				newItem += '<td class="detail-brightness"><div class="input-slider"><input id="defaultSlider" type="range"/><span class="slider-value">50%</span></div></td>';
	   				newItem += '<td class="detail-operation"><a class="fa fa-pencil-square-o detail-modify" title="修改"></a><a class="fa fa-trash detail-delete" title="删除"></a>';
	   				newItem += '<a class="fa fa-floppy-o detail-save" title="保存"></a><a class="fa fa-times detail-cancel" title="取消"></a></td></tr>';

	   			$('.details-list').append(newItem);

				timeSlider('6:00', '50');
				bindDetailDel();
				bindDetailCancel();
				bindDetailSave();
				bindDetailModify();
	   		});
	   	}
	   	//详情修改
	   	function bindDetailModify() {
	   		$('.detail-modify').off('click').bind('click', function () {
	   			if($('#defaultSlider').length != 0) {
	   				common.setTips('error', '存在未保存详情！');
	   				return;
	   			}

	   			var $this = $(this),
	   				parent = $this.parents('tr'),
	   				$time = parent.find('.detail-time'),
	   				$brightness =  parent.find('.detail-brightness'),
	   				time = $time.text(),
	   				value = $brightness.text();

	   			parent.addClass('modify-item');
	   			$time.html('<input id="detail-time" type="text">');
	   			$brightness.html('<div class="input-slider"><input id="defaultSlider" type="range"/><span class="slider-value">' + value + '%</span></div>');

				timeSlider(time, value);
				bindDetailCancel(time, value);
                bindDetailSave();
	   		});
	   	}
	   	//详情删除
	   	function bindDetailDel() {
		    $('a.detail-delete').off('click').bind('click', function () {
		    	var $this = $(this),
		    		parent = $this.parents('tr');


		    	xwindow('dialog', '删除提示', 260, 150, true, '是否确认删除该详情！', deleteAction);
		    	function deleteAction() {
		    		xajax('/strategy/deleteAction', {'id': parent.data('id')}, deleteSuccess, deleteError, 'GET');
		    		function deleteSuccess(data) {
				    	if (!data || data.code == 500) {
				    		common.setTips('error', '删除失败！');
				    		return;
				    	} 

		    			common.setTips('success', '删除成功！');
		    			parent.remove();
		    			var dList = $('.details-list');
		    			if (dList.find('tr').length == 0)
		    				dList.html('<div class="list-null">暂无数据！</div>');
		    		}
		    		function deleteError(data) {
		    			common.setTips('error', '删除失败！');
		    		}

		    		common.closeWindow('#dialog');
		    	}
		    });
	   	}
	   	//详情保存
	   	function bindDetailSave() {
		    $('a.detail-save').off('click').bind('click', function () {
		    	var $this = $(this),
		    		parent = $this.parents('tr'),
		    		time = $('#detail-time').val(),
		    		brightness = $('#defaultSlider').val(),
		    		$time = parent.find('.detail-time'),
		    		$action = parent.find('.detail-brightness');

		    	var data = {
		    		time: time,
		    		action: brightness,
		    		strategyname: $('#win-details').data('strategyName')
		    	};

		    	if (parent.hasClass('new'))
		    		xajax('/strategy/addAction', data, addSuccess, addError, 'GET');
		    	else {
		    		data.id = parent.data('id');
                    xajax('/strategy/updateAction', data, updateSuccess, updateError, 'GET');
				}

		    	function addSuccess(data) {
	    			if (!data || data.code == 500) {
			    		common.setTips('error', '添加失败！');
			    		return;
			    	} 

			    	parent.attr('data-id', data);
		    		$time.html(time);
		    		$action.html(brightness);
		    		parent.removeClass('modify-item').removeClass('new');
		    		common.setTips('success', '添加成功！');
		    	}
		    	function addError(data) {
		    		console.log(data);
		    		common.setTips('添加失败！');
		    	}
		    	function updateSuccess(data) {
                    if (!data || data.code == 500) {
                        common.setTips('error', '修改失败！');
                        return;
                    }

                    $time.html(time);
                    $action.html(brightness);
                    parent.removeClass('modify-item');
                    common.setTips('success', '修改成功！');
		    	}
		    	function updateError(data) {
		    		console.log(data);
                    common.setTips('error', '修改失败！');
		    	}

		    });		
	   	}
	   	/**
	   	 * 取消操作
	   	 * @param  {[type]} oldTime  [取消前的时间]
	   	 * @param  {[type]} oldValue [取消前的亮度]
	   	 */
	   	function bindDetailCancel(oldTime, oldValue) {
	   		$('.detail-cancel').off('click').bind('click', function () {
	   			var $this = $(this),
	   				parent = $this.parents('tr');
	   			if (parent.hasClass('new')) {
	   				parent.remove();
	   				var detailList = $('.details-list'),
	   					detailItem = detailList.find('tr');
	   				if (detailItem.length == 0)
	   					detailList.html('<div class="list-null">暂无数据！</div>');
	   			} else {
	   				parent.removeClass('modify-item');
	   				parent.find('.detail-time').html(oldTime);
	   				parent.find('.detail-brightness').html(oldValue);
	   			}

	   		});
	   	}
	   	/**
	   	 * [timeSlider description]
	   	 * @param  {[type]} time  [调光时间]
	   	 * @param  {[type]} value [调光值]
	   	 */
	   	function timeSlider(time, value) {
   			$('#detail-time').timespinner({
   				width: 70,
		    	height: 20,
		    	value: time
		    });
		    $("#defaultSlider").slider({
				mode: 'h',
				value: value,
				width: 150,
				min: 0,
				max: 100,
				onChange: function(value) {
					$('.slider-value').text(value + '%');
				}
			});
	   	}
	   	/**
	   	 * [验证添加和修改的表单]
	   	 * @return {[bool]} 
	   	 */
	   	function checkAddForm() {
	   		var $name = $('input[name="strategyname"]'),
	   			$begin = $('#begin-day'),
	   			$end = $('#end-day');
	   		if (1 > $.trim($name.val()).length) {
                common.setTips('error', '策略名不能为空！');
                $name.focus();
                return false;
            }
	   		if (1 > $begin.val().length) {
                common.setTips('error', '生效日期不能为空！');
                return false;
            }
	   		if (1 > $end.val().length) {
                common.setTips('error', '失效日期不能为空！');
                return false;
            }
            return true;
	   	}
	   	
	});
});
