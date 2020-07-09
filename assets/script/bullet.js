cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() { },

    updateBulletAngle() {
        this.node.angle = 45;
    },

    shootBullet() {
        console.log('子弹射击了');
    }

    // start() { },

    // update (dt) {},
});
