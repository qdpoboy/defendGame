cc.Class({
    extends: cc.Component,

    properties: {
        launcherNode: {
            default: null,
            type: cc.Node
        },
        baffleNode: {
            default: null,
            type: cc.Node
        },
        baffleSpeed: {
            default: 0,
            type: cc.Integer
        },
        circleCenter: {
            default: cc.v2(0, 0),
        },
        circleRadius: {
            default: 0,
            type: cc.Float
        },
        radian: {
            default: 0,
            type: cc.Float
        },
        launcherPrefab1: {
            default: null,
            type: cc.Prefab
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        },
        progressBar1: {
            default: null,
            type: cc.ProgressBar
        },
        progressBar2: {
            default: null,
            type: cc.ProgressBar
        }
        ,
        progressBar3: {
            default: null,
            type: cc.ProgressBar
        },
        progressBar4: {
            default: null,
            type: cc.ProgressBar
        },
        progressBar5: {
            default: null,
            type: cc.ProgressBar
        },
        progressBar6: {
            default: null,
            type: cc.ProgressBar
        }
    },

    onLoad() {
        this.initData();
        this.initPhysics();
        this.initLauncher();
        // this.newBullet();
    },

    start() {
        this.schedule(function () {
            this.newBullet();
        }, 3);
    },

    //初始化数据
    initData() {
        //每个按钮血量进度条
        this.barArr = [];
        this.barArr[1] = this.progressBar1;
        this.barArr[2] = this.progressBar2;
        this.barArr[3] = this.progressBar3;
        this.barArr[4] = this.progressBar4;
        this.barArr[5] = this.progressBar5;
        this.barArr[6] = this.progressBar6;
        //初始每个按钮血量
        this.btnBloodArr = [];
        this.btnBloodArr[1] = 50;
        this.btnBloodArr[2] = 50;
        this.btnBloodArr[3] = 50;
        this.btnBloodArr[4] = 50;
        this.btnBloodArr[5] = 50;
        this.btnBloodArr[6] = 50;
        //每个按钮剩余血量
        this.btnNowBloodArr = [];
        //每次子弹击中按钮的掉血量
        this.stepBloodLoss = 1;
    },

    //初始化物理系统
    initPhysics() {
        var phyobj = cc.director.getPhysicsManager();
        phyobj.enabled = true;
        //设置重力加速度为0
        phyobj.gravity = cc.v2();
    },

    //初始化发射器
    initLauncher() {
        let launcherPrefab = cc.instantiate(this.launcherPrefab1);
        this.launcherNode.addChild(launcherPrefab);
        //设置发射器随机角度
        this.rotateNum = Math.random() * 360;
        let rotateAction = cc.rotateBy(0.5, this.rotateNum);
        this.launcherNode.runAction(rotateAction);
    },

    //卫星挡板旋转
    baffleCircleMove(dt) {
        //https://blog.csdn.net/Jff316948714/article/details/81193722
        // 先计算弧度
        this.radian += dt * (this.baffleSpeed / 100);
        // 顺时针旋转 x = 半径 * Math.sin(弧度) + 圆心的x坐标(逆时针则用cos)
        // 顺时针旋转 y = 半径 * Math.cos(弧度) + 圆心的y坐标(逆时针则用sin)
        let x = this.circleRadius * Math.sin(this.radian) + this.circleCenter.x;
        let y = this.circleRadius * Math.cos(this.radian) + this.circleCenter.y;
        //计算角度
        let angle = 180 / Math.PI * this.radian;
        this.baffleNode.angle = -angle;
        this.baffleNode.position = cc.v2(x, y);
    },

    //生成子弹相关属性
    newBullet() {
        let bulletPrefab = cc.instantiate(this.bulletPrefab);
        this.launcherNode.addChild(bulletPrefab);
        //为了让发射器挡住子弹
        bulletPrefab.zIndex = -10;
        this.bullutJs = bulletPrefab.getComponent('bullet');
        this.bullutJs.updateBulletAngle(this.rotateNum);
        this.bullutJs.shootBullet();
        this.bullutJs.game = this;
    },

    //碰撞减血
    collisionBloodLoss(collider) {
        let tag = collider.tag;
        if (this.barArr[tag]) {
            let nowBlood = this.btnNowBloodArr[tag] ? this.btnNowBloodArr[tag] : this.btnBloodArr[tag];
            this.btnNowBloodArr[tag] = nowBlood - this.stepBloodLoss;
            let progress = this.btnNowBloodArr[tag] / this.btnBloodArr[tag];
            //血量低于50%，变透明，且不再碰撞
            if (progress <= 0.5) {
                collider.node.opacity = 100;
                collider.enabled = false;
            }
            this.barArr[tag].progress = progress;
        }
    },

    update(dt) {
        this.baffleCircleMove(dt);
    },
});
