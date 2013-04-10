/**
 * Event类
 * 继承自该类的组件将具有事件驱动功能，包括事件绑定与事件触犯等
 */
P('Record').Event = Record.Class({
	init: function(){
		this._eventMap = {};
	},
	/**
	 * 绑定事件
	 * @param  {String} type   事件类型
	 * @param  {Function} handle 处理函数
	 * @return null
	 */
	bind: function(type, handle){
		var eventList = this._eventMap[type] = this._eventMap[type] ? this._eventMap[type] : [];

		eventList.push(handle);
	},
	/**
	 * 解绑
	 * 删除指定事件类型下的处理函数
	 * @param  {String} type 事件类型
	 * @return null
	 */
	unbind: function(type){
		this._eventMap[type] = null;
	},
	/**
	 * 触发事件
	 * 执行指定事件类型下的处理函数
	 * @param  {String} type 事件类型
	 * @return null
	 */
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