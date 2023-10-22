import React, { useEffect, useState } from "react";
import axios from "axios";
import DropdownForm from "./dropDownForm";

function ConvertingBox() {
  const options1 = [
    "USD: United States Dollar",
    "EUR: Euro",
    "JPY: Japanese Yen",
    "GBP: British Pound Sterling",
    "AUD: Australian Dollar",
    "CAD: Canadian Dollar",
    "CHF: Swiss Franc",
    "CNY: Chinese Yuan",
    "SEK: Swedish Krona",
    "NZD: New Zealand Dollar",
    "KRW: South Korean Won",
    "SGD: Singapore Dollar",
    "NOK: Norwegian Krone",
    "MXN: Mexican Peso",
    "INR: Indian Rupee",
    "BRL: Brazilian Real",
    "ZAR: South African Rand",
    "RUB: Russian Ruble",
    "HKD: Hong Kong Dollar",
    "TRY: Turkish Lira",
    "AED: United Arab Emirates Dirham",
    "SAR: Saudi Riyal",
    "QAR: Qatari Riyal",
    "KWD: Kuwaiti Dinar",
    "OMR: Omani Rial",
    "BHD: Bahraini Dinar",
    "EGP: Egyptian Pound",
    "JOD: Jordanian Dinar",
    "LBP: Lebanese Pound",
    "DZD: Algerian Dinar",
  ];

  const [data, setData] = useState(null);
  const [amount, setAmount] = useState("");
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeAmount = (event) => {
    if (event.key === "Enter") {
      setAmount(parseInt(event.target.value, 10));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://exchangerate-api.p.rapidapi.com/rapid/latest/${currencyFrom.substring(
            0,
            3
          )}`,
          {
            headers: {
              "X-RapidAPI-Key":
              import.meta.env.VITE_SOME_KEY,
              "X-RapidAPI-Host": "exchangerate-api.p.rapidapi.com",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
        // Handle errors, show error messages to the user
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currencyFrom]);

  return (
    <div className="container">

    <div className="box">
      <div className="element">
      <div className="deployable">
        <h3>Select the currency you have:</h3>
        <DropdownForm options={options1} setCurrency={setCurrencyFrom} />
      </div>
      <input
        type="text"
        placeholder="Enter the amount of money"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={handleChangeAmount}
      />
      </div>

      <div className="element">
      <div className="deployable">
        <h3>Select target currency:</h3>
        <DropdownForm className='dropdown-form-component' options={options1} setCurrency={setCurrencyTo} />
      </div>
      </div>
    </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <h4 className="converted-value">
            Converted value:{" "}
            {(amount * data?.rates?.[currencyTo?.substring(0, 3)]).toFixed(2)}
          </h4>
        )}
    </div>
  );
}

export default ConvertingBox;
