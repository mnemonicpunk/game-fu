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