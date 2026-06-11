import {FieldError} from 'react-hook-form';
import styles from './InputField.module.css';

type InputFieldProps = {
    label: string;
    name: string;
    type?: string;
    register: any;
    error?: FieldError;
    defaultValue?: string;
    hidden?: boolean;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputFiled = ({
    label,
    type = "text",
    name,
    register,
    error,
    defaultValue,
    hidden,
    inputProps,
}: InputFieldProps) => {
   return(
    <div className={styles.Container}>
        <label className={styles.label}>{label}</label>
        <input
            className={styles.input}
            type={type}
            {...register(name)}
            defaultValue={defaultValue}
            {...inputProps}
        />
        {error?.message && (
            <p className={styles.error}>{error.message.toString()}</p>
        )}
    </div>
   )
};

export default InputFiled;