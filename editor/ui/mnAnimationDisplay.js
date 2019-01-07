class mnAnimationDisplay extends mnImageDisplay {
    constructor(model) {
        super(model.image);

        var _Instance = this;

        this.selecting = false;
        this.selection = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };

        this.selectionA = {
            'x': 0,
            'y': 0
        };
        this.selectionB = {
            'x': 0,
            'y': 0
        };

        this.selection_sprite = this.render.getLayer('main').createSprite();
        this.selection_sprite.draw = function(ctx) {
            let s = _Instance.selection;

            ctx.strokeStyle = "#000";
            ctx.strokeRect(-1, -1, s.w+2, s.h+2);
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(0, 0, s.w, s.h);

            let txt = Math.round(s.x + _Instance.image_width/2) + "/" + Math.round(s.y + _Instance.image_height/2) + " - " + Math.round(s.w) + "/" + Math.round(s.h);
            ctx.fillStyle = "#fff";
            ctx.fillText(txt, -1, s.h + 20);
            ctx.fillStyle = "#fff";
            ctx.fillText(txt, 1, s.h + 20);
            ctx.fillStyle = "#fff";
            ctx.fillText(txt, 0, s.h + 21);
            ctx.fillStyle = "#fff";
            ctx.fillText(txt, 0, s.h + 19);

            ctx.fillStyle = "#000";
            ctx.fillText(txt, 0, s.h + 20);
        };

        this.el.addEventListener('mousedown', function(e) {
            _Instance.setSelectionA(e.offsetX - _Instance.origin_x, e.offsetY - _Instance.origin_y);
            _Instance.selecting = true;
        });
        this.el.addEventListener('mousemove', function(e) {
            if (_Instance.selecting == true) {
                _Instance.setSelectionB(e.offsetX - _Instance.origin_x, e.offsetY - _Instance.origin_y);
            }
        });        
        this.el.addEventListener('mouseup', function(e) {
            _Instance.setSelectionB(e.offsetX - _Instance.origin_x, e.offsetY - _Instance.origin_y);
            _Instance.selecting = false;
        });
        this.setOrigin(this.width/2, this.height/2);
    }
    resize(w, h) {
        super.resize(w, h);
        if (this.selection_sprite != undefined) {
            this.selection_sprite.x = this.origin_x + this.selection.x;
            this.selection_sprite.y = this.origin_y + this.selection.y;
        }
    }
    setOrigin(x, y) {
        super.setOrigin(x, y);
        this.selection_sprite.x = this.origin_x + this.selection.x;
        this.selection_sprite.y = this.origin_y + this.selection.y;      
    }
    setSelectionA(x, y) {
        this.selectionA.x = x;
        this.selectionA.y = y;
    }
    setSelectionB(x, y) {
        this.selectionB.x = x;
        this.selectionB.y = y;
        this.updateSelectionRect();
    } 
    updateSelectionRect() {
        var tl = {
            x: this.selectionA.x,
            y: this.selectionA.y
        };
        var br = {
            x: this.selectionB.x,
            y: this.selectionB.y
        };

        // make sure our corners are exactly what we expect them to be
        if (tl.x > br.x) {
            let tmp = br.x;
            br.x = tl.x;
            tl.x = tmp;
        }
        if (tl.y > br.y) {
            let tmp = br.y;
            br.y = tl.y;
            tl.y = tmp;
        }
        
        this.selection = {
            x: tl.x,
            y: tl.y,
            w: br.x - tl.x,
            h: br.y - tl.y
        };

        this.selection_sprite.x = this.origin_x + this.selection.x;
        this.selection_sprite.y = this.origin_y + this.selection.y;
    }  
}