import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';

function ChatForm() {
    const [messages, setMessages] = useState([{"sender": "bot", "message": "hi!" }]);
    const [latestMessage, setLatestMessage] = useState("");
    const inputRef = useRef(null);
    const [botkey, setBotkey] = useState([]);
    const messagesEndRef = useRef(null)

    useEffect(() => {
        async function getBotKey() {
            const endpoint = "http://localhost:5000/bot/getkey"
            const data = await fetch(endpoint, {
                method: 'GET',
            }).then(
                res => res.json()
            ).then(response => {
                setBotkey(response["botkey"]);
            }
            )
        };
        getBotKey();
    } , []);

    function generateRSAKeyPair() {
        const p = generatePrime();
        const q = generatePrime();
    
        const n = p * q;
        const phi = (p - 1) * (q - 1);
    
        let e;
        do {
            e = Math.floor(Math.random() * (phi - 2)) + 2;
        } while (gcd(e, phi) !== 1);
    
        const d = modInverse(e, phi);
    
        return {
            publicKey: { e, n },
            privateKey: { d, n }
        };
    }
    
    function encryptRSA(message, publickey) {
        const [e, n ]= publickey;
        // console.log(message , publickey , e , n);

        const encryptedMessage = message.split('').map(char => {
            const charCode = char.charCodeAt(0);
            var t = BigInt(charCode) ** BigInt(e) % BigInt(n);
            return Number(t);
        });
        return encryptedMessage;
    }
    
    function decryptRSA(encryptedMessage, privateKey) {
        const { d, n } = privateKey;
        const decryptedMessage = encryptedMessage.map(charCode => {
            const decryptedCharCode = BigInt(charCode) ** BigInt(d) % BigInt(n);
            return String.fromCharCode(parseInt(decryptedCharCode));
        });
        return decryptedMessage.join('');
    }
    
    function generatePrime() {
        let num = Math.floor(Math.random() * 100) + 10;
        if (num % 2 === 0) {
            num++;
        }
        function isPrime(n) {
            if (n <= 1) return false;
            if (n <= 3) return true;
            if (n % 2 === 0 || n % 3 === 0) return false;
            for (let i = 5; i * i <= n; i += 6) {
                if (n % i === 0 || n % (i + 2) === 0) return false;
            }
            return true;
        }
        while (!isPrime(num)) {
            num += 2;
        }
        return num;
    }
    
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }
    
    function modInverse(a, m) {
        let [m0, x0, x1] = [m, 0, 1];
        while (a > 1) {
            const q = Math.floor(a / m);
            [a, m] = [m, a % m];
            [x0, x1] = [x1 - q * x0, x0];
        }
        return (x1 < 0) ? x1 + m0 : x1;
    }
    
    function handleInputChange(e) {
        e.preventDefault();
        setLatestMessage(e.target.value);
    }

    function handleInputSubmit(e) {
        e.preventDefault();
        var newMessages = [...messages];

        if (e.code === "Enter" || e.code === "NumpadEnter")  {
            newMessages.push({"sender": "user", "message": latestMessage });
        }
        else {
            newMessages.push({"sender": "user", "message": latestMessage });
        }
        inputRef.current.value = "";

        ask_bot(latestMessage , newMessages);

    }

    async function ask_bot(question , newMessages){
        const formData = new FormData()

        const { publicKey, privateKey } = generateRSAKeyPair();
        const encryptedMessage = encryptRSA(question, botkey);

        // console.log(encryptedMessage)

        formData.append('question', JSON.stringify(encryptedMessage));
        formData.append('userkey', JSON.stringify(publicKey));

        // console.log(formData)
        const endpoint = "http://localhost:5000/bot/ask"
        const data = await fetch(endpoint, {
            method: 'POST',
            body: formData,
        }).then(
            res => res.json()
                ).then(response =>
                    {
                        // console.log(response)
                        if (response["reply_status"] == "success"){
                            var answer = decryptRSA(response["answer"] , privateKey)
                            newMessages.push({"sender": "bot", "message": answer});
                            // console.log(newMessages)
                            setBotkey(response["botkey"])
                        }
                        setMessages(newMessages);
                    }
        )
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(()=>{
        scrollToBottom();
    } , [messages])

    return (
        <div>
            <div className='h-96'>
                <ChatContainer messages = {messages} msgendref = {messagesEndRef}/>
            <ChatInput inputref = {inputRef} onchange={handleInputChange} onsubmit={handleInputSubmit}/>
            </div>

        </div>
    )
}

export default ChatForm