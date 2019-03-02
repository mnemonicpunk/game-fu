class mnProjectProperties extends mnBasicEditor {
    constructor(model) {
        super(model);

        this.title = document.createElement('div');
        this.title.className = "dialog_title";
        this.title.innerHTML = "Project Properties";
        this.el.appendChild(this.title);

        this.list_container = document.createElement('div');
        this.list_container.className = "pp_list_container";
        this.el.appendChild(this.list_container);
    }
}