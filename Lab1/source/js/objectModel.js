

const INITIAL_MARIO_X = 0;
const INITIAL_MARIO_Y = 0;

const SCENE_RECT = document.getElementsByClassName('mainScene')[0].getBoundingClientRect();

let Model = function () {
    this.x = INITIAL_MARIO_X;
    this.y = INITIAL_MARIO_Y;
};

Model.prototype.init = function(renderFunction){
    this.needRendering = renderFunction;
};
Model.prototype.setCoords = function (obj, x, y) {
    this.x = !x ? obj.x : x;
    this.y = !y ? obj.y : y;
    checkScreenBorders.call(this, obj, x);
    this.needRendering();
};

Model.prototype.getCoords = function (obj) {
    return {
        x: obj.x,
        y: obj.y
    }
};
Model.prototype.move = function(e){
    const keyCode = e.keyCode;
    const x = marioModel.getCoords(marioModel.objs.mario).x;
    switch (keyCode) {
        case KEY_CODE_RIGHT: {
            marioModel.setCoords(marioModel.objs.mario, x + MARIO_STEP);
            break;
        }
        case KEY_CODE_LEFT: {
            marioModel.setCoords(marioModel.objs.mario, x - MARIO_STEP);
            break;
        }
    }
};

function checkScreenBorders(obj, x) {
    if (!(x <= LEFT_BORDER || x >= RIGHT_BORDER)) {
        obj.x = x;
    }
    else {
        if (obj.hasOwnProperty('direction')) {
            obj.direction = obj.direction === 'right' ? 'left' : 'right';
        }
    }
}
var marioModel = new Model();

