class mnEditor {
    constructor() {
        this.ui = new mnEditorUI();

        this.assets = {
            objects: [],
            scenes: [],
            animations: [],
            images: []
        }
        this.updateProjectExplorer();
    }
    updateProjectExplorer() {
        
    }
}

window.addEventListener('load', function() {
    var editor = new mnEditor();
    document.body.appendChild(editor.ui.el);
    console.log("test");
});