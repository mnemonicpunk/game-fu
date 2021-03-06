class mnProjectExplorer extends mnWidget {
    constructor(editorUI) {
        super();

        // not sure if we actually need to save this reference
        this.editor = editorUI;

        this.el = document.createElement('div');
        this.el.className = "project_explorer";

        this.project_widget = new mnProjectWidget();
        this.el.appendChild(this.project_widget.el);

        this.categories = {
            project: new mnProjectExplorerCategory(language.strings.categories.project, null),
            objects: new mnProjectExplorerCategory(language.strings.categories.objects, function() {
                editor.createAsset('objects');
            }),
            scenes: new mnProjectExplorerCategory(language.strings.categories.scenes, function() {
                editor.createAsset('scenes');
            }),
            animations: new mnProjectExplorerCategory(language.strings.categories.animations, function() {
                editor.createAsset('animations');
            }),
            images: new mnProjectExplorerCategory(language.strings.categories.images, function() {
                alert("Please create new images by dragging the files onto the editor.");
            })        
        };

        this.categories.project.addItem(language.strings.general_properties, function() {
            editorUI.setEditor(new mnProjectProperties());
        });
        this.categories.project.addItem(language.strings.graphics_settings, {});

        for (var i in this.categories) {
            this.el.appendChild(this.categories[i].el);
        }

        this.project_widget.project_widget_open.addEventListener('click', function() {
            editorUI.setEditor(new mnOpenProject(editor.storage.listProjects()));
        });
        this.project_widget.project_widget_play.addEventListener('click', function() {
            alert("yay");
        });
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
        for (var i in this.categories) {
            this.categories[i].update();
        }
    }
}