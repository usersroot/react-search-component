import React, { Component } from 'react'


export default class WriteUserIpt extends Component {
  constructor(props) {
    super(props)
  }
  render () {

    let { changeValue, changeBorder } = this.props
    return (
      < div className="writeuseript" >
        <input type="text" className="write_ipt" onBlur={changeValue} onFocus={changeBorder} />
      </div >
    )
  }
}





