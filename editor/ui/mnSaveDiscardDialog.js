class mnSaveDiscardDialog extends mnBasicEditor {
    constructor(unsaved_editor, next_editor) {
        super();

        var _Instance = this;

        this.next_editor = next_editor;
        this.unsaved_editor = unsaved_editor;

        this.resolved = false;

        this.title = document.createElement('div');
        this.title.className = "editor_modal_title";
        this.title.innerHTML = language.strings.save_discard_title;

        this.message = document.createElement('div');
        this.message.className = "editor_modal_message";
        this.message.innerHTML = language.strings.save_discard_message;

        this.btn_save = document.createElement('div');
        this.btn_save.className = "editor_modal_button";
        this.btn_save.innerHTML = language.strings.save;

        this.btn_discard = document.createElement('div');
        this.btn_discard.className = "editor_modal_button";
        this.btn_discard.innerHTML = language.strings.discard;

        this.btn_cancel = document.createElement('div');
        this.btn_cancel.className = "editor_modal_button";
        this.btn_cancel.innerHTML = language.strings.cancel;        

        this.btn_save.addEventListener('click', function() {
            _Instance.save();
            editor.ui.setEditor(_Instance.next_editor);
        });
        this.btn_discard.addEventListener('click', function() {
            _Instance.discard();
            editor.ui.setEditor(_Instance.next_editor);
        });
        this.btn_cancel.addEventListener('click', function() {
            _Instance.resolved = true;
            editor.ui.setEditor(_Instance.unsaved_editor);
        });        

        this.el.appendChild(this.title);
        this.el.appendChild(this.message);
        this.el.appendChild(this.btn_save);
        this.el.appendChild(this.btn_discard);
        this.el.appendChild(this.btn_cancel);
    }
    save() {
        this.unsaved_editor.save();
        this.resolved = true;
    }
    discard() {
        this.unsaved_editor.discard();
        this.resolved = true;
    }    
    onBlur(new_destination) {
        if (this.resolved == false) {
            this.next_editor = new_destination;
            return this;
        }
        return new_destination;
    }
}