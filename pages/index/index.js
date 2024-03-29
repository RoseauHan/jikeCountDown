//index.js
//获取应用实例
const app = getApp()
const api = require('../../utils/util.js')

Page({
    data: {
        nickName: '',
        avatarUrl: '',
        isCanDraw: false,

        click: 0,
        clickKind: {
            0: 'nb',
            1: '绝了',
            2: '学习了'
        },
        clickTotalTime: 0,

        clickgg: 0,
        clickggkind: {
            0: '勿扰本大王！',
            1: '喵喵喵',
            2: '喜欢本大王？'
        },
        clickggTime: 0
    },

    getUserInfo(e) {
        this.setData({
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl
        })
        wx.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl)
        wx.setStorageSync('nickName', e.detail.userInfo.nickName)
    },

    createShareImage() {
        this.setData({
            isCanDraw: !this.data.isCanDraw
        })
    },

    motto: function() {
        console.log(this.data.clickTotalTime)
        if (this.data.clickTotalTime > 20) {
            wx.showModal({
                title: 'Thanks',
                content: 'thanks for being addicted!',
                showCancel: false
            })
            this.setData({
                clickTotalTime: 0
            })
        } else {
            var title = this.data.clickKind[this.data.click]
            wx.showToast({
                title: title,
                duration: 600,
                image: '/img/jike.png'
            })
            this.setData({
                click: (this.data.click + 1) % 3,
                clickTotalTime: this.data.clickTotalTime + 1
            })
        }
    },

    clickguoguo: function() {
        console.log(this.data.clickggTime)
        if (this.data.clickggTime > 10) {
            wx.showModal({
                title: '喜欢我吗',
                content: 'Jellow一下？',
                showCancel: false
            })
            this.setData({
                clickggTime: 0
            })
        } else {
            var title = this.data.clickggkind[this.data.clickgg]
            wx.showToast({
                title: title,
                duration: 600,
                image: '/img/cat.png'
            })
            this.setData({
                clickgg: (this.data.clickgg + 1) % 3,
                clickggTime: this.data.clickggTime + 1
            })
        }
    },

    onShareAppMessage: function() {
        return {
            title: '今天即刻恢复更新了吗？',
            desc: '',
            imageUrl: '/img/share.png',
            path: '/pages/index/index'
        }
    },

    onLoad() {
        this.setData({
            nickName: wx.getStorageSync('nickName') || '',
            avatarUrl: wx.getStorageSync('avatarUrl') || ''
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        var dateDiff = api.TodayInfo("2019/7/12");
        // 获取当前日期
        var date = new Date();

        // 获取当前月份
        var nowMonth = date.getMonth() + 1;

        // 获取当前是几号
        var strDate = date.getDate();

        // 添加分隔符“-”
        var seperator = "/";

        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }

        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }

        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        var nowDate = nowMonth + seperator + strDate;
        this.setData({
            dateDiff: dateDiff.dateDiff
        })
        wx.setStorageSync('dateDiff', String(dateDiff.dateDiff))
        wx.setStorageSync('date', nowDate)
    }
})