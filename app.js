
import {
  supabase
} from './lib/supabase'
import { formatTime } from './utils/util';
App({

  /**
   * 启动事件
   */
  onLaunch: function () {
  },

  /**
   * 获取所有数据
   */
  getItems: async function (cb) {
        let { data: notepad_list, error } = await supabase
          .from('notepad_list')
          .select('*')
        if (notepad_list.length > 0) {
          notepad_list.forEach(item => {
            item.create_time = formatTime(item.create_time);
            item.update_time = formatTime(item.update_time);
            item.state = 2;
            return typeof cb == 'function' && cb(notepad_list);
          })
        }else{
          return typeof cb == 'function' && cb([]);
        }
    
  },

  /**
   * 获取指定的value
   */
  show: function (id, cb) {
    this.getItems(function (items) {
      items.forEach(function (item) {
        if (item.id == id) {
          return typeof cb == 'function' && cb(item);
        }
      });
      if (items.length == 0) {
        return typeof cb == 'function' && cb(false);
      }
    });
  },

  /**
   * 新增数据
   */
  store:  function (item, cb) {
    var that = this;
    this.getItems(async function (items) {
        const { data, error } = await supabase
          .from('notepad_list')
          .insert([item])
          .select()
        if (data) {
          item.create_time = formatTime(item.create_time);
          item.update_time = formatTime(item.update_time);
          var isNew = true;
          items.forEach(function (oldItem, index, arr) {
            if (oldItem.key == item.key) {
              arr[index] = item;
              isNew = false;
            }
          });
          if (isNew) {
            items.push(item);
            items.sort(function (a, b) {
              return a.create_time < b.create_time;
            });
          }
          return typeof cb == 'function' && cb(true);
        }
      

    });
  },
    /**
   * 反馈
   */
  feedback:  async function (item, cb) {
      const { data, error } = await supabase
      .from('feedback')
      .insert([
        item
      ])
      .select()
        if (data) {
          return typeof cb == 'function' && cb(true);
        }
      

  },
  /**
   * 修改数据
   */
  upsateStore:  function (item, cb) {
    var that = this;
    this.getItems(async function (items) {
        const { data, error } = await supabase
          .from('notepad_list')
          .update([item])
          .eq("id",item.id).select()
        if (data) {
          item.create_time = formatTime(item.create_time);
          item.update_time = formatTime(item.update_time);
          var isNew = true;
          items.forEach(function (oldItem, index, arr) {
            if (oldItem.key == item.key) {
              arr[index] = item;
              isNew = false;
            }
          });
          if (isNew) {
            items.push(item);
            items.sort(function (a, b) {
              return a.create_time < b.create_time;
            });
          }
          return typeof cb == 'function' && cb(true);
        }
      

    });
  },
  /**
   * 删除数据
   */
  destroy:  function (item, cb) {
    this.getItems(async function (items) {
        const { error } = await supabase
        .from('notepad_list')
        .delete()
        .eq('id', item.id)
        items.forEach(function (oldItem, index, arr) {
          if (oldItem.key == item.key) {
            oldItem.state = 3;
            return typeof cb == 'function' && cb(true);
          }
        });
     
    });
  },

  /**
   * 全局变量
   */
  globalData: {
    userInfo:null,
  }
})