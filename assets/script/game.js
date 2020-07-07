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
        }
    },

    onLoad() {
        this.initLauncher();
    },

    //初始化发射器
    initLauncher() {
        let launcherPrefab = cc.instantiate(this.launcherPrefab1);
        this.launcherNode.addChild(launcherPrefab);
    },

    // start() { },

    // update (dt) {},
});
