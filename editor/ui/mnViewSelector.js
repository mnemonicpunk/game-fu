class mnViewSelector extends mnImageDisplay {
    constructor(image, target) {
        super(image);

        var _Instance = this;

        this.el.className = 'view_selector';
        this.el.style = "";
        
        this.ratio = 1;

        this.target = target;

        this.cursor_w = this.target.width * this.ratio;
        this.cursor_h = this.target.height * this.ratio;

        this.cursor = this.render.getLayer('main').createSprite();
        this.cursor.draw = function(ctx) {
            ctx.strokeStyle = '#f00';
            ctx.strokeRect(_Instance.cursor.x - _Instance.cursor_w/2, _Instance.cursor.y - _Instance.cursor_h/2, _Instance.cursor_w, _Instance.cursor_h);

            ctx.fillStyle = '#fff';
            ctx.fillText(Math.round(_Instance.cursor.x) + " " + Math.round(_Instance.cursor.y), _Instance.cursor.x, _Instance.cursor.y);
            ctx.fillText(Math.round(_Instance.cursor_w) + " " + Math.round(_Instance.cursor_h), _Instance.cursor.x, _Instance.cursor.y+20);
        }

        this.el.addEventListener('mousemove', function(e) {
            if (!(e.buttons && 1)) { return; }
            _Instance.setCursorPosition(e.offsetX - _Instance.cursor_w/2, e.offsetY - _Instance.cursor_h/2);
        });
        this.el.addEventListener('click', function(e) {
            _Instance.setCursorPosition(e.offsetX - _Instance.cursor_w/2, e.offsetY - _Instance.cursor_h/2);
        });
        
        this.setCursorPosition(0, 0);
    }
    resize(w, h) {
        super.resize(w, h);

        // TO-DO: Find the scale ratio of the set image
        // Whichever side of the image is bigger gets set to the whole size while the other gets scaled accordingly
        // Then we can position the cursor to fit

        let size = this.image_width;
        this.ratio = w / this.image_width;
        if (this.image_height > this.image_width) {
            size = this.image_height;
            this.ratio = h / this.image_height;
        }

        let new_w = this.width / size;
        let new_h = this.height / size;

        console.dir({
            new_w: new_w,
            new_h: new_h
        });

        this.img_sprite.scale_x = new_w;
        this.img_sprite.scale_y = new_h;

        if (this.target != undefined) {
            this.cursor_w = this.target.width * this.ratio;
            this.cursor_h = this.target.height * this.ratio;
        }
    }
    setCursorPosition(mx, my) {
        let x = mx + this.cursor_w / 2;
        let y = my + this.cursor_h / 2;

        //console.dir([x, y]);
        this.cursor.x = x/2;
        this.cursor.y = y/2;

        if (this.target != undefined) {
            this.target.setOrigin((this.cursor.x*2)/this.width, (this.cursor.y*2)/this.height);
        }
    }
    /*constructor() {
        super();
        var _Instance = this;

        this.cursor = {
            w: 0,
            h: 0,
            x: 0,
            y: 0
        };
        
        this.el.className = 'view_selector';

        this.vs = document.createElement('canvas');
        this.vs.className = 'vs_canvas';

        this.el.appendChild(this.vs);
        this.updateCanvas();

        this.vs.addEventListener('click', function(e) {
            _Instance.click(e.offsetX, e.offsetY);
        });

        this.setSize(0);
    }
    setSize(size) {
        this.vs.width = size;
        this.vs.height = size;

        this.updateCanvas();
    }
    setCursorSize(w, h) {
        this.cursor.w = w;
        this.cursor.h = w;
    }
    updateCanvas() {
        var ctx = this.vs.getContext('2d');
        ctx.clearRect(0,0, this.vs.width, this.vs.height);
        ctx.strokeStyle = '#f00';
        ctx.strokeRect(this.cursor.x, this.cursor.y, this.cursor.w, this.cursor.h);
    }
    click(x, y) {
        this.cursor.x = x - this.cursor.w/2;
        this.cursor.y = y - this.cursor.h/2;
        if (this.cursor.x < 0) {
            this.cursor.x = 0;
        }
        if (this.cursor.y < 0) {
            this.cursor.y = 0;
        }
        if (this.cursor.x > (this.vs.width - this.cursor.w)) {
            this.cursor.x = this.vs.width - this.cursor.w;
        }
        if (this.cursor.y > (this.vs.height - this.cursor.h)) {
            this.cursor.y = this.vs.height - this.cursor.h;
        }

        this.updateCanvas();
    }*/
}