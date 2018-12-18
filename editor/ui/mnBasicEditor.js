class mnBasicEditor extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor";
    }
    save() {

    }
    discard() {
        
    }
    onBlur(new_editor) {
        return new_editor;
    }
}