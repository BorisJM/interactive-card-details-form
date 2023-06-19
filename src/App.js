import CardFrontImage from "./bg-card-front.png";
import CardBackImage from "./bg-card-back.png";
import CardLogo from "./card-logo.svg";
import IconComplete from "./icon-complete.svg";
import { useState } from "react";

export default function App() {
  const [userName, setUserName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [monthExp, setMonthExp] = useState("");
  const [yearExp, setYearExp] = useState("");
  const [cvc, setCVC] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [monthExpError, setMonthExpError] = useState("");
  const [yearExpError, setYearExpError] = useState("");
  const [cvcError, setCVCError] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  let test = false;
  const pattern = /[a-zA-Z]/;

  function reset() {
    setUserName("");
    setCardNumber("");
    setMonthExp("");
    setYearExp("");
    setCVC("");
    setUserNameError("");
    setCardNumberError("");
    setMonthExpError("");
    setYearExpError("");
    setCVCError("");
    setShowComponent(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    test = false;
    setUserNameError("");
    setCardNumberError("");
    setMonthExpError("");
    setYearExpError("");
    setCVCError("");
    if (!userName) {
      test = true;
      setUserNameError("Can't be blank");
    }
    if (!cardNumber) {
      test = true;

      setCardNumberError("Can't be blank");
    }
    if (!monthExp) {
      test = true;

      setMonthExpError("Can't be blank");
    } else if (pattern.test(monthExp)) {
      test = true;

      setMonthExpError("Wrong format, numbers only");
    } else if (+monthExp > 12) {
      test = true;

      setMonthExpError("Invalid month!");
    }
    if (!yearExp) {
      test = true;

      setYearExpError("Can't be blank");
    } else if (pattern.test(yearExp)) {
      test = true;
      setYearExpError("Wrong format, numbers only");
    }

    if (!cvc) {
      test = true;

      setCVCError("Can't be blank");
    } else if (pattern.test(cvc)) {
      test = true;

      setCVCError("Wrong format, numbers only");
    }
    if (!test) setShowComponent(true);
  }

  return (
    <div className="app-container">
      <FirstColumn
        userName={userName}
        cardNumber={cardNumber}
        monthExp={monthExp}
        yearExp={yearExp}
        cvc={cvc}
      />
      <SecondColumn
        setUserName={setUserName}
        setCardNumber={setCardNumber}
        setMonthExp={setMonthExp}
        setYearExp={setYearExp}
        setCVC={setCVC}
        cardNumber={cardNumber}
        handleSubmit={handleSubmit}
        userNameError={userNameError}
        cardNumberError={cardNumberError}
        monthExpError={monthExpError}
        yearExpError={yearExpError}
        cvcError={cvcError}
        reset={reset}
        showComponent={showComponent}
      />
    </div>
  );
}

function FirstColumn({ userName, cardNumber, monthExp, yearExp, cvc }) {
  return (
    <div className="first-column">
      <CardFront
        userName={userName}
        cardNumber={cardNumber}
        monthExp={monthExp}
        yearExp={yearExp}
      />
      <CardBack cvc={cvc} />
    </div>
  );
}

function CardFront({ userName, cardNumber, monthExp, yearExp }) {
  return (
    <div className="front-card">
      <img className="frontcard-img" src={CardFrontImage} alt="credit card " />{" "}
      <div className="card-details">
        <img className="logo-card" src={CardLogo} alt="card logo" />

        <div className="main-card-info">
          <p className="code-container">
            <span className="card-code">
              {cardNumber.slice(0, 4) ? cardNumber.slice(0, 4) : "0000"}
            </span>
            <span className="card-code">
              {cardNumber.slice(5, 9) ? cardNumber.slice(5, 9) : "0000"}
            </span>
            <span className="card-code">
              {cardNumber.slice(10, 14) ? cardNumber.slice(10, 14) : "0000"}
            </span>
            <span className="card-code">
              {cardNumber.slice(15, 19) ? cardNumber.slice(15, 19) : "0000"}
            </span>
          </p>

          <div className="name-date">
            {" "}
            <span className="card-name">
              {userName ? userName : "Jane Appleseed"}
            </span>
            <span className="card-date">
              {monthExp ? monthExp : "00"}/{yearExp ? yearExp : "00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBack({ cvc }) {
  return (
    <div className="back-card">
      <img src={CardBackImage} alt="Credit card back" />
      <span className="cvv">{cvc ? cvc : "000"}</span>
    </div>
  );
}

function SecondColumn({
  setUserName,
  setCardNumber,
  setMonthExp,
  setYearExp,
  setCVC,
  cardNumber,
  handleSubmit,
  userNameError,
  cardNumberError,
  monthExpError,
  yearExpError,
  cvcError,
  reset,
  showComponent,
}) {
  return (
    <div className="second-column">
      {!showComponent && (
        <Form
          setUserName={setUserName}
          setCardNumber={setCardNumber}
          setMonthExp={setMonthExp}
          setYearExp={setYearExp}
          setCVC={setCVC}
          cardNumber={cardNumber}
          handleSubmit={handleSubmit}
          userNameError={userNameError}
          cardNumberError={cardNumberError}
          monthExpError={monthExpError}
          yearExpError={yearExpError}
          cvcError={cvcError}
        />
      )}
      {showComponent && <ThankYou reset={reset} />}
    </div>
  );
}

function Form({
  setUserName,
  setCardNumber,
  setMonthExp,
  setYearExp,
  setCVC,
  cardNumber,
  handleSubmit,
  userNameError,
  cardNumberError,
  monthExpError,
  yearExpError,
  cvcError,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Input
        error={userNameError}
        handleData={setUserName}
        placeholder={"e.g Jane Appleseed"}
      >
        cardholder name
      </Input>
      <Input
        error={cardNumberError}
        cardNumber={cardNumber}
        handleData={setCardNumber}
        placeholder={"e.g 1234 5678 9123 0000"}
        length={19}
      >
        card number
      </Input>
      <div className="date-cvc">
        <Input
          error={monthExpError}
          length={2}
          handleData={setMonthExp}
          placeholder={"MM"}
        >
          exp. date
        </Input>
        <Input
          error={yearExpError}
          length={2}
          handleData={setYearExp}
          placeholder={"YY"}
        >
          (mm/yy)
        </Input>
        <Input
          error={cvcError}
          length={3}
          handleData={setCVC}
          placeholder={"e.g 123"}
        >
          cvc
        </Input>
      </div>
      <Button>Confirm</Button>
    </form>
  );
}
function Input({
  children,
  placeholder,
  error,
  length,
  handleData,
  cardNumber,
}) {
  return (
    <div className={`input-container `}>
      <label>{children}</label>{" "}
      <input
        className={error ? "error" : ""}
        onChange={(e) => {
          length === 19
            ? handleData(
                e.target.value
                  .replace(/[^0-9]/gi, "")
                  .replace(/(.{4})/g, "$1 ")
                  .trim()
              )
            : handleData(e.target.value);
        }}
        value={cardNumber}
        maxLength={length}
        type="text"
        placeholder={placeholder}
        inputMode="numeric"
      />
      <span className="error-message">{error}</span>
    </div>
  );
}
function Button({ children, reset }) {
  return <button onClick={reset}>{children}</button>;
}

function ThankYou({ setShowComponent, reset }) {
  return (
    <div className="thankyou-container">
      <img src={IconComplete} alt="complete icon" />
      <h1>Thank you!</h1>
      <p>We've added your card details</p>
      <Button reset={reset}>Continue</Button>
    </div>
  );
}
