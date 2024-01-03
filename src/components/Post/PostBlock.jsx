import React from "react";
import { useState, useEffect, useContext } from 'react';
import { fetchData, postData } from '../../js/fetchUsers.js';
import { FormContext } from '../App/App.jsx';
import FormInput from './FormInput/FormInput.jsx';
import PositionItem from './PositionItem/PositionItem.jsx';
import UploadPhoto from './UploadPhoto/UploadPhoto.jsx';
import SuccessReg from './SuccessReg/SuccessReg.jsx';
import './PostBlock.scss';

const PostBlock = () => {
  const [radios, setRadios] = useState([]);
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState(0);
  const { handleFormSubmit } = useContext(FormContext);
  const [isreadyToSubmit, setIsreadyToSubmit] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    photo: '',
    position_id: '',
  });

  const handleFormInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getPosition = async () => {
    try {
      const res = await fetchData('positions');
      handleFormInputChange('position_id', res.positions.length);
      setPositions(res.positions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getToken = async () => {
    try {
      const res = await fetchData('token');
      setToken(res.token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    readyToSubmit();
  }, [formData]);

  useEffect(() => {
    getPosition();
    getToken();
  }, []);

  useEffect(() => {
    createRadio(positions);
  }, [positions]);

  const createRadio = (res) => {
    if (!res) { return [] } else {
      return setRadios(res.map((item) => (
        <PositionItem
          key={item.id}
          info={item}
          onInputChange={(value) => handleFormInputChange('position', value)}
        />)));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData(formData, token);
    handleFormSubmit();
    console.log(res)
    res.success === true ? setIsSubmited(true) : null;
  };

  const readyToSubmit = () => {
    if (formData.email.length > 5
      && formData.name.length > 1
      && formData.phone.length > 11
      && typeof formData.position_id === 'number') {
      setIsreadyToSubmit(true)
    } else {
      setIsreadyToSubmit(false)
    }
  }

  return (
    <>
      <div className="post-block">
        <div className="post-block__smallcontainer">
          <h2 className="post-block__title">Working with POST request</h2>
          <div className="post-block__form">
            <form onSubmit={handleSubmit} className="form">
              <FormInput
                placeholder="Your name"
                id="username"
                type="text"
                name="username"
                pattern=".{2,60}"
                labelText="Ezio Auditore"
                labelAboveText="Your name"
                onInputChange={(value) => handleFormInputChange('name', value)}
              />
              <FormInput
                placeholder="Email"
                id="email"
                type="email"
                name="email"
                pattern={/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g}
                labelText="example@gmail.com"
                labelAboveText="Email"
                onInputChange={(value) => handleFormInputChange('email', value)}
              />
              <FormInput
                placeholder="Phone"
                id="phone"
                type="tel"
                name="phone"
                pattern="\+380\d{9}"
                labelText="+38 (XXX) XXX - XX - XX"
                labelAboveText="Phone"
                onInputChange={(value) => handleFormInputChange('phone', value)}
              />
              <div className="form__position position-form">
                <h3>Select your position</h3>
                {radios}
              </div>
              <UploadPhoto onInputChange={(value) => handleFormInputChange('photo', value)} />
              {isreadyToSubmit
                ? <button className="form__submit button" type="submit">Sign up</button>
                : <button className="form__submit button disabled">Sign up</button>
              }
            </form>
          </div>
          {isSubmited
            ? <SuccessReg />
            : null}
        </div>
      </div>
    </>
  )
};

export default PostBlock;