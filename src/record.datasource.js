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
	    getData: function(queryStr){

	    }
	});
});