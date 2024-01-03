import React from "react";

import { useEffect, useState, useContext } from 'react';
import { fetchData } from '../../js/fetchUsers.js';
import { FormContext } from '../App/App.jsx';
import Card from './Card/Card.jsx';
import Skeleton from './skeleton/skeleton.jsx';
import './GetBlock.scss';

const GetBlock = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [cards, setCards] = useState([]);
  let [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const { formSubmitted } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPage(1);
  }, [formSubmitted]);


  const getCards = async () => {
    try {
      const res = await fetchData(`users?page=${page}&count=6`);
      console.log(res)
      setAllUsers(prevUsers => {
        if (!prevUsers || page === 1) {
          return [...res.users];
        } else {
          return [...prevUsers, ...res.users];
        };
      });

      setLastPage(res.total_pages);
      setIsLoading(false)
    } catch (error) {
      console.error('Error:', error);
    };
  };

  useEffect(() => {
    createCards(allUsers);
  }, [allUsers]);

  const createCards = (res) => {
    if (!res) {
      setCards([]);
    } else {
      setCards(res.map((item) => (<Card key={item.id} info={item} />)));
    };
  };

  let skeleton = [... new Array(6)].map((_, i) => (<Skeleton key={i} />));

  useEffect(() => {
    getCards();
  }, [page]);

  return (
    <div className="get-block">
      <div className="get-block__container">
        <h2 className="get-block__title">Working with GET request</h2>
        <div className="get-block__cards">
          {isLoading ? skeleton : cards}
        </div>
        {page <= lastPage ?
          <div className="get-block__show-more">
            <a onClick={() => setPage(prev => prev + 1)} className="get-block__button button">Show more</a>
          </div>
          : null}
      </div>
    </div>
  )
};

export default GetBlock;