class mnSaveDelBar extends mnWidget {
    constructor(parent_editor) {
        super();

        var _Instance = this;

        this.el.className ="savedel_bar";
        this.parent_editor = parent_editor;

        this.enabled = false;

        this.del_btn = document.createElement('div');
        this.del_btn.className = "savedel_bar_button";
        this.del_btn.innerHTML = "<i class=\"far fa-trash-alt\"></i> " + language.strings.delete;
        this.el.appendChild(this.del_btn);

        this.discard_btn = document.createElement('div');
        this.discard_btn.className = "savedel_bar_button";
        this.discard_btn.innerHTML = "<i class=\"fas fa-undo\"></i> " + language.strings.discard;
        this.el.appendChild(this.discard_btn); 

        this.save_btn = document.createElement('div');
        this.save_btn.className = "savedel_bar_button";
        this.save_btn.innerHTML = "<i class=\"fas fa-check\"></i> " + language.strings.save;
        this.el.appendChild(this.save_btn);     
        
        this.enable(false);

        this.discard_btn.addEventListener('click', function() {
            _Instance.parent_editor.discard();
        });        
        this.save_btn.addEventListener('click', function() {
            _Instance.parent_editor.save();
        });        
    }
    enable(state) {
        this.enabled = state;
        this.discard_btn.className = this.enabled?"savedel_bar_button":"savedel_bar_button savedel_bar_button_disabled";
        this.save_btn.className = this.enabled?"savedel_bar_button":"savedel_bar_button savedel_bar_button_disabled";
    }
}