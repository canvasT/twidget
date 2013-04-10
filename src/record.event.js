P('Record').Event = Record.Class({
	init: function(){
		this._eventMap = {};
	},
	bind: function(type, handle){
		var eventList = this._eventMap[type] = this._eventMap[type] ? this._eventMap[type] : [];

		eventList.push(handle);
	},
	unbind: function(type){
		this._eventMap[type] = null;
	},
	trigger: function(type){
		var eventList = this._eventMap[type];
		var args = Array.prototype.slice.apply(arguments, [1])
		if(eventList && eventList.length > 0){
			for(var i = 0, len = eventList.length; i < len; i++){
				var handle = eventList[i];
				handle.apply(this, args);
			}
		}
	}
});