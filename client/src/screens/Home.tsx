import React, { useState } from 'react'
import Axios from 'axios';

const Home = () => {
    const [email, setEmail] = useState<string>('')
    const [createNum, setCreateNum] = useState<string>('')
    const [verifyNum, setVerifyNum] = useState<string>('')

    const sendvalue = () => {
        if(!email) {
            alert('이메일을 입력해주세요.');
            return false;
        } else {
            let str = ''
            for (let i = 0; i < 8; i++) {
              str += Math.floor(Math.random() * 10)
            }
            setCreateNum(str);
            Axios.post('http://localhost:3001/send', {
                email,
                value: str
            }) 
        }

    }

    const checkVerify = () => {
        if(createNum === verifyNum) {
            window.location.replace("/Ok")
        } else {
            alert('인증번호를 다시 확인해주세요.')
            return false
        }
    }

    return (
        <div>
            <div>
                <label>이메일을 적으세요</label>
                {createNum}
                <br/>
                <input
                    type="text"
                    onChange={(e) => {
                    setEmail(e.target.value);
                    }}
                    maxLength={20}
                />
            </div>
            <button onClick={() => sendvalue()}>이메일인증</button>
            <div>
                <label>받은 인증번호를 적어주세요.</label><br/>
                <input
                    type="text"
                    onChange={(e) => {
                    setVerifyNum(e.target.value);
                    }}
                />
            </div>
            <button onClick={() => checkVerify()}>회원가입</button>
        </div>
    )
}

export default Home
