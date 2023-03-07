
import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = 'https://gmail.us13.list-manage.com/subscribe/post?u=2a55f12e43a3f882ef012cd36&amp;id=7ded02caea&amp;f_id=007e8ae2f0';

// simplest form (only email)
const SimpleForm = () => <MailchimpSubscribe url={url}/>

const Newsletter = () => {
    return (
        <div className="box">
        <h2 className="newsTitle">Subscribe to our newsletter!</h2>
        <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <div>
            <SimpleForm onSubmitted={formData => subscribe(formData)} />
            {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
            {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
          </div>
        )}
      />
      </div>
    )
}

export default Newsletter

