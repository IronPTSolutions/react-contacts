import { Component } from 'react';
import { useForm } from 'react-hook-form';
import faker from 'faker';
import contactService from '../../../services/contacts-service';

const PHONE_PATTERN = /^\d{6,10}$/;
const EMAIL_PATTERN = /\S+@\S+\.\S+/;
function ContactForm({ onCreateContact }) {

  const { register, handleSubmit, setError, setValue, watch, reset, formState: { errors, isValid, isDirty } } = useForm({
    mode: 'all', 
    defaultValues: { avatar: faker.image.avatar()} 
  });

  const onCreateContactFormSubmit = contact => {
    contactService.create(contact)
      .then(contact => {
        onCreateContact(contact)
        reset();
      })
      .catch(error => {
        const { message, errors } = error.response?.data || error;
        if (errors) {
          Object.keys(errors).forEach(input => {
            setError(input, { type: 'manual', message: errors[input] });
          })
        } else {
          setError('name', { type: 'manual', message: message });
        }
      })
  };

  const handleRandomAvatarClick = () => setValue('avatar', faker.image.avatar())

  return (
    <div className="row mb-3">
      <div className="col-12 col-sm-2">
        <img src={watch('avatar')} alt="Avatar" className="img-thumbnail w-100"/>
      </div>
      <div className="col-12 col-sm-10">
        <form onSubmit={handleSubmit(onCreateContactFormSubmit)}>

          <div className="input-group mb-1">
            <span className="input-group-text"><i className="fa fa-user fa-fw" /></span>
            <input type="text" {...register("name", { required: 'Name is required' })} 
              className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Name.."  />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="input-group mb-1">
            <span className="input-group-text"><i className="fa fa-phone fa-fw" /></span>
            <input type="text" {...register("phone", { pattern: { value: PHONE_PATTERN, message:'Phone number is not valid' } })} 
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="Phone number (650..)" />
            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
          </div>

          <div className="input-group mb-1">
            <span className="input-group-text"><i className="fa fa-envelope fa-fw" /></span>
            <input type="text" {...register("email", { pattern: { value: EMAIL_PATTERN, message: 'Email is not valid' } })}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="example@example.org" />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <div className="input-group mb-1">
            <span className="input-group-text"><i className="fa fa-picture-o fa-fw" /></span>
            <input type="text" {...register("avatar", { required: 'Name is required' })}
              className={`form-control ${errors.avatar ? 'is-invalid' : ''}`} placeholder="Image url..." />
            <button className="btn btn-outline-secondary" type="button" onClick={handleRandomAvatarClick}><i className="fa fa-refresh fa-fw" /></button>
            {errors.avatar && <div className="invalid-feedback">{errors.avatar.message}</div>}
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-sm-4">
              <button className="btn btn-primary w-100" disabled={!isDirty || !isValid}>Create contact</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

ContactForm.defaultProps = {
  onCreateContact: () => {}
}


export default ContactForm;

