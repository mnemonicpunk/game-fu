class mnViewSelector extends mnWidget {
    constructor() {
        super();
        var _Instance = this;

        this.cursor = {
            w: 0,
            h: 0,
            x: 0,
            y: 0
        }
        
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
    }
}