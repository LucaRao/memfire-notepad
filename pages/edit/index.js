
var app = getApp();
Page({
    data: {
        item: {
            key: "",
            value: "",
            title:"",
            create_time: "",
            update_time: "",
            state: 1
        },
        isNew: false,
        focus: true
    },

    /**
     * 页面首次加载事件
     */
    onLoad: function(options) {
        var item = this.data.item;
        item.id = options.id;
        this.setData({
            item: item
        });
    },

    /**
     * 页面渲染事件
     */
    onShow: function() {
        this.loadData(this.data.item.id);        
    },
    
    /**
     * 保存数据事件
     */
    onSubmit: function(event) {
        var item = this.data.item;
        item.title = event.detail.value.title;
        item.value = event.detail.value.value;
        item.update_time = new Date()
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
        this.setData({
            item: item
        });
        app.upsateStore(this.data.item, function(res) {
            if (res) {
              wx.showToast({
                title: "修改成功",
                icon: 'success',
            })
            setTimeout(function () {
            //返回首页
            wx.navigateBack();
            }, 2000)
            } else {
                wx.showToast({
                    title: "保存失败"
                });
            }
        });
    },

    /**
     * 删除记事本事件
     */
    onDelete: function(event) {
        app.destroy(this.data.item, function(res) {
            if (res) {
                wx.showToast({
                    title: "删除成功",
                    icon: 'success',
                })
                setTimeout(function () {
                //返回首页
                wx.navigateBack();
                }, 2000)
  
            } else {
                wx.showToast({
                    title: "删除失败"
                });
            }
        });
    },

    /**
     * 获取数据
     */
    loadData: function(key) {
        var that = this;
        app.show(this.data.item.id, function(res) {
            that.setData({
                item: res
            });
        });
    }
});