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
        this.initLauncher();
        this.setBullet();
    },

    //初始化发射器
    initLauncher() {
        let launcherPrefab = cc.instantiate(this.launcherPrefab1);
        this.launcherNode.addChild(launcherPrefab);
    },

    //设置子弹相关属性
    setBullet() {
        let bulletPrefab = cc.instantiate(this.bulletPrefab);
        this.launcherNode.addChild(bulletPrefab);
        //为了让发射器挡住子弹
        bulletPrefab.zIndex = -10;
        //
    },

    // start() { },

    // update (dt) {},
});
