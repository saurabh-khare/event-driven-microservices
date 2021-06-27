import mongoose from 'mongoose';
import { PasswordManager } from '../services/password';

interface UserProps {
    email: string;
    password: string;
}

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
    build(props: UserProps): UserDoc;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'User must have an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'User must have a password'],
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    },
);

userSchema.pre<UserDoc>('save', async function (next) {
    if (this.isModified('password')) {
        const hashedPassword = await PasswordManager.toHash(this.password);
        this.password = hashedPassword;
    }
    next();
});

userSchema.statics.build = (props: UserProps) => {
    return new User({ email: props.email, password: props.password });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
