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
        this.rigidBody.linearVelocity = cc.v2(200, 200);
        console.log('子弹射击了');
    },

    //碰撞开始接触时
    onBeginContact(contact, selfCollider, otherCollider) {
        console.log('碰撞了' + otherCollider.tag);
    },

    // start() { },

    // update (dt) {},
});
