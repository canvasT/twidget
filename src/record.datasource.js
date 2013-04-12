$(function(){
	P('Record').DataSource = Record.Class().extend(Record.Event, {
		init: function(options){
			this.superInit();
	        var defaults = {
	            source: null
	        };
	        this._opts = $.extend(true, {}, defaults, options);
	        var source = this._opts.source;
	       	if(wUtil.isArray(source)){
	       		this._type = 'Url';
	       	}else if(wUtil.isObject(source)){
	       		this._type = 'Object';
	       	}else if(wUtil.isFunction(source)){
	       		this._type = 'Function';
	       	}else if(wUtil.isArray(source)){
	       		this._type = 'Array';
	       	}
	    },
	    getData: function(queryStr){
	    	this['_get' + this._type + 'Data'](queryStr);
	    },
	    _getUrlData: function(queryStr){
	    	$.ajax({
    			url: this._opts.source,
    			type: 'POST',
    			data: {
    				q: queryStr,
    				t: new Date().getTime()
    			},
    			success: function(result){
    				var data;
    				if(this._opts.locator){
    					data = P(this._opts.locator, result);
    				}else{
    					data = result;
    				}

    				this.trigger('data', data);
    			},
    			error: function(){

    			}
    		});
	    },
	    _getArrayData: function(){
	    	this._finish(this._opts.source)
	    },
	    _getObjectData: function(){
	    	this._finish(this._opts.source)
	    },
	    _getFunctionData: function(queryStr){
	    	var result = this._opts.source(queryStr);
	    	var finish = function(data){
	    		this._finish(data);
	    	}
    		if(result){
    			this.trigger('data', result);
    		}else{
    			this._opts.source.apply(this, queryStr, finish);
    		}
	    },
	    _finish: function(data){
	    	if(data){
		    	this.trigger('data', data);
	    	}
	    }
	});
});