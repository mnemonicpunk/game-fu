class mnWidget {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = "";
    }
}

class mnProjectExplorerItem extends mnWidget {
    constructor(name, handler) {
        super();
        this.item_name = name;
        this.handler = handler;

        this.el = document.createElement('div');
        this.el.className = "project_explorer_item";
        this.el.innerHTML = this.item_name;

        this.el.addEventListener('click', this.handler);
    }
}

class mnProjectExplorerCategory extends mnWidget {
    constructor(name) {
        super();

        var _Instance = this;
        this.state = false;
        this.items = [];

        this.category_name = name;
        this.el = document.createElement('div');
        this.el.className = "project_explorer_category";
        //this.el.innerHTML = this.name;

        this.name = document.createElement('div');
        this.name.className = "project_explorer_category_name";
        this.name.innerHTML = this.category_name;
        this.el.appendChild(this.name);

        this.content = document.createElement('div');
        this.content.className = "project_explorer_category_content";
        this.el.appendChild(this.content);        

        this.update();

        this.name.addEventListener('click', function() {
            _Instance.toggle();
        });
    }
    toggle() {
        this.state = !this.state;
        this.update();
    }
    clear() {
        this.items = [];
    }
    addItem(name, handler) {
        var item = new mnProjectExplorerItem(name, handler);
        this.items.push(item);
    }
    update() {
        this.content.style = this.state?"":"display: none;";

        while (this.content.hasChildNodes()) {
            this.content.removeChild(this.content.firstChild);
        }

        for (var i=0; i<this.items.length; i++) {
            this.content.appendChild(this.items[i].el);
        }
    }
}

class mnProjectExplorer extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "project_explorer";

        this.categories = {
            project: new mnProjectExplorerCategory("Project"),
            objects: new mnProjectExplorerCategory("Objects"),
            scenes: new mnProjectExplorerCategory("Scenes"),
            animations: new mnProjectExplorerCategory("Animations"),
            images: new mnProjectExplorerCategory("Images")        
        };

        this.categories.project.addItem("General Properties", function() {
            alert("Opening general properties");
        });
        this.categories.project.addItem("Graphics Settings", {});

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

class mnBasicEditor extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor";
    }
}

class mnObjectEditor extends mnBasicEditor {
    constructor(obj) {
        super();
        this.obj = obj;

        console.log("now editing");
        console.dir(this.obj);

        this.edit_object_code = document.createElement('div');
        this.edit_object_code.className = "edit_object_code";
        this.el.appendChild(this.edit_object_code);

        this.edit_object_properties = document.createElement('div');
        this.edit_object_properties.className = "edit_object_properties";
        this.el.appendChild(this.edit_object_properties);
        this.edit_object_properties.innerHTML = "Object Name";
    }
}

class mnEditorView extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_view";
    }
    setEditor(editor) {
        while (this.el.hasChildNodes()) {
            this.el.removeChild(this.el.firstChild);
        }

        this.editor = editor;
        this.el.appendChild(this.editor.el);
    }
}

class mnEditorUI extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_ui";

        this.project_explorer = new mnProjectExplorer();
        this.el.appendChild(this.project_explorer.el);

        this.editor_view = new mnEditorView();
        this.el.appendChild(this.editor_view.el);
    }
    editObject(obj) {
        var obj_editor = new mnObjectEditor(obj);
        this.editor_view.setEditor(obj_editor) ;
    }
}