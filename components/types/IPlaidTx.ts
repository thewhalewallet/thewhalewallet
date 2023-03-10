export default interface IPlaidTx {
    _id: string;
    account_id: string;
    amount: number;
    date: Date;
    merchant_name: string;
}
/*
{
{
  "added": [
    {
      "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
      "amount": 2307.21,
      "iso_currency_code": "USD",
      "unofficial_currency_code": null,
      "category": [
        "Shops",
        "Computers and Electronics"
      ],
      "category_id": "19013000",
      "check_number": null,
      "date": "2022-02-03",
      "datetime": "2022-02-03T11:00:00Z",
      "authorized_date": "2022-02-03",
      "authorized_datetime": "2022-02-03T10:34:50Z",
      "location": {
        "address": "300 Post St",
        "city": "San Francisco",
        "region": "CA",
        "postal_code": "94108",
        "country": "US",
        "lat": 40.740352,
        "lon": -74.001761,
        "store_number": "1235"
      },
      "name": "Apple Store",
      "merchant_name": "Apple",
      "payment_meta": {
        "by_order_of": null,
        "payee": null,
        "payer": null,
        "payment_method": null,
        "payment_processor": null,
        "ppd_id": null,
        "reason": null,
        "reference_number": null
      },
      "payment_channel": "in store",
      "pending": false,
      "pending_transaction_id": null,
      "account_owner": null,
      "transaction_id": "lPNjeW1nR6CDn5okmGQ6hEpMo4lLNoSrzqDje",
      "transaction_code": null
    }
  ],
  "modified": [
    {
      "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
      "amount": 98.05,
      "iso_currency_code": "USD",
      "unofficial_currency_code": null,
      "category": [
        "Service",
        "Utilities",
        "Electric"
      ],
      "category_id": "18068005",
      "check_number": null,
      "date": "2022-02-28",
      "datetime": "2022-02-28T11:00:00Z",
      "authorized_date": "2022-02-28",
      "authorized_datetime": "2022-02-28T10:34:50Z",
      "location": {
        "address": null,
        "city": null,
        "region": null,
        "postal_code": null,
        "country": null,
        "lat": null,
        "lon": null,
        "store_number": null
      },
      "name": "ConEd Bill Payment",
      "merchant_name": "ConEd",
      "payment_meta": {
        "by_order_of": null,
        "payee": null,
        "payer": null,
        "payment_method": null,
        "payment_processor": null,
        "ppd_id": null,
        "reason": null,
        "reference_number": null
      },
      "payment_channel": "online",
      "pending": false,
      "pending_transaction_id": null,
      "account_owner": null,
      "transaction_id": "yhnUVvtcGGcCKU0bcz8PDQr5ZUxUXebUvbKC0",
      "transaction_code": null
    }
  ],
  "removed": [
    {
      "transaction_id": "CmdQTNgems8BT1B7ibkoUXVPyAeehT3Tmzk0l"
    }
  ],
  "next_cursor": "tVUUL15lYQN5rBnfDIc1I8xudpGdIlw9nsgeXWvhOfkECvUeR663i3Dt1uf/94S8ASkitgLcIiOSqNwzzp+bh89kirazha5vuZHBb2ZA5NtCDkkV",
  "has_more": false,
  "request_id": "45QSn"
}
}
*/