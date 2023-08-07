import "./HomeNotUser.css";
import { Link } from "react-router-dom";

function HomeNotUser() {
  return (
    <div className="home-not-user">
      <div>
        <h1>Sajelni One simple to do list for you and your team</h1>
        <Link to="/signup" className="btn-start">
          Start
        </Link>
      </div>

      <article className="article">
          <img src="/imgs/icon-home.png" alt="" />
          <h2>Organize your to-do lists from anywhere.</h2>
          <p>Create and access your to-do lists from anywhere: desktop, mobile phone, or browser tab. Now you'll never miss an idea or forget what you need to do next.</p>
    
      </article>


      <article className="article">
      <img src="/imgs/icon-home.png" alt="" />
          <h2>Create the perfect list for every need.</h2>
          <p>You can make ClickUps to-do lists show what you want, how you want. Add formatting, coloring, and link items with assignees or tasks to transform lists into actionable workflows.</p>
    
      </article>

      <article className="article">
      <img src="/imgs/icon-home.png" alt="" />
          <h2>Never miss a task or idea again.</h2>
          <p>ClickUp's Home view makes it easy to view and customize everything you need to work on. Set reminders, reschedule tasks, and assign priorities so you never lose anything again.</p>
    
      </article>

      
    </div>
  );
}

export default HomeNotUser;
