function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]"
    }
}

P('Record.widget').util = {
	_baseId: new Date().getTime(),

	getId: function(prefix){
		var id = ++Record.widget.util._baseId;

		return prefix + '-' + id;
	},

	getObjFromArr: function(arr, key, val){
        if(!this.isArray(arr))
            return null;

        for(var i = 0, len = arr.length; i < len; i++){
            var o = arr[i];
            if(o[key] && o[key] == val)
                return o;
        }
        return null;
    },

    isObject: isType("Object"),

    isString: isType("String"),

    isArray: Array.isArray || isType("Array"),

    isFunction: isType("Function")
}

wUtil = Record.widget.util;