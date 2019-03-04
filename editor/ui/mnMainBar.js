class mnMainBar extends mnWidget {
    constructor() {
        super();

        this.el.className = "main_bar";
        this.el.innerHTML = "main_bar";
    }
    setName(name) {
        //this.project_explorer.project_widget.setName(name);
        this.el.innerHTML = name;
    }

}