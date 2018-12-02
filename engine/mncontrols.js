class mnControls {
	constructor(element) {
		var _Instance = this;

		this.element = element;
		this.state = {};
		this.state_previous = {};

		document.body.addEventListener('keydown', function(e) {
			_Instance._setKey(e.key, true);
		});
		document.body.addEventListener('keyup', function(e) {
			_Instance._setKey(e.key, false);
		});

		this.aliases = {
			'left_arrow': "ArrowLeft",
			'right_arrow': "ArrowRight",
			'up_arrow': "ArrowUp",
			'down_arrow': "ArrowDown",
			'arrow_left': "ArrowLeft",
			'arrow_right': "ArrowRight",
			'arrow_up': "ArrowUp",
			'arrow_down': "ArrowDown"			
		}
	}
	update() {
		// move the current state over to the previous state
		for (var i in this.state) {
			this.state_previous[i] = this.state[i];
		}
	}
	key(keyname) {
		keyname = this._unaliasKeyname(keyname);
		return this._checkKey(keyname);
	}
	keyDown(keyname) {
		keyname = this._unaliasKeyname(keyname);

		// if the key is currently in downed state but was not in previous frame
		if (this._checkKey(keyname) && !(this._checkKeyPrevious(keyname))) {
			return true;
		}
		return false;
	}
	keyUp(keyname) {
		keyname = this._unaliasKeyname(keyname);

		// if the key is currently in up state but was down in previous frame
		if (!(this._checkKey(keyname)) && this._checkKeyPrevious(keyname)) {
			return true;
		}
		return false;
	}
	_checkKey(key) {
		if (!(key in this.state)) {
			return false;
		}
		return this.state[key];
	}
	_checkKeyPrevious(key) {
		if (!(key in this.state_previous)) {
			return false;
		}
		return this.state_previous[key];
	}	
	_setKey(key, state) {
		this.state[key] = state;
	}
	_unaliasKeyname(keyname) {
		if (keyname in this.aliases) {
			return this.aliases[keyname];
		}
		return keyname;
	}
}