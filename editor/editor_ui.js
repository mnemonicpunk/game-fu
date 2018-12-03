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
    addItem(item) {
        this.items.push(item);
        this.update();
    }
    setItems(items) {
        this.items = items;
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

        this.categories.project.addItem(new mnProjectExplorerItem("General Properties", function() {
            alert("Opening general properties");
        }));
        this.categories.project.addItem(new mnProjectExplorerItem("Graphics Settings", {}));

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
}

class mnEditorUI extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_ui";

        this.project_explorer = new mnProjectExplorer();
        this.el.appendChild(this.project_explorer.el);
    }
}