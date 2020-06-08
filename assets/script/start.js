cc.Class({
    extends: cc.Component,

    properties: {
        startBtn: cc.Button
    },

    onLoad() {
        this.startBtn.node.on(cc.Node.EventType.TOUCH_START, this.touchGameStart, this);
        //预加载游戏主场景
        cc.director.preloadScene('game');
    },

    touchGameStart() {
        cc.director.loadSceneZ('game');
    },

    start() { },

    // update (dt) {},
});
