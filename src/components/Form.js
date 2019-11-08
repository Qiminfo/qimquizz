import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import FormErrors from "./FormErrors";
import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      formErrors: { email: "" },
      emailValid: false,
      formValid: false
    };
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  formPreventDefault(e) {
    e.preventDefault();
  }

  storeWinnerEmail() {
    const { email } = this.state;
    let storedEmails = JSON.parse(localStorage.getItem("emails")) || [];
    storedEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(storedEmails));
    document.location.reload();
  }

  render() {
    const keys = Object.keys(this.props.answersCount);
    const correct = this.props.answersCount.correct;
    const incorrect = keys.filter(k => k !== "correct").length;
    var pieData = {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          data: [correct, incorrect],
          backgroundColor: ["#cfde00","#0071ce"]
        }
      ]
    };
    var inputStyle = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      boxSizing: 'border-box',
      fontSize: '16px',
      fontFamily: 'PT Sans, sans-serif',
      borderRadius:'4px'
    };
    var formStyle= {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
    return (
      <form style={formStyle} onSubmit={this.formPreventDefault}>
        <h2>Congratulations, you have won the quizz !</h2>
        <Doughnut
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: true
          }}
        />
        <h3>
          Share your score on social media !
        </h3>
        <div style={{display:'flex'}}>
          <TwitterShareButton url='https://twitter.com/Qiminfo' hashtags={["AMLD2020","QimQuizz","Qiminfo"]}>
            <TwitterIcon size={64} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url='https://www.linkedin.com/company/qim-info'>
            <LinkedinIcon size={64} round={true} />
          </LinkedinShareButton>
        </div>
        <h3>
          Please type your email in order to partifcipate to the draw and win an iPad
        </h3>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
            style={inputStyle}
          />
        </div>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <button
          style={{  
            background: '#0071ce',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            fontFamily: 'PT Sans, sans-serif',
            borderRadius:'4px'
          }}
          className="btn btn-primary"
          disabled={!this.state.formValid}
          onClick={this.storeWinnerEmail.bind(this)}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
