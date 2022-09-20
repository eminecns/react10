
import React, { useState } from 'react';
import { Router, useHref } from 'react-router-dom';
import main from './dashboard_6';
import {useNavigate } from 'react-router-dom';

function Home() {
  const [token_alinan, settoken_alinan] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  
  let adres = "api/Tedes/Authenticate"
  let item = { userName, password}
  const Navigate =useNavigate();
  

  const denemeCagir = async () => {


    try {
      const response = await fetch(adres, {
        method: "POST",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
        mode: 'cors',
        referrerPolicy: "no-referrer-when-downgrade",
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        console.log("alınmadı");
        throw new Error(`error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log("alindi");
      
     // result = await result.json();
    
      console.warn("result", result)
      if(result.token.accessToken === null){
        console.log("sayfaya geçmedim")
      }else{
        console.log("geçtim")
       // action("/dashboard_2.html")
      //  Navigator.push("dashboard_2.html")
      localStorage.setItem("user",JSON.stringify(result));
      localStorage.setItem("token",JSON.stringify(result.token.accessToken));
      navigate("dashboard_6.html")
      //window.location.reload();


      
      }
    } catch (err) {
      alert('GİRİŞ BİLGİLERİ YANLIŞ')
      console.log(err.message);
    } finally {
      console.log("finally")
    }
  };

  return (
    <div>
      <div className="middle-box text-center loginscreen animated fadeInDown">
  <div>
    <div>
      <h1 className="logo-name">IN+</h1>
    </div>
    <h3>TETRA'YA HOŞGELDİNİZ</h3>
   
  
 
      <div className="form-group">
      <input type="text" placaholder="userName"
          onChange={(e) => setuserName(e.target.value)}
          className="form-control" placeholder="Username" required=""/>
      </div>
      <div className="form-group">
      <input type="password" placaholder="password"
          onChange={(e) => setpassword(e.target.value)}
          className="form-control"placeholder="Password" required="" />
      </div>
      <button onClick={denemeCagir} className="btn btn-primary">LOGİN</button>
      
    
    
  </div>
</div>


    </div>
  )

}

export default Home;