import React, { useRef, useState } from 'react';
import * as yup from 'yup';
import { countries } from '../../data/countries';
import type { FormData } from '../../types';
import './Form.css';

interface UncontrolledFormProps {
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
      if (!value) return true;
      const file = value as File;
      return file.size <= 5 * 1024 * 1024; // 5MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true;
      const file = value as File;
      return ['image/jpeg', 'image/png'].includes(file.type);
    }),
});

const UncontrolledForm: React.FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[A-ZА-Я]/.test(password)) strength += 1;
    if (/[a-zа-я]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const strength = calculatePasswordStrength(e.target.value);
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      terms: formData.get('terms') === 'on',
      country: formData.get('country') as string,
      photo: formData.get('photo') as File,
    };

    try {
      await formSchema.validate(data, { abortEarly: false });

      let photoBase64 = '';
      if (data.photo && data.photo.size > 0) {
        photoBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(data.photo);
        });
      }

      onSubmit({
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender as 'male' | 'female',
        country: data.country,
        photo: photoBase64,
      });
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && (
          <span data-testid="name-error" className="error-message">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && (
          <span data-testid="age-error" className="error-message">
            {errors.age}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={errors.password ? 'error' : ''}
          onChange={handlePasswordChange}
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
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
          name="confirmPassword"
          className={errors.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="male" />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" />
            Female
          </label>
        </div>
        {errors.gender && (
          <span data-testid="gender-error" className="error-message">
            {errors.gender}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
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
          <span data-testid="country-error" className="error-message">
            {errors.country}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="photo">Photo (PNG, JPEG, up to 5MB)</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept=".png,.jpg,.jpeg"
          className={errors.photo ? 'error' : ''}
        />
        {errors.photo && (
          <span data-testid="photo-error" className="error-message">
            {errors.photo}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input type="checkbox" name="terms" />I accept the terms of use
        </label>
        {errors.terms && <span className="error-message">{errors.terms}</span>}
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
