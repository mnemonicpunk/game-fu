class mnImageEditor extends mnSplitPaneEditor {
    constructor(img) {
        super();

        var _Instance = this;

        this.img = img;

        this.canvas = document.createElement('canvas');
        this.canvas.style = "width: 100%; height: 100%";
        this.edit_main_pane.appendChild(this.canvas);
        this.render = new mnRender(this.canvas);
        this.render.createLayer('main');
        this.render.setSize(this.edit_main_pane.width, this.edit_main_pane.height);

        var temp_img = document.createElement('img');
        temp_img.src = img.url;
        console.dir(img);

        this.img_sprite = this.render.getLayer('main').createSprite();
        this.img_sprite._animation = new mnStaticFullImage(temp_img);

        // add the delete/save toolstrip
        this.savedel = new mnSaveDelBar();
        this.edit_properties_pane.appendChild(this.savedel.el);

        // create the name textbox
        this.image_name = new mnLabeledTextbox(language.strings.image_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.image_name.el);
        this.image_name.setValue(this.img.name);

        // create the url textbox
        this.image_url = new mnLabeledTextbox(language.strings.image_url, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.image_url.el);
        this.image_url.setValue("");

        window.addEventListener('resize', function() {
            _Instance.render.setSize(_Instance.edit_main_pane.clientWidth, _Instance.edit_main_pane.clientHeight);
            _Instance.img_sprite.x = _Instance.edit_main_pane.clientWidth / 2;
            _Instance.img_sprite.y = _Instance.edit_main_pane.clientHeight / 2;
        });

        this.canvas.addEventListener('wheel', (e) => {
            _Instance.wheelZoom(e.deltaY);
        });
    }
    onBlur(new_destination) {
        // if we have unsaved changes, display a confirmation dialog
        /*
        var sdd = new mnSaveDiscardDialog(this, new_destination);
        return sdd;
        */

        // we default to no unchanged data for now
        return new_destination;
    }
    wheelZoom(deltaY) {
        console.log(deltaY);
        this.img_sprite.scale_x += deltaY * 0.01;
        this.img_sprite.scale_y += deltaY * 0.01;

        if (this.img_sprite.scale_x < 0.1) {
            this.img_sprite.scale_x = 0.1;
        }
        if (this.img_sprite.scale_y < 0.1) {
            this.img_sprite.scale_y = 0.1;
        }
        if (this.img_sprite.scale_x > 3) {
            this.img_sprite.scale_x = 3;
        }
        if (this.img_sprite.scale_y > 3) {
            this.img_sprite.scale_y = 3;
        }


    }
}