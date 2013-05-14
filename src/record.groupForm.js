$(function(){

	P('Record').GroupForm = Record.Class().extend(Record.Event, {
		init: function(options){
			this.CONST = {
				ROOT_CLS: 'js-form-group',
		        ADD_BTN_CLS: 'js-ico-add',
		        DEL_BTN_CLS: 'js-ico-del',
		        LAST_ITEM_CLS: 'js-item-last',
		        FORM_ITEM_CLS: 'js-formlist',
		        ERR_IPT_CLS: 'ipts-err'
			};
			var that = this;
	        var defaults = {
	            newFormDom: '<div class="' + that.CONST.FORM_ITEM_CLS + 
	                '"><label></label><input type="text" class="ipts js-ipts fl" /><a href="javascript:void(0);" class="ico-del ' + that.CONST.DEL_BTN_CLS + '"></a></div>',
	            newFormAdd: null,
	            groupId: null,
	            addBtnCls: that.CONST.ADD_BTN_CLS,
	            delBtnCls: that.CONST.DEL_BTN_CLS,
	            formItemCls: that.CONST.FORM_ITEM_CLS
	        };

	        that.opts = $.extend(true, {}, defaults, options);
	        this.$root = $('#' + this.opts.groupId);
	        that.$root.find('.' + this.CONST.FORM_ITEM_CLS + ':last').addClass(this.CONST.LAST_ITEM_CLS);
	        this.bindEvent();
	    },
	    bindEvent: function(){
	    	var $root = this.$root;
	    	var that = this;
	        //增加按钮事件绑定
	        $root.find('.' + that.opts.addBtnCls).live('click', function(e){
	            var $this = $(this);
	            var colorFadeArr;
	            var $newFormList;
	            var groupId = that.opts.groupId;
	            var data = that.data = that.data || {};
	            var formNum = data['formNum'] = data['formNum'] || $root.find('.' + that.opts.formItemCls).length;
	            var $newFormList = $(that.opts.newFormDom);
	            if(!that.opts.newFormAdd || that.opts.newFormAdd.apply(that, [$root, $newFormList, formNum])){
	            	var $itemLast = that.$root.find('.' + that.CONST.LAST_ITEM_CLS);
	            	$itemLast.removeClass(that.CONST.LAST_ITEM_CLS);
	            	$newFormList.insertAfter($itemLast).addClass(that.CONST.LAST_ITEM_CLS);
	            	data['formNum'] = ++formNum;
	            }
	        });

	        //删除按钮事件绑定
	        $root.find('.' + that.opts.delBtnCls).live('click', function(e){
	            var $this = $(this);
	            var $root = that.$root;
	            var $curItem = $this.parents('.' + that.opts.formItemCls);
	            var $items = $root.find('.' + that.opts.formItemCls);

	            if($curItem.hasClass(that.CONST.LAST_ITEM_CLS)){
	                var index = $items.index($curItem);
	                $curItem.removeClass(that.CONST.LAST_ITEM_CLS);
	                $($items.get(index - 1)).addClass(that.CONST.LAST_ITEM_CLS);
	            }
	            $curItem.remove();
	        });

	    },
	    getValue: function(){
	    	var that = this;
	        var groupValue = [];
	        var $obj = this.$root.find('.' + that.opts.formItemCls);
	        $obj.each(function(i, o){
	            var value = $(o).find('input').val();
				groupValue.push(value);	            
	        });

	        return groupValue;
	    }
	});
});