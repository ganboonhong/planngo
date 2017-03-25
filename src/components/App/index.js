import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
var Bio = React.createClass({
  render: function() {
    return (
      <div>
        <div className="wrapper">
          <div className="sidebar-wrapper">
            <div className="profile-container">
              <img className="profile" src="bio/images/profile.JPG" alt width="150px"/>
              <h1 className="name">Francis</h1>
              <h3 className="tagline">Full Stack Developer</h3>
            </div>{/*//profile-container*/}
            <div className="contact-container container-block">
              <ul className="list-unstyled contact-list">
                <li className="email"><i className="fa fa-envelope" /><a href="mailto: ganboonhong@gmail.com">ganboonhong@gmail</a></li>
                <li className="phone"><i className="fa fa-phone" /><a href="">(+65)8446 9360</a></li>
                <li className="website"><i className="fa fa-globe" /><a href="http://y-note.tk/blog/2/17/0" target="_blank">http://y-note.tk</a></li>
                <li className="github"><i className="fa fa-github" /><a href="https://github.com/ganboonhong" target="_blank">github.com/ganboonhong</a></li>
              </ul>
            </div>{/*//contact-container*/}
            <div className="education-container container-block">
              <h2 className="container-block-title">Education</h2>
              <div className="item">
                <h4 className="degree">Agricultural Economics</h4>
                <h5 className="meta">National Taiwan University</h5>
                <div className="time">2011 - 2015</div>
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
            <section className="section summary-section">
              <h2 className="section-title"><i className="fa fa-user" />Career Profile</h2>
              <div className="summary">
                <p>Summarise your career here lorem ipsum dolor sit amet, consectetuer adipiscing elit. You can <a href="http://themes.3rdwavemedia.com/website-templates/orbit-free-resume-cv-template-for-developers/" target="_blank">download this free resume/CV template here</a>. Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</p>
              </div>{/*//summary*/}
            </section>{/*//section*/}
            <section className="section experiences-section">
              <h2 className="section-title"><i className="fa fa-briefcase" />Experiences</h2>
              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">Lead Developer</h3>
                    <div className="time">2015 - Present</div>
                  </div>{/*//upper-row*/}
                  <div className="company">Startup Hubs, San Francisco</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo.</p>  
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                </div>{/*//details*/}
              </div>{/*//item*/}
              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">Senior Software Engineer</h3>
                    <div className="time">2014 - 2015</div>
                  </div>{/*//upper-row*/}
                  <div className="company">Google, London</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>  
                </div>{/*//details*/}
              </div>{/*//item*/}
              <div className="item">
                <div className="meta">
                  <div className="upper-row">
                    <h3 className="job-title">UI Developer</h3>
                    <div className="time">2012 - 2014</div>
                  </div>{/*//upper-row*/}
                  <div className="company">Amazon, London</div>
                </div>{/*//meta*/}
                <div className="details">
                  <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>  
                </div>{/*//details*/}
              </div>{/*//item*/}
            </section>{/*//section*/}
            <section className="section projects-section">
              <h2 className="section-title"><i className="fa fa-archive" />Projects</h2>
              <div className="intro">
                <p>You can list your side projects or open source libraries in this section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula in nunc bibendum fringilla a eu lectus.</p>
              </div>{/*//intro*/}
              <div className="item">
                <span className="project-title"><a href="#hook">Velocity</a></span> - <span className="project-tagline">A responsive website template designed to help startups promote, market and sell their products.</span>
              </div>{/*//item*/}
              <div className="item">
                <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-web-development-agencies-devstudio/" target="_blank">DevStudio</a></span> - 
                <span className="project-tagline">A responsive website template designed to help web developers/designers market their services. </span>
              </div>{/*//item*/}
              <div className="item">
                <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-for-startups-tempo/" target="_blank">Tempo</a></span> - <span className="project-tagline">A responsive website template designed to help startups promote their products or services and to attract users &amp; investors</span>
              </div>{/*//item*/}
              <div className="item">
                <span className="project-title"><a href="hhttp://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-mobile-apps-atom/" target="_blank">Atom</a></span> - <span className="project-tagline">A comprehensive website template solution for startups/developers to market their mobile apps. </span>
              </div>{/*//item*/}
              <div className="item">
                <span className="project-title"><a href="http://themes.3rdwavemedia.com/website-templates/responsive-bootstrap-theme-for-mobile-apps-delta/" target="_blank">Delta</a></span> - <span className="project-tagline">A responsive Bootstrap one page theme designed to help app developers promote their mobile apps</span>
              </div>{/*//item*/}
            </section>{/*//section*/}
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


class App extends Component {
  render() {
    return (
      
        <Bio />

    );
  }
}

export default App;