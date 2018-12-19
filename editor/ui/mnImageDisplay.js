class mnImageDisplay extends mnWidget {
    constructor(image) {
        super();

        var _Instance = this;

        this.image = null;
        this.width = 0;
        this.height = 0;

        // create our canvas
        this.el = document.createElement('canvas');
        this.el.style = "width: 100%; height: 100%";

        this.render = new mnRender(this.el);
        this.render.createLayer('main');

        // we definitely need to readjust this on resize
        this.render.setSize(this.width, this.height);
        this.img_sprite = this.render.getLayer('main').createSprite();
        this.setImage(image);

    }
    setImage(image) {
        var _Instance = this;

        this.image = image;
    
        var temp_img = document.createElement('img');
        temp_img.src = this.image.url;

        this.img_sprite._animation = new mnStaticFullImage(temp_img);  
        this.resize(this.width, this.height);
        
        temp_img.onload = function() {
            _Instance.img_sprite._animation = new mnStaticFullImage(temp_img); 
            _Instance.resize(_Instance.width, _Instance.height);          
        };          
    }
    resize(w, h) {
        this.width = w;
        this.height = h;

        this.render.setSize(w, h);
        this.img_sprite.x = w / 2;
        this.img_sprite.y = h / 2;
    }
}