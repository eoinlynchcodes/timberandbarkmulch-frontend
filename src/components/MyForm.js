// Customize this 'myform.js' script and add it to your JS bundle.
// Then import it with 'import MyForm from "./myform.js"'.
// Finally, add a <MyForm/> element whereever you wish to display the form.

import React from "react";

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  render() {
    const { status } = this.state;
    return (
      <form
        onSubmit={this.submitForm}
        action="https://formspree.io/f/xnqogkrk"
        method="POST"
        className="contactForm"
      >
        {/* <!-- add your custom form HTML here --> */}
        <label>Name:</label>
        <input type="text" name="name"/><br/>

        <label>Email:</label>
        <input type="email" name="email" /><br/>

        <label>Phone Number:</label>
        <input type="text" name="number"/><br/>

        <label>Message:</label>
        <textarea type="textarea" name="message" rows="8" /><br/>

        {status === "SUCCESS" ? <p>Thanks, we will respond ASAP!</p> : <input type="submit" className="contact-submit-button" value="Send Message" />}
        {status === "ERROR" && <p>Ooops! There was an error.</p>}
      </form>
    );
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }
}