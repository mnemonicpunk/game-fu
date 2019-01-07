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
        }

        this.el.addEventListener('mousemove', function(e) {
            if (!(e.buttons && 1)) { return; }
            _Instance.setCursorPosition(e.offsetX, e.offsetY);
        });
        this.el.addEventListener('click', function(e) {
            _Instance.setCursorPosition(e.offsetX, e.offsetY);
        });
        
        this.setCursorPosition(0, 0);
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

            /*console.dir({
                'image_width': this.image_width,
                'image_height': this.image_height,
                'scaled_width': this.img_sprite.scale_x,
                'scaled_height': this.img_sprite.scale_y,
                'target_width': this.target.width,
                'target_height': this.target.height,
                'cursor_w': this.cursor_w,
                'cursor_h': this.cursor_h,
                'longer_side': longer_side,
                'pixel_ratio': this.pixel_ratio
            });*/
        } 
    }
    setCursorPosition(mx, my) {
        this.cursor.x = mx/2;
        this.cursor.y = my/2;

        if (this.target != undefined) {
            this.target.setOrigin((this.cursor.x*2)/this.width, (this.cursor.y*2)/this.height);
        }

        /*console.dir({
            'x': mx/2,
            'y': my/2,
            'width': this.width,
            'height': this.height
        });
        console.dir(this.cursor);*/
    }

}