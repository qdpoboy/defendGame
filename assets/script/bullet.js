cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    updateBulletAngle() {
        this.node.angle = 45;
    },

    shootBullet() {
        this.rigidBody.linearVelocity = cc.v2(100, 200);
        console.log('子弹射击了');
    }

    // start() { },

    // update (dt) {},
});
