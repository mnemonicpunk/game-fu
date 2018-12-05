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