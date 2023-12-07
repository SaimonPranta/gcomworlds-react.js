import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ServiceContainer from '../../../Shades/Carts/Service/Service';
import CartSkeleton from '../../../Shades/CartSkeleton/CartSkeleton';
import { addService } from '../../../Store/ServiceSlice/ServiceSlice';
const array = ["", "", "", "", "", "", "", ""];

const Services = () => {
  const [servicePage, setServicePage] = useState(1);
  const [disableServicetPage, setDisableServicePage] = useState(true);
  const services = useSelector((state) => state.services.data);
  
  const dispatch = useDispatch();
  
 useEffect(() => {
   fetch(
     `${process.env.REACT_APP_SERVER_HOST_URL}/public_service/get_service_by_pagination/${servicePage}`
   )
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
       if (data.data) {
         setDisableServicePage(data.disable);
         dispatch(addService(data.data));
       }
     });
 }, [servicePage]);


    return (
      <section className="container-lg">
        <section className="my-5 service-colloction">
          <div className="product-section-title">
            <h3>services</h3>
          </div>
          <div className="inner-service-colloction">
            {services.length > 0
              ? services.map((service) => {
                  return (
                    <ServiceContainer product={service} key={service._id} />
                  );
                })
              : array.map((v, i) => {
                  return <CartSkeleton btn={false} key={i} />;
                })}
          </div>
          <div className="d-flex justify-content-center  ">
            <ul className="pagination  m-0">
              <li
                className={
                  servicePage <= 1 ? "page-item disabled" : "page-item"
                }
                onClick={() => {
                  servicePage > 1 && setServicePage((pre) => pre - 1);
                }}
              >
                <Link className="page-link">Previous</Link>
              </li>
              <li
                className={
                  servicePage <= 1 ? "page-item disabled" : "page-item"
                }
                onClick={() => {
                  servicePage > 1 && setServicePage((pre) => pre - 1);
                }}
              >
                <Link className="page-link">{servicePage - 1}</Link>
              </li>
              <li className="page-item active" aria-current="page">
                <Link className="page-link">{servicePage}</Link>
              </li>
              <li
                className={
                  disableServicetPage ? "page-item disabled" : "page-item"
                }
                onClick={() => {
                  !disableServicetPage && setServicePage((pre) => pre + 1);
                }}
              >
                <Link className="page-link">{servicePage + 1}</Link>
              </li>
              <li
                className={
                  disableServicetPage ? "page-item disabled" : "page-item"
                }
                onClick={() => {
                  !disableServicetPage && setServicePage((pre) => pre + 1);
                }}
              >
                <Link className="page-link">Next</Link>
              </li>
            </ul>
          </div>
        </section>
      </section>
    );
    
};

export default Services;