
//获取应用实例
const app = getApp();
Page({
  data: {
    phoneVal: '',
    codeVal: '',
    checkVal: false,
    isHideError: false,
    errorText: '',
    unionId: '',
    getmsg: '',
    isShow: true
  },
  onLoad: function (options) {
    wx.login({
      success: function (res) {
        var code = res.code; 
        var that=this;
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
              data:{
                code: code,
                appid: 'wx1e7e5cd5b7138be5',
                secret: 'b452530eaa8c14cfc1202e196caff27e',
                grant_type: 'authorization_code'
              },
              success: function(data){
                console.log(data.data.errmsg);
                  /*that.setData({
                    unionId:data.unionid
                  })*/
              }
            })
            }
          })
        }
      }
    })
  },
  //协议
  onNavTo: function (e) {
    wx.navigateTo({
      url: '../edaixi_agreement/edaixi_agreement'
    })
  },
  //手机号
  onTelInput: function (e) {
    var telNum = e.detail.value;
    this.setData({
      phoneVal: telNum
    })

  },
  //验证码
  onCodeInput: function (e) {
    this.setData({
      codeVal: e.detail.value
    })
  },
  //获取验证码
  bindBtnCode: function (e) {
    var phoneVal = this.data.phoneVal;
    var telReg = /^1\d{10}$/;

    if (phoneVal == '') {
      this.setData({
        isHideError: true,
        errorText: '手机号不能为空'
      })
    } else if (!telReg.test(phoneVal)) {
      this.setData({
        isHideError: true,
        errorText: '请填写正确的手机号'
      })
    } else {
      this.setData({
        isHideError: false,
        errorText: ''
      })
      this.showCount();
      wx.request({
        url: 'http://third.edaixi.com/webank/sendCode',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          phone: phoneVal
        },
        dataType: 'json',
        success: function (res) {
        }

      })
    }
  },
  //同意
  onCheckbox: function (e) {
    this.setData({
      checkVal: !e.target.dataset.checks
    })

  },
  //倒计时
  showCount: function (e) {
    var countdown = 60;
    var that = this;
    var setTimer = setInterval(function () {
      if (countdown == 0) {
        that.setData({
          isShow: true,
          getmsg: ''
        })
        countdown = 60;
        clearInterval(setTimer);
      } else {
        that.setData({
          isShow: false,
          getmsg: countdown + 's后重新发送'
        })
        countdown--;
      }
    }, 1000)

  },
  //form提交
  onSubmitForm: function (e) {
    var phoneVal = this.data.phoneVal;
    var codeVal = this.data.codeVal;
    var checkVal = this.data.checkVal;
    var telReg = /^1\d{10}$/;
    if (phoneVal == '') {
      this.setData({
        isHideError: true,
        errorText: '手机号不能为空'
      })
      return false;
    } else if (!telReg.test(phoneVal)) {
      this.setData({
        isHideError: true,
        errorText: '请填写正确的手机号'
      })
      return false;
    } else if (codeVal == '') {
      this.setData({
        isHideError: true,
        errorText: '验证码不能为空'
      })
      return false;
    } else if (checkVal == false) {
      this.setData({
        isHideError: true,
        errorText: '请点击我已阅读同意'
      })
      return false;
    } else {
      this.setData({
        isHideError: false,
        errorText: ''
      })
      wx.request({
        url: 'http://third.edaixi.com/webank/sendCode',
        data: {
          phone: phoneVal,
          code: codeVal,
          unionid:unionid
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        dataType: 'json',
        success: function (res) {
          console.log(11)
        }
      })

    }

  },

})
