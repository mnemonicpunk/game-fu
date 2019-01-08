class mnImageDisplay extends mnWidget {
    constructor(image) {
        super();

        var _Instance = this;

        this.image = null;
        this.width = 0;
        this.height = 0;
        this.image_width = 0;
        this.image_height = 0;

        this.origin_x = 0;
        this.origin_y = 0;

        // create our canvas
        this.el = document.createElement('canvas');
        this.el.style = "width: 100%; height: 100%";

        this.render = new mnRender(this.el);
        this.render.createLayer('main');

        // we definitely need to readjust this on resize
        this.render.setSize(this.width, this.height);
        this.img_sprite = this.render.getLayer('main').createSprite();
        this.setImage(image);

        this.el.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }
    setImage(image) {
        var _Instance = this;

        this.image = image;
    
        if ((this.image == null) || (this.image == undefined)) {
            console.log("Warning: No image defined.");
            return;
        }

        var temp_img = document.createElement('img');
        temp_img.src = this.image.url;

        this.img_sprite._animation = new mnStaticFullImage(temp_img); 
        this.image_width = temp_img.width;
        this.image_height = temp_img.height;    

        this.resize(this.width, this.height);
        
        temp_img.onload = function() {
            _Instance.img_sprite._animation = new mnStaticFullImage(temp_img); 
            _Instance.image_width = temp_img.width;
            _Instance.image_height = temp_img.height;    

            _Instance.resize(_Instance.width, _Instance.height);
        };          
    }
    resize(w, h) {
        this.width = w;
        this.height = h;
        this.el.style.width = w + "px";
        this.el.style.height = h + "px";

        this.render.setSize(w, h);
        this.img_sprite.x = w / 2;
        this.img_sprite.y = h / 2;
    }
    setOrigin(x, y) {
        this.origin_x = (this.width/2) + ((x-0.5) * -this.image_width );
        this.origin_y = (this.height/2) + ((y-0.5) * -this.image_height );

        this.img_sprite.x = this.origin_x;
        this.img_sprite.y = this.origin_y;
    }
}