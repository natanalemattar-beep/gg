'use client';

import { useState } from 'react';

export default function UserForm() {
  // BUG #23: All form fields in single state - no separation of concerns
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    phone: '',
    terms: false
  });

  // BUG #24: No form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // BUG #25: No client-side validation before submission
    // BUG #26: No server-side validation handling
    console.log('Form submitted:', formData);
    
    // BUG #27: No feedback after submission
    setSubmitted(true);

    // BUG #28: Form not cleared after submission
    // Form data remains in inputs
  };

  return (
    <div className="py-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Registration</h2>

      {submitted && (
        // BUG #29: Success message not accessible, only visual
        <div style={{ color: 'green', marginBottom: '20px' }}>
          Registration successful!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* BUG #30: Label not properly associated with input */}
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            style={{ width: '100%', padding: '8px' }}
            // BUG #31: No required attribute
            // BUG #32: No placeholder text
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email" // BUG #33: Email type but no validation
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            style={{ width: '100%', padding: '8px' }}
          />
          {/* BUG #34: No email format feedback */}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            style={{ width: '100%', padding: '8px' }}
            // BUG #35: No password strength indicator
            // BUG #36: No minimum length requirement
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="input-field"
            style={{ width: '100%', padding: '8px' }}
            // BUG #37: No min/max constraints
            // BUG #38: Can enter negative ages
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            style={{ width: '100%', padding: '8px' }}
            // BUG #39: No phone format validation
            // BUG #40: No international format support
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            // BUG #41: Checkbox label not associated
            // BUG #42: No link to terms and conditions
          />
          <label style={{ marginLeft: '5px' }}>I agree to terms and conditions</label>
        </div>

        {/* BUG #43: Submit button with no disabled state when form is invalid */}
        <button 
          type="submit"
          style={{ width: '100%', padding: '12px', marginTop: '20px' }}
        >
          Register
        </button>
      </form>

      {/* BUG #44: No clear indication of required vs optional fields */}
      <p style={{ fontSize: '12px', marginTop: '20px', color: '#999' }}>
        All fields are required
      </p>
    </div>
  );
}
