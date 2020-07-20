cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        //子弹碰撞墙体次数
        this.collisionWallCnt = 0;
    },

    //设置子弹偏移角度
    updateBulletAngle() {
        this.node.angle = 45;
    },

    //子弹射击
    shootBullet() {
        this.rigidBody.linearVelocity = cc.v2(200, 200);
    },

    //碰撞开始接触时
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.tag >= 0 && otherCollider.tag <= 6) {//碰撞道具
            //碰撞道具减血
            this.game.collisionBloodLoss(otherCollider.tag);
        } else if (otherCollider.tag > 6) {//碰撞墙体
            this.collisionWallCnt++;
        }
        //碰撞墙体两次后子弹消失
        if (this.collisionWallCnt == 2) {
            this.node.destroy();
            console.log('子弹销毁');
        }
    },

    // start() { },

    // update (dt) {},
});
