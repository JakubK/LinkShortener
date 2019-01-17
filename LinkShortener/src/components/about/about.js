import React from 'react'
import './about.css'

class About extends React.Component
{
  render()
  {
    return(
      <main className="about-container">
          <h1>About</h1>
          <p className="about-text">
            Pellentesque id odio rhoncus libero semper egestas. Nullam sollicitudin ligula vel molestie hendrerit. Phasellus vel lectus metus. Proin vitae erat erat. Cras volutpat a nunc ac ultricies. Vestibulum euismod sollicitudin justo ac ornare. Donec feugiat at lorem eu aliquam.
          </p>
          <section className="authors">
              <div>
                <img className="img-pg" src="http://placehold.it/150x150" alt="@PiotrGardocki"/>
                <br/>
                <h3>@PiotrGardocki - Backend Developer</h3>
              </div>
            <article className="author">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </article>
            <br/>
              <div>
                <img className="img-jk" src="http://placehold.it/150x150" alt="@JakubK"/>
                <br/>
                <h3>@JakubK - Frontend Developer</h3>
              </div>   
            <article className="author">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.        
            </article>
          </section>
      </main>
    );
  }
}

export default About;