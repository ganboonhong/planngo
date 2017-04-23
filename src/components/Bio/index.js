import React, { Component } from 'react';

var BioZh = React.createClass({
  render: function() {
    return (
      <div>
        <div className="wrapper">
          <div className="sidebar-wrapper">
            <div className="profile-container">
              <img className="profile" src="bio/images/profile.JPG" alt="profile" width="150px"/>
              <h1 className="name">顏文豐</h1>
              <h3 className="tagline">全端網頁工程師</h3>
            </div>{/*//profile-container*/}
            <div className="contact-container container-block">
              <ul className="list-unstyled contact-list">
                <li className="email"><i className="fa fa-envelope" /><a href="mailto: ganboonhong@gmail.com">ganboonhong@gmail</a></li>
                <li className="phone"><i className="fa fa-phone" /><a href="">(+65)8446 9360</a></li>
                <li className="website"><i className="fa fa-globe" /><a href="http://y-note.ddns.net/blog/2/9/1" target="_blank">http://y-note.ddns.net</a></li>
                <li className="github"><i className="fa fa-github" /><a href="https://github.com/ganboonhong" target="_blank">github.com/ganboonhong</a></li>
              </ul>
            </div>{/*//contact-container*/}
            <div className="education-container container-block">
              <h2 className="container-block-title">教育背景</h2>
              <div className="item">
                <h4 className="degree">農業經濟學系</h4>
                <h5 className="meta">國立臺灣大學</h5>
                <div className="time">2012 - 2015</div>
              </div>{/*//item*/}
            </div>{/*//education-container*/}
            <div className="languages-container container-block">
              <h2 className="container-block-title">善用語言</h2>
              <ul className="list-unstyled interests-list">
                <li>中文 <span className="lang-desc">(流利)</span></li>
                <li>英文 <span className="lang-desc">(中等)</span></li>
                <li>馬來文 <span className="lang-desc">(中等)</span></li>
              </ul>
            </div>{/*//interests*/}
            <div className="interests-container container-block">
              <h2 className="container-block-title">興趣</h2>
              <ul className="list-unstyled interests-list">
                <li>游泳</li>
                <li>籃球</li>
                <li>寫程式</li>
              </ul>
            </div>{/*//interests*/}
          </div>{/*//sidebar-wrapper*/}
          <div className="main-wrapper">
            <a href="/">
                <section className="summary-section">
                  <h2 className="section-title"><i className="fa fa-language" /></h2>
                </section>{/*//section*/}
            </a>

            <section className="section summary-section">
              <h2 className="section-title"><i className="fa fa-user" />職業發展</h2>
              <div className="summary">
                <p>
                大學畢業前曾在臺灣一間網頁設計公司實習，畢業後即轉為正職。當時工作內容主要負責維護現有專案，
                以及協助其他程式設計師開發新專案。我目前正在新加坡工作，主要負責不同客戶ERP系統的部份模組、回覆客戶在諮詢系統中所提出的疑問及需求、
                並針對一些設計較複雜的功能進行人工測試以確保系統的穩定性。
                在一個節奏快速的工作環境裡，我必須不斷找出更有效率的方式來處理問題，而我相信，與其使用臨時的解決方案來解決問題，花時間找出問題源頭才是解決的根本之道。
                </p>
              </div>{/*//summary*/}
            </section>{/*//section*/}
            <hr />
            <section className="section experiences-section">
              <h2 className="section-title"><i className="fa fa-briefcase" />工作經驗</h2>

              <hr />

              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">全端網頁設計師</h3>
                    <div className="time">2016 - 現在</div>
                  </div>{/*//upper-row*/}
                  <div className="company">新加坡</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    我目前使用 Cakephp 和 jQuery 來開發多家公司的 ERP 系統。
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}

              <hr />

              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">Microsoft-Intel IoT Hackathon</h3>
                    <div className="time">2016 Dec. 15 - 16</div>
                  </div>{/*//upper-row*/}
                  <div className="company">新加坡</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    我們的團隊在此次 Hackathon中，從印尼和泰國的隊伍中脫穎而出，得到了冠軍。
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}

              <hr />


              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">全端網頁設計師</h3>
                    <div className="time">2015 - 2016</div>
                  </div>{/*//upper-row*/}
                  <div className="company">台北, 台灣</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    使用PHP語言及jQuery來開發一些内容管理系统(CMS)及客製化的電商網站。
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}

              <hr />

              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">打工旅遊</h3>
                    <div className="time">2013 Jul. - Sep.</div>
                  </div>{/*//upper-row*/}
                  <div className="company">俄亥俄州, 美國</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    曾在2013年曾到美國俄亥俄州參加打工旅遊計畫。
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}
            </section>{/*//section*/}

            <hr />

            <section className="section projects-section">
              <h2 className="section-title"><i className="fa fa-archive" />個人專案</h2>
              <hr />

              <div className="item">
                <p><span className="project-title"><a href="http://demowebsite.ddns.net:9000/order" target="_blank">銷售時點情報系統(POS) (專案仍在進行中)</a></span></p>
                <p>我使用 Node.js 作為後端的語言，  React 作為前端的語言，來為一家攝影社建置一個銷售時點情報系統(POS)。</p>
                <p>他們能夠使用此系統</p>
                <ul>
                    <li>紀錄客戶訂單的流水號以及訂單總金額</li>
                    <li>列印PDF發票</li>
                </ul>                
                <p><b>網站:</b> <a href="http://demowebsite.ddns.net:9000/order" target="_blank">demowebsite.ddns.net:9000/order</a></p>
                <p><b>源碼:</b> <a href="https://github.com/ganboonhong/planngo" target="_blank">github.com/ganboonhong/planngo</a></p>
                <p><b>教學影片:</b> <a href="https://www.youtube.com/watch?v=X6q-tYV0G-Y&feature=em-upload_owner" target="_blank">youtube.com/watch?v=X6q-tYV0G-Y&feature=em-upload_owner</a></p>
                <span className="project-tagline">
                </span>
              </div>{/*//item*/}

              <hr />

              <div className="item">
                <p><span className="project-title"><a href="http://y-note.ddns.net/blog/2/9/1" target="_blank">個人部落格</a></span></p>
                <p>我使用PHP (Laravel)作為後端處理API的語言，React作為開發前端的語言來建置一個部落格(單頁應用程式, SPA)來記錄我開發過程中所學的要點</p>
                <p><b>網站:</b> <a href="http://y-note.ddns.net" target="_blank">y-note.ddns.net</a>
                    <span style={{'marginLeft': '20px' }}>(<b>使用者名稱</b>: ganboonhong@gmail.com</span> 
                    <span style={{'margin': '0px 5px 0px 5px' }}> <b>/</b> </span>    
                    <span style={{'marginLeft': '10px' }}> <b>密碼</b>: 111111)</span>
                </p>
                <p><b>源碼:</b> <a href="https://github.com/ganboonhong/ynote" target="_blank">github.com/ganboonhong/ynote</a></p>
                <span className="project-tagline">
                </span>
              </div>{/*//item*/}

              <hr />
              
            </section>{/*//section*/}
            <section className="skills-section section">
              <h2 className="section-title"><i className="fa fa-rocket" />程式語言</h2>
              <div className="skillset">        
                <div className="item">
                  <h3 className="level-title">React</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="70%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}
                <div className="item">
                  <h3 className="level-title">jQuery</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="85%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}
                <div className="item">
                  <h3 className="level-title">Node.js</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="60%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}
                <div className="item">
                  <h3 className="level-title">HTML &amp; CSS</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="60%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}
                <div className="item">
                  <h3 className="level-title">Laravel</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="50%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}
                <div className="item">
                  <h3 className="level-title">Cakephp</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="80%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}

                <div className="item">
                  <h3 className="level-title">GIT</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="70%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}

                <div className="item">
                  <h3 className="level-title">UNIX</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="65%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}

                <div className="item">
                  <h3 className="level-title">MYSQL</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="75%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}
              </div>  
            </section>{/*//skills-section*/}
          </div>{/*//main-body*/}
        </div>
        <footer className="footer">
          <div className="text-center">
            {/*/* This template is released under the Creative Commons Attribution 3.0 License. Please keep the attribution link below when using for your own project. Thank you for your support. :) If you'd like to use the template without the attribution, you can check out other license options via our website: themes.3rdwavemedia.com * /*/}
            <small className="copyright">Designed with <i className="fa fa-heart" /> by <a href="http://themes.3rdwavemedia.com" target="_blank">Xiaoying Riley</a> for developers</small>
          </div>{/*//container*/}
        </footer>{/*//footer*/}
        {/* Javascript */}          
        {/* custom js */}
        {/* Carbonads (demo only) */}
      </div>
    );
  }
});

class Bio extends Component {
  render() {
    return <BioZh />;
  }
}

export default Bio;