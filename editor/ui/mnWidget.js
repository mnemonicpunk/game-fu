class mnWidget {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = "";

        this.container_widget = null;
    }
    setContainer(c) {
        this.container_widget = c;
    }
    getContainer() {
        return this.container_widget;
    }
}