class mnProjectExplorer extends mnWidget {
    constructor(editor) {
        super();

        // not sure if we actually need to save this reference
        this.editor = editor;

        this.el = document.createElement('div');
        this.el.className = "project_explorer";

        this.identity_widget = new mnIdentityWIdget();
        this.el.appendChild(this.identity_widget.el);

        this.categories = {
            project: new mnProjectExplorerCategory(language.strings.categories.project, null),
            objects: new mnProjectExplorerCategory(language.strings.categories.objects, null),
            scenes: new mnProjectExplorerCategory(language.strings.categories.scenes, null),
            animations: new mnProjectExplorerCategory(language.strings.categories.animations, null),
            images: new mnProjectExplorerCategory(language.strings.categories.images, function() {
                editor.createNewImage();
            })        
        };

        this.categories.project.addItem(language.strings.general_properties, function() {
            alert("Opening general properties");
        });
        this.categories.project.addItem(language.strings.graphics_settings, {});

        for (var i in this.categories) {
            this.el.appendChild(this.categories[i].el);
        }
    }
    addCategory(category) {
        this.categories.push(category);
        this.updateCategories();
    }
    updateCategories() {
        while (this.el.hasChildNodes()) {
            this.el.removeChild(this.el.firstChild);
        }

        this.el.appendChild(this.identity_widget.el);

        for (var i=0; i<this.categories.length; i++) {
            this.el.appendChild(this.categories[i].el);
        }
    }
    update() {
        for (var i=0; i<this.categories.length; i++) {
            this.categories[i].update();
        }
    }
}