$(function(){
	P('Record').DropMenu = Record.Class().extend(Record.Event, {
		init: function(options){
			this.superInit();
			this.CONST = {
				
			};
			var that = this;
	        var defaults = {
	            trigger: null,
	            model: null,
	            container: null,
	            classPrefix: 'ui-dropmenu',
	            name: null,
	            //value: null,
	            //length: 0,
	            selectedIndex: 0,
	            disabled: false
	        };
	        this._opts = $.extend(true, {}, defaults, options);
	        var classPrefix = this._opts.classPrefix;
	        this.CONST.TRIGGER_CLS = classPrefix + '-trigger';
	        this.CONST.SELECTED_CLS = classPrefix + '-item-selected';
	        this.CONST.ITEM_CLS = classPrefix + '-item';
	        this.CONST.CONTENT_CLS = classPrefix + '-content';

	        this._trigger = $(this._opts.trigger);
	        this._container = (this._opts.container ? $(this._opts.container) : $('<div><div>')).appendTo('body');
	        this._widgetId = wUtil.getId('widget');
	        this._positioned = false;
	        this._model = this._opts.model || [];
	        this.name = this._opts.name;
	        //this.value = this._opts.name;
	        this.length = this._model.length;
	        this._curIndex = 0;

	        this._container.addClass(this._opts.classPrefix).attr('widget-id', this._widgetId).hide();
	       	this._trigger.addClass(this.CONST.TRIGGER_CLS);
	    },
	    /**
	     * 生成组件所需的dom节点
	     * @return null
	     */
	    _initDom: function(){
	    	var seltIndex = this._updateList();
	    	this.select(seltIndex);
	    },
	    /**
	     * 更新下拉框dom
	     * @return null
	     */
	    _updateList: function(){
	    	var that = this;
	    	var content = ['<ul class="', this.CONST.CONTENT_CLS, '" data-role="content">'];
	    	var seltIndex = 0;
	    	$.each(this._model, function(i, o){
	    		content.push('<li class="', that.CONST.ITEM_CLS, '', (o.selected ? ' ' + that.CONST.SELECTED_CLS : ""), '" data-role="item" data-value="', o.value, 
	    			'" data-selected="', (o.selected ? true : false), '">', o.text, '</li>');
	    		if(o.selected)
	    			seltIndex = i;
	    	})
	    	content.push('</ul>');
	    	this._container.html(content.join(''));
	    	return seltIndex;
	    	//this.select(seltIndex);
	    },
	    /**
	     * 绑定组件所需的事件
	     * @return null
	     */
	    _bindEvent: function(){
	    	var that = this;
	    	this._trigger.bind('click', function(e){
	    		e.stopPropagation();
	    		if(that._container.is(':visible')){
	    			that._container.hide();
	    		}else{
		    		if(!that._opts.container && !that._positioned){
		    			tOffset = that._trigger.offset();
		    			that._container.css({
		    				top: tOffset.top + that._trigger.outerHeight(),
		    				left: tOffset.left,
		    				position: 'absolute',
		    				'z-index': '99'
		    			});
		    		}
		    		that._container.show();
	    		}
	    	})

	    	this._bindListEvent();
	    },
	    /**
	     * 绑定下拉菜单相关的事件
	     * 在更新下拉列表时特别有用
	     * @return null
	     */
	    _bindListEvent: function(){
	    	var that = this;
	    	this._container.find('[data-role=item]').bind('click', function(e){
	    		e.stopPropagation();
	    		that.select($(this));
	    	})
	    },
	    /**
	     * 选中某一项
	     * 请务必在更新完model和下拉框dom后再调用
	     * @param  {Number|String|DOM} item 
	     *         						支持三种：
		 * 								列表索引，为 Number
		 * 								选择器，为 String
		 * 								DOM，支持 DOM Element 和 jQuery 对象
	     * @return null
	     */
	    select: function(item){
	    	var $seltItem
    		var $items = this._container.find('[data-role=item]');
	    	if(typeof item == 'number'){
	    		$seltItem = $($items.get(item));
	    	}else{
	    		$seltItem = $(item);
	    	}

	    	if($seltItem.length > 0){
	    		var seltIndex = $items.index($seltItem);
	    		var preSelected = wUtil.getObjFromArr(this._model, 'selected', true);

	    		preSelected.selected = false;
	    		this._model[seltIndex].selected = true;
	    		this._curIndex = seltIndex;
	    		this.value = $seltItem.attr('data-value');
	    		this._trigger.text($seltItem.text());
	    		this._container.find('.' + this.CONST.SELECTED_CLS).removeClass(this.CONST.SELECTED_CLS);
	    		$seltItem.addClass(this.CONST.SELECTED_CLS);
		    	this.trigger('change', this.value, $seltItem.text());
	    	}

	    	this._container.hide();
	    },
	    /**
	     * 更新组件数据，并重新生成列表
	     * @param  {Object} model 格式：
	     *                        	[
		 *							    {value:'value1', text: 'text1', selected: true},
		 *							    {value:'value2', text: 'text2'}
		 *							]
	     * @return null
	     */
	    updateModel: function(model){
	    	if(!!model){
	    		this._model = model
	    	}
	    	
	    	this.length = this._model.length;
	    	this._updateList();
	    	this._bindListEvent();
	    },
	    /**
	     * 将一个选项添加到最后
	     * @param {Object} option 选项数据：{value: 'value1', text: 'text1'}
	     */
	    addOption: function(option){
	    	this._model.push(option);
	    	this.updateModel();
	    },
	    getOption: function(){
	    	//TODO
	    },
	    /**
	     * 删除某个选项
	     * @param  {Number} option 选项的索引值，从0开始
	     * @return null
	     */
	    removeOption: function(option){
	    	if(this.length <= 1)
	    		return false;

	    	if(typeof option == 'number'){
	    		var index = Math.min(option, this.length - 1);
	    		var optionRemoved = this._model.splice(index, 1)[0];
	    		var curSeltIndex;
	    		if(optionRemoved.selected){
	    			if(index == this.length - 1){
	    				curSeltIndex = 0;
	    			}else{
	    				curSeltIndex = index;
	    			}
	    			this._model[curSeltIndex].selected = true;
	    		}
	    		this.updateModel();
	    		if(optionRemoved.selected){
		    		this.select(curSeltIndex);
	    		}
	    	}
	    },
	    /**
	     * 组件渲染函数，与init分开的目的是不需要在组件初始化时就生成节点或绑定事件，再有需要的时候再进行渲染
	     * @return {Object} 组件实例对象，参考jQuery的链式调用
	     */
	    render: function(){
	    	this._initDom();
	    	this._bindEvent();

	    	return this;
	    }
	});

	$(document).bind('click', function(){
		$('.ui-dropmenu').hide();
	});
});