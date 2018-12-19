class mnBasicEditor extends mnWidget {
    constructor(model) {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor";

        this.has_changes = false;
        this.model = model;
    }
    save() {
        this.has_changes = false;
    }
    discard() {
        this.has_changes = false;
    }
    changed() {
        this.has_changes = true;
    }
    onBlur(new_editor) {
        return new_editor;
    }
}