import "./index.css";

const MailList = () => {
  return (
    <div className="mail system-font">
      <h1 className="mailTitle system-font">Save time, save money!</h1>
      <span className="mailDesc system-font">Sign up and we'll send the best deals to you</span>
      <div className="mailInputContainer system-font">
        <input type="text" placeholder="Your Email" />
        <button onClick>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList