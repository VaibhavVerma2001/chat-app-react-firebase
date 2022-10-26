import React from 'react'

function Message() {
  return (
    <div className='message owner'>
      <div className="messageInfo">
        {/* image of user avatar */}
        <img src="https://images.mubicdn.net/images/cast_member/858117/cache-693877-1625615330/image-w856.jpg?size=800x" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>
        {/* for image that user will send */}
        <img src="https://images.mubicdn.net/images/cast_member/858117/cache-693877-1625615330/image-w856.jpg?size=800x" alt="" />
      </div>
    </div>
  )
}

export default Message;