// pages/form/form.js
Page({

  data: {
  
  },
  onBindChange:function(event){
    console.log(event.detail.value);
  },
  onRadioChange: function (event) {
    console.log(event.detail.value);
  },
  onCheckBoxChange: function (event) {
    console.log(event.detail.value);
  },
  formSubmit: function (event) {
    console.log('form发生了submit事件，携带数据为：',event.detail.value);
  },
  formReset: function (event) {
    console.log('form发生了reset事件，携带数据为：',event.detail.value);
  },
  onLoad: function (options) {
  
  },

 
})