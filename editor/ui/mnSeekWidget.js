class mnSeekWidget extends mnWidget {
    constructor(on_change) {
        super();

        var _Instance = this;

        this.on_change = on_change;

        this.el.className ="seek_widget";
        this.pos = 0;
        this.prev_pos = 0;
        this.max_pos = 0;

        this.label = document.createElement('div');
        this.label.className = 'labeled_textbox_label';
        this.label.innerHTML = this.title;
        this.el.appendChild(this.label);
        
        this.slider = document.createElement('input');
        this.slider.className = 'seek_slider';
        this.slider.type = 'range';
        this.slider.min = 0;
        this.slider.max = 0;
        this.slider.value = 0;
        this.el.appendChild(this.slider);

        this.slider.addEventListener('change', function(e) {
            _Instance.setPosition(_Instance.slider.value);
        });
        this.slider.addEventListener('input', function(e) {
            _Instance.setPosition(_Instance.slider.value);
        });

        this.setPosition(0);
    }
    changePosition(change) {
        var pos = this.pos;
        pos += change;
        if (pos < 0) { pos = 0; }
        if (pos > this.max_pos) { pos = this.max_pos; }
        this.setPosition(pos);
    }
    setPosition(pos) {
        this.pos = pos;
        this.slider.value = this.pos;

        this.label.innerHTML = language.strings.current_frame + ": " + (parseInt(this.pos) + 1) + "/" + (parseInt(this.max_pos) + 1);

        if (this.prev_pos != this.pos) {
            this.prev_pos = this.pos;
            if (this.on_change != undefined) {
                this.on_change(this.pos);
            }
        }
    }
    setMaxPosition(pos) {
        this.max_pos = pos;
        this.slider.max = this.max_pos;

        this.setPosition(this.pos);
    }
}