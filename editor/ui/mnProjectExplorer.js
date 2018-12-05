class mnProjectExplorer extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "project_explorer";

        this.identity_widget = new mnIdentityWIdget();
        this.el.appendChild(this.identity_widget.el);

        this.categories = {
            project: new mnProjectExplorerCategory(language.strings.categories.project),
            objects: new mnProjectExplorerCategory(language.strings.categories.objects),
            scenes: new mnProjectExplorerCategory(language.strings.categories.scenes),
            animations: new mnProjectExplorerCategory(language.strings.categories.animations),
            images: new mnProjectExplorerCategory(language.strings.categories.images)        
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