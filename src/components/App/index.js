import React, { Component } from 'react';
import './style.scss';
var Bio = React.createClass({
  render: function() {
    return (
      <div>
        <div className="wrapper">
          <div className="sidebar-wrapper">
            <div className="profile-container">
              <img className="profile" src="bio/images/profile.JPG" alt="profile" width="150px"/>
              <h1 className="name">Francis</h1>
              <h3 className="tagline">Full Stack Developer</h3>
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
              <h2 className="container-block-title">Education</h2>
              <div className="item">
                <h4 className="degree">Agricultural Economics</h4>
                <h5 className="meta">National Taiwan University</h5>
                <div className="time">2012 - 2015</div>
              </div>{/*//item*/}
            </div>{/*//education-container*/}
            <div className="languages-container container-block">
              <h2 className="container-block-title">Languages</h2>
              <ul className="list-unstyled interests-list">
                <li>Chinese <span className="lang-desc">(Native)</span></li>
                <li>English <span className="lang-desc">(Intermediate)</span></li>
                <li>Malay <span className="lang-desc">(Intermediate)</span></li>
              </ul>
            </div>{/*//interests*/}
            <div className="interests-container container-block">
              <h2 className="container-block-title">Interests</h2>
              <ul className="list-unstyled interests-list">
                <li>Swimming</li>
                <li>Playing Basketball</li>
                <li>Coding</li>
              </ul>
            </div>{/*//interests*/}
          </div>{/*//sidebar-wrapper*/}
          <div className="main-wrapper">
            <a href="/zh">
                <section className="summary-section">
                  <h1 className="section-title"><i className="fa fa-language" /></h1>
                </section>{/*//section*/}
            </a>
            <section className="section summary-section">
              <h2 className="section-title"><i className="fa fa-user" />Career Profile</h2>
              <div className="summary">
                <p>
                I  was an intern at a web design company during the last semester in National Taiwan University, and I joined the company after graduated. 
                I was in charge of maintaining the existing projects and assisting senior developers for new projects. In my current company in Singapore, 
                I am in charge of specific modules of an ERP system for different companies. 
                In addition, I am responsible of handling the ticketing system for customer support and the doing the integration testing for those complicated functions currently without unit test 
                to ensure our system is robust. 
                Being in a fast-paced environment, I need to keep finding more effective ways to complete the tasks within limited time. Instead of solving an issue with a temporary solution, I prefer to spend time on finding the root causes of the issues and solve it permanently.
                </p>
              </div>{/*//summary*/}
            </section>{/*//section*/}

            <hr />

            <section className="skills-section section">
              <h2 className="section-title"><i className="fa fa-rocket" />Skills &amp; Proficiency</h2>
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

                <div className="item">
                  <h3 className="level-title">Mongo</h3>
                  <div className="level-bar">
                    <div className="level-bar-inner" data-level="70%">
                    </div>                                      
                  </div>{/*//level-bar*/}                                 
                </div>{/*//item*/}

              </div>  
            </section>{/*//skills-section*/}

            <hr />
            <section className="section experiences-section">
              <h2 className="section-title"><i className="fa fa-briefcase" />Experiences</h2>

              <hr />

              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">Web Developer</h3>
                    <div className="time">2016 - Present</div>
                  </div>{/*//upper-row*/}
                  <div className="company">Singapore</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    I use Cakephp & jQuery to develop our ERP system for different companies.
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
                  <div className="company">Singapore</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    Our team won first prize among the teams from Thailand and Indonesia.
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}

              <hr />


              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">Web Developer</h3>
                    <div className="time">2015 - 2016</div>
                  </div>{/*//upper-row*/}
                  <div className="company">Taipei, Taiwan</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    I used plain PHP and jQuery to handle most of our content management systems (CMS) and customized E-commerce websites.
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}

              <hr />

              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">Work and Travel</h3>
                    <div className="time">2013 Jul. - Sep.</div>
                  </div>{/*//upper-row*/}
                  <div className="company">Ohio, United States</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>
                    I was being a food attendant in Cedar Point Amusement Park.
                  </p>  
                </div>{/*//details*/}
              </div>{/*//item*/}
            </section>{/*//section*/}

            <hr />

            <section className="section projects-section">
              <h2 className="section-title"><i className="fa fa-archive" />Projects</h2>
              <hr />

              <div className="item">
                <p><span className="project-title"><a href="http://demowebsite.ddns.net:9000/order" target="_blank">Mini POS System (Work In Progress)</a></span></p>
                <p>I am using Node.js and React to create a mini POS system for a photography studio.</p>
                <p>They are able to</p>
                <ul>
                    <li>Log down order related information</li>
                    <li>Print out receipt in PDF file.</li>
                </ul>                
                <p><b>Project Stack:</b> React + Node.js (Express) + MongoDB</p>
                <p><b>Demo:</b> <a href="http://demowebsite.ddns.net:9000/order" target="_blank">demowebsite.ddns.net:9000/order</a></p>
                <p><b>Source Code:</b> <a href="https://github.com/ganboonhong/planngo" target="_blank">github.com/ganboonhong/planngo</a></p>
                <p><b>Tutorial:</b> <a href="https://www.youtube.com/watch?v=X6q-tYV0G-Y&feature=em-upload_owner" target="_blank">youtube.com/watch?v=X6q-tYV0G-Y&feature=em-upload_owner</a></p>
                <span className="project-tagline">
                </span>
              </div>{/*//item*/}

              <hr />

              <div className="item">
                <p><span className="project-title"><a href="http://y-note.ddns.net/blog/2/9/1" target="_blank">Personal Blog</a></span></p>
                <p> I use Laravel and React to implement my first (SPA) blog to log down the things I have learned.</p>
                <p><b>Project Stack:</b> React + Laravel + MySQL</p>
                <p><b>Demo:</b> <a href="http://y-note.ddns.net" target="_blank">y-note.ddns.net</a>
                    <span style={{'marginLeft': '20px' }}>(<b>username</b>: ganboonhong@gmail.com</span> 
                    <span style={{'margin': '0px 5px 0px 5px' }}> <b>/</b> </span>    
                    <span style={{'marginLeft': '10px' }}> <b>password</b>: 111111)</span>
                </p>
                <p><b>Source Code:</b> <a href="https://github.com/ganboonhong/ynote" target="_blank">github.com/ganboonhong/ynote</a></p>
                <span className="project-tagline">
                </span>
              </div>{/*//item*/}

              <hr />
              
            </section>{/*//section*/}

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

class App extends Component {
  render() {
    return <Bio />;
  }
}

export default App;