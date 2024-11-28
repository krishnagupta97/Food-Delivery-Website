import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = new useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success) {
      setList(response.data.data);
    } else {
      console.log(response);
      toast.error("Cannot Fetch Data!!!")
    }
  }

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
      await fetchList();
      toast.success("Food Removed!!!");
    } catch (error) {
      toast.error("Sorry, some error occurred!!!");
    }
  }

  useEffect(() => {
    fetchList();
  }, [list]);

  return (
    <div className='list flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item, idx) => {
            return (
              <div key={idx} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p className='cursor' onClick={() => removeFood(item._id)}>❌</p>
              </div>
            )
          })
        }
      </div>  
    </div>
  )
}

export default List
