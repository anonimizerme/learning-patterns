var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        // if (document.body) {
        //     document.body.appendChild(this.canvas);
        // }
    }
    return Base;
}());
var Char = /** @class */ (function (_super) {
    __extends(Char, _super);
    function Char(char) {
        var _this = _super.call(this) || this;
        _this.char = char;
        _this.ctx.fillStyle = 'white';
        _this.ctx.font = '10px Sans-serif';
        _this.canvas.width = _this.ctx.measureText(_this.char).width;
        _this.canvas.height = 15;
        return _this;
    }
    Char.prototype.draw = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px Sans-serif';
        this.ctx.fillText(this.char, 0, 10);
        return this.canvas;
    };
    return Char;
}(Base));
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super.call(this) || this;
        _this.chars = [];
        _this.canvas.width = 400;
        _this.canvas.height = 15;
        return _this;
    }
    Line.prototype.addCharacter = function (char) {
        this.chars.push(new Char(char));
    };
    Line.prototype.popCharacter = function () {
        this.chars.pop();
    };
    Line.prototype.draw = function () {
        this.ctx.clearRect(0, 0, 400, 10);
        var x = 0;
        for (var _i = 0, _a = this.chars; _i < _a.length; _i++) {
            var char = _a[_i];
            this.ctx.drawImage(char.draw(), x, 0);
            x += char.draw().width + 2;
        }
        return this.canvas;
    };
    return Line;
}(Base));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super.call(this) || this;
        _this.lines = [];
        _this.activeLine = 0;
        _this.canvas.width = 400;
        _this.canvas.height = 100;
        return _this;
    }
    App.prototype.run = function () {
        document.body.appendChild(this.canvas);
        this.initEvents();
        this.clear();
    };
    App.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    App.prototype.initEvents = function () {
        var _this = this;
        document.addEventListener('keydown', function (e) {
            if (_this.lines.length === 0) {
                _this.lines.push(new Line());
            }
            console.log(e.key);
            if (e.key === 'Backspace') {
                _this.lines[_this.activeLine].popCharacter();
            }
            else if (e.key === 'Shift') {
                // skip;
            }
            else if (e.key === 'Enter') {
                _this.lines.push(new Line());
                _this.activeLine++;
            }
            else {
                _this.lines[_this.activeLine].addCharacter(e.key);
            }
            _this.clear();
            var y = 0;
            for (var _i = 0, _a = _this.lines; _i < _a.length; _i++) {
                var line = _a[_i];
                _this.ctx.drawImage(line.draw(), 0, 10 * (y + 1));
                y++;
            }
        });
    };
    return App;
}(Base));
var app = new App();
