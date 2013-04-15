var isInputEventSupport = typeof window.screenX + '' != 'undefined'

$(function(){
	P('Record').AutoComplete = Record.Class().extend(Record.Event, {
		KEY_MAP: {
			UP: 38,
	        DOWN: 40,
	        LEFT: 37,
	        RIGHT: 39,
	        ENTER: 13,
	        ESC: 27,
	        BACKSPACE: 8
		},
		init: function(options){
			this.superInit();
			this.CONST = {};
			var that = this;
	        var defaults = {
	            trigger: null,
	            model: null,
	            container: null,
	            classPrefix: 'ui-complete',
	            disabled: false,
	            locator: null,
	            delay: 300,
	            selectFirst: false
	        };
	        this._opts = $.extend(true, {}, defaults, options);
	        var classPrefix = this._opts.classPrefix;
	        this.CONST.TRIGGER_CLS = classPrefix + '-trigger';
	        this.CONST.SELECTED_CLS = classPrefix + '-item-selected';
	        this.CONST.ITEM_CLS = classPrefix + '-item';
	        this.CONST.CONTENT_CLS = classPrefix + '-content';

	        this._trigger = $(this._opts.trigger);
	        this._container = (this._opts.container ? $(this._opts.container) : $('<div></div>')).appendTo('body');
	        this._widgetId = wUtil.getId('widget');
	        this._positioned = false;
	        this._model = new Record.DataSource({
	        	source: this._opts.model || []
	        });
	        this._curIndex = -1;
	        this._listSize = 0;

	        this._container.addClass(this._opts.classPrefix).attr('widget-id', this._widgetId).hide();
	       	this._trigger.addClass(this.CONST.TRIGGER_CLS);
	    },
	    /**
	     * 生成组件所需的dom节点
	     * @return null
	     */
	    _initDom: function(){
	    	if(!this._opts.container){
		    	var tOffset = this._trigger.offset();
		    	this._container.css({
					top: tOffset.top + this._trigger.outerHeight(),
					left: tOffset.left,
					position: 'absolute',
					'z-index': '99'
				});
	    	}
	    	//this._updateList();
	    },
	    /**
	     * 更新下拉框dom
	     * @return null
	     */
	    _updateList: function(data){
	    	var that = this;
	    	var content = ['<ul class="', this.CONST.CONTENT_CLS, '" data-role="content">'];
	    	$.each(data, function(i, o){
	    		content.push('<li class="', that.CONST.ITEM_CLS, '', '" data-role="item" data-value="', o, 
	    			'">', o, '</li>');
	    	})
	    	content.push('</ul>');
	    	this._container.html(content.join(''));
	    	this._bindListEvent();
	    	this._curIndex = -1;
	    	this._listSize = data.length;
	    	this._listItems = this._container.find('.' + this.CONST.ITEM_CLS);
	    },
	    /**
	     * 绑定组件所需的事件
	     * @return null
	     */
	    _bindEvent: function(){
	    	var that = this;
	    	var eventType = isInputEventSupport ? 'input' : 'propertychange'
	    	this._trigger.on(eventType + '.complete', $.proxy(this._onValueChange, this));
	    	this._trigger.on('keydown.complete', $.proxy(this._onKeydown, this));

	        this._model.bind('data', function(data){
	        	that._updateList(data);
	        	that._container.show();
	        });
	    },
	    /**
	     * trigger值改变时的处理函数
	     * @param  {Object} e jQuery event object
	     * @return null
	     */
	    _onValueChange: function(e){
	    	var $input = $(e.currentTarget);
	    	var value = $input.val();

	    	this._model.getData(value);
	    },
	    /**
	     * keydown事件处理函数
	     * @param  {Object} e jQuery event object
	     * @return null
	     */
	    _onKeydown: function(e){
	    	var key = e.which;

	    	switch(key){
	    		case this.KEY_MAP.DOWN:
	    			this._keyDown();
	    			break;
	    		case this.KEY_MAP.UP:
	    			this._keyUp();
	    			break;
	    		case this.KEY_MAP.LEFT: 
	    			this._keyLeft();
	    			break;
	    		case this.KEY_MAP.RIGHT:
	    			this._keyRight();
	    			break;
	    		case this.KEY_MAP.ENTER:
	    			this._keyEnter();
	    			break;
	    		case this.KEY_MAP.ESC:
	    			this._keyEsc();
	    			break;
	    		case this.KEY_MAP.BACKSPACE:
	    			this._keyBackspace();
	    			break;
	    		default:
	    			break;
	    	}
	    },
	    /**
	     * the handler when press arrow Down
	     * @return null
	     */
	    _keyDown: function(){
	    	this._curIndex = this._curIndex < this._listSize - 1 ? this._curIndex + 1 : 0;
	    	this._listItems.removeClass(this.CONST.SELECTED_CLS).eq(this._curIndex).addClass(this.CONST.SELECTED_CLS);
	    },
	    /**
	     * the handler when press arrow Up
	     * @return null
	     */
	    _keyUp: function(){
	    	this._curIndex = this._curIndex > 0 ? this._curIndex - 1 : this._listSize - 1;
	    	this._listItems.removeClass(this.CONST.SELECTED_CLS).eq(this._curIndex).addClass(this.CONST.SELECTED_CLS);
	    },
	    /**
	     * the handler when press arrow Left
	     * @return null
	     */
	    _keyLeft: function(){
	    	//TODO
	    },
	    /**
	     * the handler when press arrow Right
	     * @return null
	     */
	    _keyRight: function(){
	    	//TODO
	    },
	    /**
	     * the handler when press ENTER
	     * @return null
	     */
	    _keyEnter: function(){
	    	this._selectItem();
	    },
	    /**
	     * the handler when press ESC
	     * @return null
	     */
	    _keyEsc: function(){
	    	this._container.hide();
	    },
	    /**
	     * the handler when press Backspece
	     * @return null
	     */
	    _keyBackspace: function(){
	    	//TODO
	    },
	    /**
	     * 绑定下拉菜单相关的事件
	     * 在更新下拉列表时特别有用
	     * @return null
	     */
	    _bindListEvent: function(){
	    	var that = this;
	    	this._container.find('[data-role=item]').bind('mouseenter', function(e){
	    		that._listItems.eq(that._curIndex).removeClass(that.CONST.SELECTED_CLS);
	    		that._curIndex = that._listItems.index($(this));
	    		$(this).addClass(that.CONST.SELECTED_CLS);
	    	}).bind('click', function(){
	    		that._selectItem();
	    	})
	    },
	    /**
	     * 选中选项
	     * @return null
	     */
	    _selectItem: function(){
	    	var $selected = $('.' + this.CONST.SELECTED_CLS);
	    	if($selected.length){
		    	var value = $selected.attr('data-value');

		    	this._trigger.val(value);
		    	this.trigger('select', value)
	    	}
	    	this._container.hide();
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
});