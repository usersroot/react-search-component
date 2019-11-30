import React, { Component } from 'react'
import './index.scss'
import ClickBtn from './ClickBtn/index'
import WriteUserIpt from './WriteUserIpt'


export default class KeyValueSearch extends Component {

  state = {
    write_ipt_val: [{//用保存用户输入的键值对，id可以用作唯一的key
      id: 1,
      text: 'key=val'
    }],
    iptFlag: false,//输入框显示开关
    edit_text: ''//修改以后用户输入的键值对
  }
  removeShowtext = (index) => {//删除键值对方法
    this.setState(this.state.write_ipt_val.splice(index, 1))
  }
  disNone = (index) => {//对span标签隐藏方法
    document.querySelector(`.userdel_i${index}`).style.display = 'none'//通过给没一个标签加上一个不一样的类名进行区分
    document.querySelector(`.usertext_i${index}`).style.display = 'none'
    let ipt = document.querySelector(`.useript_edit${index}`)
    ipt.style.display = 'inline-block'
    ipt.value = this.state.write_ipt_val[index].text//给input赋值
  }
  editIptVal = (index) => {
    // console.log(this)
    this.state.write_ipt_val[index].text = this.state.edit_text//将用户输入的值保存到状态里的text
    let reg = /^(.+)=(.+)$///正则验证输入格式
    let regArr = this.state.edit_text.match(/=/g)//验证输入格式，用match检测=符的个数
    // console.log(regArr)
    if (reg.test(this.state.edit_text) && regArr.length === 1) {//只用两个全部通过验证的时候才可以修改
      document.querySelector(`.userdel_i${index}`).style.display = 'inline-block'
      document.querySelector(`.usertext_i${index}`).style.display = 'inline-block'
      document.querySelector(`.useript_edit${index}`).style.display = 'none'
      this.setState({
        write_ipt_val: this.state.write_ipt_val
      })
    } else {
      document.querySelector(`.useript_edit${index}`).style.borderColor = 'red'
    }
  }
  getVal = (e) => {
    this.setState({
      edit_text: e.target.value//保存原文本到组件的状态中
    })
  }
  renderIptVal = () => {//渲染输入数据
    return this.state.write_ipt_val.map((item, index) => {
      return (
        < span key={item.id}
          className='showipttext'
        >
          <i className={'usertext_i' + index} onClick={() => { this.disNone(index) }}>{item.text} </i >
          <i onClick={() => { this.removeShowtext(index) }} className={'userdel_i' + index}> × </i>
          <input type='text' style={{ display: "none" }} className={'useript_edit' + index} onBlur={() => { this.editIptVal(index) }} onFocus={this.getVal} onChange={this.getVal} />
        </span >)
    })
  }
  changeIptFlag = () => {
    this.setState({
      iptFlag: !this.state.iptFlag
    })
  }
  sort = (arr) => {//对数组中的id进行排序，然后得到下一个id的值
    return arr.sort(function (a, b) {
      return b.id - a.id;
    })
  }
  changeValue = (e) => {
    let reg = /^(.+)=(.+)$/
    let regArr = e.target.value.match(/=/g)
    console.log(regArr)
    if (reg.test(e.target.value) && regArr.length === 1) {//只用两个全部通过验证的时候用户输入的键值对才会被存入到状态中
      let ids = this.sort(this.state.write_ipt_val)[0] ? this.sort(this.state.write_ipt_val)[0].id + 1 : 0
      this.state.write_ipt_val.push({
        id: ids,
        text: e.target.value
      })
      this.sort(this.state.write_ipt_val)
      this.changeIptFlag()
      this.setState({
        write_ipt_val: this.state.write_ipt_val
      })
    } else {
      document.querySelector('.write_ipt').style.borderColor = 'red'
    }

  }
  changeBorder = () => {
    document.querySelector('.write_ipt').style.borderColor = '#ccc'
  }
  clearIptVal = () => {//清除所有数据
    this.setState({
      write_ipt_val: []
    })
  }
  getSearch = () => {//类似请求，后期直接替换console.log即可
    if (this.state.write_ipt_val.length !== 0) {
      console.log({
        "target": "es6",
        "framework": "react"
      })
    } else {
      alert('搜索数据不能为空')
    }
  }
  render () {
    let { iptFlag } = this.state
    return (
      <div className="keyvaluesearch">
        <label htmlFor="自定义搜索项" id="search_box">
          <span>自定义搜索项：</span>
          <div className="list_box">
            {this.renderIptVal()}
          </div>
          {iptFlag ? <WriteUserIpt changeValue={this.changeValue} changeBorder={this.changeBorder} className="addipt" /> : <button onClick={this.changeIptFlag} className="addbtn"> + 添加</button>}
        </label>
        <ClickBtn clearIptVal={this.clearIptVal} getSearch={this.getSearch} />
      </div>
    )
  }
}

