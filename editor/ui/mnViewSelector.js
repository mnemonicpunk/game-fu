class mnViewSelector extends mnImageDisplay {
    constructor(image, target) {
        super(image);

        var _Instance = this;

        this.el.className = 'view_selector';
        this.el.style = "";

        this.target = target;

        this.pixel_ratio = 1;

        this.cursor_w = this.target.width * this.pixel_ratio;
        this.cursor_h = this.target.height * this.pixel_ratio;

        this.cursor = this.render.getLayer('main').createSprite();
        this.cursor.draw = function(ctx) {
            ctx.strokeStyle = '#f00';
            ctx.strokeRect(this.x - _Instance.cursor_w/2, this.y - _Instance.cursor_h/2, _Instance.cursor_w, _Instance.cursor_h);
        };

        this.el.addEventListener('mousemove', function(e) {
            if (!(e.buttons && 1)) { return; }
            _Instance.setCursorPosition(e.offsetX, e.offsetY);
        });
        this.el.addEventListener('click', function(e) {
            _Instance.setCursorPosition(e.offsetX, e.offsetY);
        });
        
        this.setCursorPosition(this.width, this.height);
        this.hasBeenInitialized = false;
    }
    resize(w, h) {
        super.resize(w, h);

        // let's assume image is wider than it is high and set our ratio from that
        let longer_side = this.image_width;
        this.pixel_ratio = this.width/this.image_width;

        // but in case is higher than it is wide set our ratio from that
        if (this.image_height > this.image_width) {
            longer_side = this.image_height;
            this.pixel_ratio = this.height/this.image_height;
        }

        this.img_sprite.scale_x = this.width / longer_side;
        this.img_sprite.scale_y = this.height / longer_side;

        if (this.target != undefined) {
            this.cursor_w = this.target.width * this.pixel_ratio;
            this.cursor_h = this.target.height * this.pixel_ratio;

            if (!this.hasBeenInitialized) {
                this.setCursorPosition(this.width/2, this.height/2);
                this.hasBeenInitialized = true;
            }            
        } 

        if (this.target != undefined) {
            this.target.setOrigin((this.cursor.x*2)/this.width, (this.cursor.y*2)/this.height);            
        }
    }
    setCursorPosition(mx, my) {
        this.cursor.x = mx/2;
        this.cursor.y = my/2;

        if (this.target != undefined) {
            this.target.setOrigin((this.cursor.x*2)/this.width, (this.cursor.y*2)/this.height);            
        }
    }

}