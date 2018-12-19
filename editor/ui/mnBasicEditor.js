class mnBasicEditor extends mnWidget {
    constructor(model) {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor";

        this.has_changes = false;
        this.model = model;
    }
    save() {

    }
    discard() {
        
    }
    onBlur(new_editor) {
        return new_editor;
    }
}