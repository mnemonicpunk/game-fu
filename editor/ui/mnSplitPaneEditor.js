class mnSplitPaneEditor extends mnBasicEditor {
    constructor(model) {
        super(model);
        this.edit_main_pane = document.createElement('div');
        this.edit_main_pane.className = "edit_main_pane";
        this.el.appendChild(this.edit_main_pane);

        this.edit_properties_pane = document.createElement('div');
        this.edit_properties_pane.className = "edit_properties_pane";
        this.el.appendChild(this.edit_properties_pane);   
    }
}