import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { Firestore, doc, getDoc, getFirestore } from "firebase/firestore";

function View() {
  const { board, view } = useParams();
  const boards = ["notice", "online", "qna", "gallery"];
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const postRef = doc(getFirestore(), board, view);
      const postSnapShot = await getDoc(postRef);
      if (postSnapShot.exists()) {
        setPost(postSnapShot.data());
      } else {
        setIsModal(true);
        setMessage("페이지가 없습니다.");
      }
    };
    fetchData();
  }, [board, view]);

  if (!boards.includes(board)) {
    return (
      <>
        {isModal && (
          <Modal
            error="해당 문서가 존재하지 않습니다."
            onClose={() => {
              setIsModal(false);
              navigate("/");
            }}
          ></Modal>
        )}
      </>
    );
  }

  if (isModal) {
    return (
      <Modal
        error={message}
        onClose={() => {
          setIsModal(false);
        }}
      ></Modal>
    );
  }

  if (!post) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <div>{post.title}</div>
      <div>{post.nickname}</div>
      <div>{post.timestamp.toDate().toLocaleDateString()}</div>
      <div>{post.view}</div>
      <div dangerouslySetInnerHTML={{__html: post.content}}></div>
      {/* 에디터로 작성했기 때문에 html 태그가 들어가서 HTML로 출력해주는 것이다 */}

      <Link to="/service/notice">목록</Link>
      <Link to="/write/notice">글쓰기</Link>
    </>
  );
}

export default View;
