$(function(){
	P('Record').AutoComplete = Record.Class().extend(Record.Event, {
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
	        this._container = (this._opts.container ? $(this._opts.container) : $('<div><div>')).appendTo('body');
	        this._widgetId = wUtil.getId('widget');
	        this._positioned = false;
	        this._model = new Record.DataSource({
	        	source: this._opts.model || []
	        });

	        this._container.addClass(this._opts.classPrefix).attr('widget-id', this._widgetId).hide();
	       	this._trigger.addClass(this.CONST.TRIGGER_CLS);
	    },
	    /**
	     * 生成组件所需的dom节点
	     * @return null
	     */
	    _initDom: function(){
	    	//this._updateList();
	    },
	    /**
	     * 更新下拉框dom
	     * @return null
	     */
	    _updateList: function(){
	    	var that = this;
	    	var content = ['<ul class="', this.CONST.CONTENT_CLS, '" data-role="content">'];
	    	$.each(this._model, function(i, o){
	    		content.push('<li class="', that.CONST.ITEM_CLS, '', '" data-role="item" data-value="', o.value, 
	    			'>', o.text, '</li>');
	    	})
	    	content.push('</ul>');
	    	this._container.html(content.join(''));
	    },
	    /**
	     * 绑定组件所需的事件
	     * @return null
	     */
	    _bindEvent: function(){
	    	var that = this;

	        this._model.bind('data', function(data){
	        	
	        });
	        /*
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

	    	this._bindListEvent();*/
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