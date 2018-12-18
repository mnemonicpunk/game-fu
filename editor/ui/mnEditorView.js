class mnEditorView extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_view";

        this.editor = new mnBasicEditor();
    }
    setEditor(editor) {
        while (this.el.hasChildNodes()) {
            this.el.removeChild(this.el.firstChild);
        }

        this.editor = this.editor.onBlur(editor);
        this.el.appendChild(this.editor.el);

        window.dispatchEvent(new Event('resize'));
    }
}