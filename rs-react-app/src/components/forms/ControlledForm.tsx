import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { countries } from '../../data/countries';
import type { FormData } from '../../types';
import './Form.css';

interface ControlledFormProps {
  onSubmit: (data: FormData) => void;
}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-ZА-Я]/, 'First letter must be uppercase'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[A-ZА-Я]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-я]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup
    .string()
    .required('Select gender')
    .oneOf(['male', 'female'], 'Invalid gender value'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms of use')
    .required('You must accept the terms of use'),
  country: yup.string().required('Select a country'),
  photo: yup
    .mixed()
    .test('fileSize', 'File is too large', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return value[0].size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
});

const ControlledForm: React.FC<ControlledFormProps> = ({ onSubmit }) => {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[A-ZА-Я]/.test(password)) strength += 1;
    if (/[a-zа-я]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  React.useEffect(() => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);

  const onFormSubmit = async (data: any) => {
    try {
      let photoBase64 = '';
      if (data.photo && data.photo.length > 0) {
        photoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(data.photo[0]);
        });
      }

      onSubmit({
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        country: data.country,
        photo: photoBase64,
      });
    } catch (error) {
      console.error('Error processing form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register('age', { valueAsNumber: true })}
          className={errors.age ? 'error' : ''}
        />
        {errors.age && (
          <span className="error-message">{errors.age.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={errors.password ? 'error' : ''}
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
        <div className="password-strength">
          <div
            className={`strength-bar ${passwordStrength >= 1 ? 'active' : ''}`}
          ></div>
          <div
            className={`strength-bar ${passwordStrength >= 2 ? 'active' : ''}`}
          ></div>
          <div
            className={`strength-bar ${passwordStrength >= 3 ? 'active' : ''}`}
          ></div>
          <div
            className={`strength-bar ${passwordStrength >= 4 ? 'active' : ''}`}
          ></div>
          <div
            className={`strength-bar ${passwordStrength >= 5 ? 'active' : ''}`}
          ></div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && (
          <span className="error-message">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" value="male" {...register('gender')} />
            Male
          </label>
          <label>
            <input type="radio" value="female" {...register('gender')} />
            Female
          </label>
        </div>
        {errors.gender && (
          <span className="error-message">{errors.gender.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          {...register('country')}
          className={errors.country ? 'error' : ''}
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="error-message">{errors.country.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="photo">Photo (PNG, JPEG, up to 5MB)</label>
        <input
          type="file"
          id="photo"
          accept=".png,.jpg,.jpeg"
          {...register('photo')}
          className={errors.photo ? 'error' : ''}
        />
        {errors.photo && (
          <span className="error-message">{errors.photo.message}</span>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" {...register('terms')} />I accept the terms of
          use
        </label>
        {errors.terms && (
          <span className="error-message">{errors.terms.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ControlledForm;
