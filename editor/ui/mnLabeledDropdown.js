class mnLabeledDropdown extends mnWidget {
    constructor(name, on_change_handler) {
        super();

        var _Instance = this;

        this.el.className = "labeled_textbox";

        this.label = document.createElement('div');
        this.label.className = 'labeled_dropdown_label';
        this.label.innerHTML = name;
        this.el.appendChild(this.label);

        this.dropdown = document.createElement('select');
        this.dropdown.className = 'labeled_dropdown_select';
        this.el.appendChild(this.dropdown);

        this.dropdown.addEventListener('change', function() {
            on_change_handler(_Instance.dropdown.value);
        });
    }
    addOption(name, option) {
        var o = document.createElement('option');
        o.innerHTML = name;
        o.value = option;

        this.dropdown.appendChild(o);
    }
    select(option) { 
        let o = this.dropdown.querySelectorAll('option');
        console.dir(o);
        for (var i=0; i<o.length; i++) {
            if (o[i].value == option) {
                this.dropdown.selectedIndex = i;
                return;
            }
        }
    }
}