cc.Class({
    extends: cc.Component,

    properties: {
        launcherNode: {
            default: null,
            type: cc.Node
        },
        launcherPrefab1: {
            default: null,
            type: cc.Prefab
        },
        bulletPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    onLoad() {
        this.initPhysics();
        this.initLauncher();
        this.newBullet();
    },

    start() {
        this.schedule(function () {
            this.newBullet();
        }, 2);
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
    },

    //生成子弹相关属性
    newBullet() {
        let bulletPrefab = cc.instantiate(this.bulletPrefab);
        this.launcherNode.addChild(bulletPrefab);
        //为了让发射器挡住子弹
        bulletPrefab.zIndex = -10;
        this.bullutJs = bulletPrefab.getComponent('bullet');
        this.bullutJs.updateBulletAngle();
        this.bullutJs.shootBullet();
    },

    // update (dt) {},
});
