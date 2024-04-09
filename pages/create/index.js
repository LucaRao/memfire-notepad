
var app = getApp();
Page({
    data: {
        item: {
            value: "",
            title:"",
            state: 1
        },
        isNew: false,
        focus: true
    },

    /**
     * 页面渲染事件
     */
    onShow: function() {
        var item = this.data.item;
        this.setData({
            item: item
        });
    },

    /**
     * 保存数据事件
     */
    onSubmit: function(event) {
        console.log(event)
        var item = this.data.item;
        item.title = event.detail.value.title;
        item.value = event.detail.value.value;
        this.setData({
            item: item
        });
        this.saveData();
    },

    /**
     * 请求服务器保存数据
     */
    saveData: function() {
        var item = this.data.item;
        item.user_id = app.globalData.userInfo.id
        this.setData({
            item: item
        });
        app.store(this.data.item, function(res) {
            if (res) {
                wx.showToast({
                    title: "保存成功"
                });
                //返回首页
                wx.navigateBack();
            } else {
                wx.showToast({
                    title: "保存失败"
                });
            }
        });
    }
});