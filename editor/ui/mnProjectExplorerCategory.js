class mnProjectExplorerCategory extends mnWidget {
    constructor(name, plus_handler) {
        super();

        var _Instance = this;
        this.state = false;
        this.items = [];

        this.category_name = name;
        this.el = document.createElement('div');
        this.el.className = "project_explorer_category";

        this.name = document.createElement('div');
        this.name.className = "project_explorer_category_name";
        this.name.innerHTML = this.category_name;
        this.el.appendChild(this.name);

        this.category_add = document.createElement('div');
        this.category_add.className = 'project_explorer_no_plus_button';
        this.category_add.innerHTML = "+";
        this.name.appendChild(this.category_add);

        // for categories with a handler show a clickable plus button
        if (plus_handler != null) {
            this.category_add.className = 'project_explorer_plus_button';
            this.category_add.addEventListener('click', function(e) {
                plus_handler();
                e.stopPropagation();
            });
        }

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