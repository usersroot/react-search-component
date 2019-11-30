import React from 'react'

const ClickBtn = (props) => {

  let { getSearch, clearIptVal } = props
  return (
    <div className="clickbtn">
      <button onClick={getSearch} className="commit_btn">提交</button>
      <button onClick={clearIptVal} className="clear_btn">清空</button>
    </div>
  )
}
export default ClickBtn
/*
*****************************  作者：米斯特胡   Mrhu1215@163.com  **********************************
*/