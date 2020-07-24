cc.Class({
    extends: cc.Component,

    properties: {
        shootAudio: {
            default: null,
            type: cc.AudioClip
        },
        hitAudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        this.rigidBody = this.node.getComponent(cc.RigidBody);
        this.direction = cc.v2(0, 0);
        //子弹碰撞墙体次数
        this.collisionWallCnt = 0;
    },

    //设置子弹偏移角度
    updateBulletAngle(rotateNum) {
        //根据偏移角度算出弧度，再求x y坐标
        let radian = ((45 + rotateNum) / 180) * Math.PI;
        let x = 1 * Math.sin(radian);
        let y = 1 * Math.cos(radian);
        this.direction = cc.v2(x, y);
    },

    //子弹射击
    shootBullet() {
        cc.audioEngine.playEffect(this.shootAudio, false);
        //缩放向量
        this.rigidBody.linearVelocity = this.direction.mulSelf(300);
    },

    //碰撞开始接触时
    onBeginContact(contact, selfCollider, otherCollider) {
        cc.audioEngine.playEffect(this.hitAudio, false);
        if (otherCollider.tag >= 0 && otherCollider.tag <= 6) {//碰撞道具
            //碰撞道具减血
            this.game.collisionBloodLoss(otherCollider);
        } else if (otherCollider.tag > 6 && otherCollider.tag <= 10) {//碰撞墙体
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
