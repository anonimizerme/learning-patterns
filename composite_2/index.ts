abstract class Base {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');     
        
        // if (document.body) {
        //     document.body.appendChild(this.canvas);
        // }
    }
}

class Char extends Base {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    char: string;

    constructor(char) {
        super();        

        this.char = char;

        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px Sans-serif';

        this.canvas.width = this.ctx.measureText(this.char).width;
        this.canvas.height = 15;                
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px Sans-serif';
        this.ctx.fillText(this.char, 0, 10);

        return this.canvas;
    }
}

class Line extends Base {
    chars: Char[] = [];

    constructor() {
        super();

        this.canvas.width = 400;
        this.canvas.height = 15;
    }

    addCharacter(char: string) {
        this.chars.push(new Char(char));
    }

    popCharacter() {
        this.chars.pop();
    }

    draw() {
        this.ctx.clearRect(0, 0, 400, 10);

        let x = 0;
        for (const char of this.chars) {
            this.ctx.drawImage(char.draw(), x, 0);
            x += char.draw().width + 2;
        }

        return this.canvas;
    }
}

class App extends Base {
    lines: Line[] = [];
    activeLine: number = 0;

    constructor() {
        super();

        this.canvas.width = 400;
        this.canvas.height = 100;        
    }

    run() {        
        document.body.appendChild(this.canvas);

        this.initEvents();

        this.clear();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private initEvents() {
        document.addEventListener('keydown', (e) => {
            if (this.lines.length === 0) {
                this.lines.push(new Line())
            }

            console.log(e.key);

            if (e.key === 'Backspace') {
                this.lines[this.activeLine].popCharacter();
            } else if (e.key === 'Shift') {
                // skip;
            } else if (e.key === 'Enter') {
                this.lines.push(new Line())
                this.activeLine++;
            } else {
                this.lines[this.activeLine].addCharacter(e.key);
            }

            this.clear();

            let y = 0;
            for (const line of this.lines) {
                this.ctx.drawImage(line.draw(), 0, 10 * (y + 1))
                y++;
            }            
        })
    }
}

const app = new App();