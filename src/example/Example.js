import React, { useEffect, useState } from "react";

function Example() {
 
//* async/await
  /* 

  TODO    async/await - 약속의 결과를 기다릴 떄 사용하는 문법.

  async - 함수에만 붙을 수 있다 + function 앞에 사용
 
  await - async 내에서만 사용 가능 / 단독으로 불가능 - 프로미스가 실행이 완료되기 전까지는 실행되지 않는다.
  
  async 사용시 promise 오브젝트가 자동 반환

  async - promise - then 사용 가능 > 실무 작업에서는 try / catch 문을 많이 사용한다.

  * fetch - 함수 사용시 Promise를 반환 > then / catch 사용할 수 있다.

  * then - 성공 되었을 때 실행
  * catch - 실패 했을 때 실행
  * finally - 마지막에 완료가 되면 실행 (성공이던 실패던 둘 다 실행)

  * try - 오류가 발생할 가능성이 있는 코드를 작성
  * catch - 만약 try문에서 실패(오류)가 있다면 해당 함수가 실행
  * finally - 마지막에 완료가 되면 실행 (성공이던 실패던 둘 다 실행)

  */

//* PROMICE
  /*

  TODO    Promise - 어떤 값을 반환하거나 오류를 던질거라는 약속!

       성공을 실패로 돌리거나 대기로 돌릴 수 없다.

  Promise - 3가지 상태가 존재한다.

  ?   pending - 대기
  *   resolved - 성공 
  !   refected - 실패

  */

// const [isList, setIsList] = useState();

//     useEffect(()=>{
//         fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
//         .then(res => res.json())
//         .then(data => setIsList(data))
//         .catch(error => console.log(error))
//         .finally(()=>{console.log("데이터 요청 완료")})
//     }, [])


async function FetchData2(){
}

const FetchData = async()=>{
    try{
        let res = await fetch("https://jsonplaceholder.typicode.com/photos?albumId=1");
        console.log(res);
        let data = await res.json();
        console.log(data)
    }catch(error){
        console.log(error);
    }finally{
        console.log("데이터 요청끝")
    }
}
FetchData()




//   let data = new Promise(function (resolved, rejected) {
//     let value = [
//       {
//         name: "홍길동",
//         age: "1살",
//       },
//     ];
//     if (1 + 1 === 2) {
//       //* 위 조건이 만족했다면 성공 메세지가 뜰 것.
//       resolved(value.name);
//     } else {
//       //! 위 조건이 틀렸다면 실패 메세지가 뜰 것.
//       rejected();
//     }
//   });


//   data
//     .then(function (res) {
//       //* 성공 메세지
//       console.log("성공함");
//     })
//     .catch(function () {
//       //! 실패 메세지
//       console.log("오류가 뜸");
//     });


//   let data_2 = new Promise(function (resolved, rejected) {
//     let value = "테스트";
//     if (1 + 1 === 2) {
//       setTimeout(() => {
//         resolved(value);
//       }, 1000);
//     } else {
//       rejected();
//     }
//   });
//   console.log(data_2);


//   data_2
//     .then(function (res) {
//       //* 성공 메세지
//       console.log("테스트 성공함");
//     })
//     .catch(function () {
//       //! 실패 메세지
//       console.log("테스트 오류가 뜸");
//     });

// useEffect(()=>{
//     let imgLoading = new Promise(function(resolved, rejected){  
//         document.querySelector("#img").addEventListener("load", function(){
//             resolved()
//         })
//     })
    
//     imgLoading.then(function(){
//         // alert("이미지 로딩 성공")
//     }).catch(function(){
//         // alert("이미지 로딩 실패")
//     })
// },[])

  return (
  <div>
    {/* {
        // ? 데이터가 왔을 때만 띄우기 위해서 isList &&을 써준다!
        isList && isList.map((e,i) => {
            return(
                <img src={e.url} alt={e.title} />
            )
        })
    } */}
  </div>
  );
}

export default Example;
