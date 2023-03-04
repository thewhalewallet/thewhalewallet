import mongoose, { Schema } from "mongoose";
import IWallet from "@/components/types/IWallet";
import IContact from "@/components/types/IContact";
import IUser from "@/components/types/IUser";
import IPlaidAccounts from "@/components/types/IPlaidAccount";
  

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: false, default: '' },
    image: { type: String, required: false, default: '' },
    wallets: [
      {
        address: { type: String, required: true },
        name: { type: String, required: false, default: ''},
        ens: { type: String, required: false, default: '' },
        lens: { type: String, required: false, default: '' },
        isFavorite: { type: Boolean, required: false, default: false },
      },
    ],
    contacts: [
        {
            name: { type: String, required: true },
            address: { type: String, required: true },
            ens: { type: String, required: false, default: ''},
            lens: { type: String, required: false, default: ''},
            isFavorite: { type: Boolean, required: false, default: false },
        }
    ],
    plaid_access_token: { type: String, required: false, default: '' },
    plaid_account: [
        {
            balances: {
                available: { type: Number, required: true },
                current: { type: Number, required: true },
                iso_currency_code: { type: String, required: true },
                limit: { type: Number, required: true },
                unofficial_currency_code: { type: String, required: true },
            },
            mask: { type: String, required: true },
            name: { type: String, required: true },
            official_name: { type: String, required: true },
            persistent_account_id: { type: String, required: true },
            subtype: { type: String, required: true },
            type: { type: String, required: true },
        }
    ],
    plaid_tx: [
        {
          account_id: { type: String, required: true },
          amount: { type: Number, required: true },
          date: { type: Date, required: true },
          merchant_name: { type: String, required: false, default: '' },
        }
      ],
  });

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);  
export default UserModel;