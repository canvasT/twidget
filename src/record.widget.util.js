P('Record.widget').util = {
	_baseId: new Date().getTime(),

	getId: function(prefix){
		var id = ++Record.widget.util._baseId;

		return prefix + '-' + id;
	}
}

wUtil = Record.widget.util;