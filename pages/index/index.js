
var app = getApp();
import {
  supabase
} from '../../lib/supabase'
Page({
  data: {
    items: [],
  },

  /**
   * 首次渲染事件
   */
  onShow: async function() {
    const that = this;
    that.setData({
      items: []
    });
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
      that.onLoadData();
    }else{
      wx.login({
        success:async function (res) {
              const { data:{user}, error } = await supabase.auth.signInWithWechat({code:res.code})
              app.globalData.userInfo = user;
              that.onLoadData();
        }
      })
    }
    
  },

  /**
   * 新增笔记事件
   */
  onNewItem: function(event) {
    wx.navigateTo({
      url: "../create/index"
    })
  },

  /**
   * 编辑笔记事件
   */
  onEditItem: function(event) {
    wx.navigateTo({
       url: '../edit/index?id=' + event.currentTarget.dataset.id
    })
  },

  /**
   * 获取数据事件
   */
  onLoadData: function() {
    var that = this;
    app.getItems(function(items) {
      that.setData({
        items: items
      });
    });
  },

  /**
   * 下拉刷新事件, 数据同步
   */
  onPullDownRefresh: function() {
    wx.showToast({
      title: '正在同步数据',
      icon: 'loading'
    });

    app.getItems(function(items) {
      that.setData({
        items: items
      });
    });
  
  },

})
