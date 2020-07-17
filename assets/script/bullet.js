cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        //子弹碰撞道具次数
        this.collisionWallCnt = 0;
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
        if (otherCollider.tag >= 0 && otherCollider.tag <= 6) {//碰撞道具
            console.log('碰撞了' + otherCollider.tag + '，减血');
        } else if (otherCollider.tag > 6) {//碰撞墙体
            this.collisionWallCnt++;
            console.log('碰撞了' + otherCollider.tag + '，累加碰撞次数');
        }
        //碰撞墙体两次后子弹消失
        if (this.collisionWallCnt == 2) {
            this.node.destroy();
            console.log('子弹消失');
        }
    },

    // start() { },

    // update (dt) {},
});
