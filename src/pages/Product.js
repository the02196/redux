import React, { memo }  from 'react'

const Product = memo(function(){
    
    console.log("Product 실행")
  
/*
    main에 프로덕트 컴포넌트가 import, 그리고 출력 되어있다.
    메인에서 onClick={()=>{setCount(count + 1)}}을 누르면 Product 함수 내부에 있는
    console.log()가 작동하는 것을 알 수 있다.
    memo를 쓰면 재렌더링 되었을 떄 실행되는 것을 막을 수 있다.
    성능 개선을 위해 사용한다.
*/

    return (
    <div>Product</div>
  )
})

export default Product