
export default interface IPlaidAccount {
    _id: string;
    balances: {
        available: number;
        current: number;
        iso_currency_code: string;
        limit: number;
        unofficial_currency_code: string;
    };
    mask: string;
    name: string;
    official_name: string;
    persistent_account_id: string;
    subtype: string;
    type: string;
}
/* ex/

accounts: [
    {
        "account_id": "BxBXxLj1m4HMXBm9WZZmCWVbPjX16EHwv99vp",
        "balances": {
        "available": 100,
        "current": 110,
        "iso_currency_code": "USD",
        "limit": null,
        "unofficial_currency_code": null
        },
        "mask": "0000",
        "name": "Plaid Checking",
        "official_name": "Plaid Gold Standard 0% Interest Checking",
        "persistent_account_id": "8cfb8beb89b774ee43b090625f0d61d0814322b43bff984eaf60386e",
        "subtype": "checking",
        "type": "depository"
    }
]
*/