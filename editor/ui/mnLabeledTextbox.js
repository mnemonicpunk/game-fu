class mnLabeledTextbox extends mnWidget {
    constructor(name, on_change_handler) {
        super();

        var _Instance = this;

        this.el.className = "labeled_textbox";

        this.label = document.createElement('div');
        this.label.className = 'labeled_textbox_label';
        this.label.innerHTML = name;
        this.el.appendChild(this.label);

        this.text = document.createElement('input');
        this.text.type = "text";
        this.text.className = 'labeled_textbox_text';
        this.el.appendChild(this.text);

        this.text.addEventListener('change', function() {
            if (on_change_handler == undefined) {
                return;
            }
            on_change_handler(_Instance.text.value);
        });
        this.text.addEventListener('input', function() {
            if (on_change_handler == undefined) {
                return;
            }
            on_change_handler(_Instance.text.value);
        });        
    }
    setValue(val) {
        this.text.value = val;
    }
    getValue() {
        return this.text.value;
    }    
}