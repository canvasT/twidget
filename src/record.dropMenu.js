$(function(){
	P('Record').DropMenu = Record.Class({
		init: function(options){
			this.CONST = {
				
			};
			var that = this;
	        var defaults = {
	            trigger: null,
	            model: null,
	            container: null,
	            classPrefix: 'ui-dropmenu',
	            name: null,
	            value: null,
	            length: 0,
	            selectedIndex: 0,
	            disabled: false
	        };

	        this._opts = $.extend(true, {}, defaults, options);
	        this._trigger = $(this._opts.trigger);
	        this._container = this._opts.container ? $(this._opts.container) : $('<div><div>').appendTo('body');
	        this._widgetId = wUtil.getId('widget');
	        this._positioned = false;
	        this.name = this._opts.name;
	        this.value = this._opts.name;

	        this._container.addClass(this._opts.classPrefix).attr('widget-id', this._widgetId).hide();
	       	
	    },
	    _initDom: function(){
	    	var that = this;
	    	var content = ['<ul class="', this._opts.classPrefix, '-content" data-role="content">'];
	    	$.each(this._opts.model, function(i, o){
	    		content.push('<li class="', that._opts.classPrefix, '-item" data-role="item" data-value="', o.value, 
	    			'" data-selected="', (o.selected ? true : false), '">', o.text, '</li>');
	    	})
	    	content.push('</ul>');

	    	this._container.append(content.join(''));
	    },
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
		    				left: tOffset.left
		    			});
		    		}
		    		that._container.show();
	    		}
	    	})

	    	this._container.find('[data-role=item]').bind('click', function(e){
	    		e.stopPropagation();
	    		that.select($(this));
	    	})
	    },
	    select: function(item){
	    	var $seltItem
	    	if(typeof item == 'number'){
	    		var $items = this._container.find('[data-role=item]');
	    		$seltItem = $($items.get(item));
	    	}else{
	    		$seltItem = $(item);
	    	}

	    	if($seltItem.length > 0){
	    		this.value = $seltItem.attr('data-value');
	    		this._trigger.text($seltItem.text());
	    	}

	    	this._container.hide();
	    },
	    updateModel: function(){

	    },
	    addOption: function(){

	    },
	    getOption: function(){

	    },
	    removeOption: function(){

	    },
	    render: function(){
	    	this._initDom();
	    	this._bindEvent();

	    	return this;
	    }
	});
});