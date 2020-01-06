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
    const pieData = {
      labels: ["Correct", "Incorrect"],
      datasets: [
        {
          data: [correct, incorrect],
          backgroundColor: ["#cfde00","#0071ce"]
        }
      ]
    };
    const inputStyle = {
      padding: '12px 20px',
      margin: '14px',
      boxSizing: 'border-box',
      fontSize: '1em',
      fontFamily: 'PT Sans, sans-serif',
      borderRadius:'4px'
    };
    const formStyle= {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: 'white'
    };
    return (
      <form style={formStyle} onSubmit={this.formPreventDefault}>
        <h1>Congratulations, you have won the quizz</h1>
          <div>
              <Doughnut
                  data={pieData}
                  options={{
                      legend: {
                          display: true,
                          position: 'left',
                          labels: {
                              fontColor: 'white',
                              fontFamily: '\'PT Sans\', sans-serif',
                              fontSize: 24,
                          }
                      },
                      responsive: true,
                      maintainAspectRatio: true
                  }}
              />
          </div>

          <h1>
              Participate to the draw and win an iPad !
          </h1>
          <div style={{width: '100%', minHeight: '168px'}}>

              <div
                  style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                      fontSize:'1.5em'
                  }}
                  className={`form-group ${this.errorClass(
                      this.state.formErrors.email
                  )}`}
              >
                  <input
                      type="Type your email here..."
                      required
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleUserInput}
                      style={inputStyle}
                  />
                  <button
                      style={{
                          background: '#CFDE00',
                          border: 'none',
                          color: '#0071ce',
                          padding: '15px 32px',
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'inline-block',
                          fontSize: '1em',
                          fontFamily: 'PT Sans, sans-serif',
                          borderRadius:'4px',
                          height: '60px'
                      }}
                      className="btn btn-primary"
                      disabled={!this.state.formValid}
                      onClick={this.storeWinnerEmail.bind(this)}
                  >
                      Submit
                  </button>
              </div>
              <FormErrors formErrors={this.state.formErrors} />
          </div>
          <h1>
          Share your score on social media
        </h1>
        <div style={{display:'flex', width: '20%', justifyContent: 'space-between'}}>
          <TwitterShareButton url='https://twitter.com/Qiminfo' hashtags={["AMLD2020","QimQuizz","Qiminfo"]}>
            <TwitterIcon size={64} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url='https://www.linkedin.com/company/qim-info'>
            <LinkedinIcon size={64} round={true} />
          </LinkedinShareButton>
        </div>
      </form>
    );
  }
}

export default Form;
