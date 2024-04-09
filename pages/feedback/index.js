
var app = getApp();
Page({
  data: {
    content: ""
  },
  onSubmit: function (event) {
    if (!event.detail.value.content) {
      wx.showToast({
        title: "请填写反馈内容"
      });
      return;
    }

    var that = this;
    this.setData({
      content: event.detail.value.content
    })
    app.feedback({ content: that.data.content, user_id: app.globalData.userInfo.id }, function (res) {
      if (res) {
        wx.showToast({
          title: "提交成功"
        });
        //返回首页
        wx.navigateBack();
      } else {
        wx.showToast({
          title: "提交失败"
        });
      }
    });
  }
})
