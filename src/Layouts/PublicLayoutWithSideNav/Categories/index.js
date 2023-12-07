import React from 'react';
import './styles.scss'
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import {categoriesArray} from './helper/constants'

const Index = () => {
   const removeSideNav = () => {
     const html = document.querySelector("Html");

     if (!html) {
       return;
     }
     html.classList.remove("active-page-body");
   };
    return (
      <section className="categories-side-nav">
        <div className="main-side-nav-container">
          <ul>
            {[
              ...categoriesArray,
              ...categoriesArray,
              ...categoriesArray,
              ...categoriesArray,
            ].map((category, i) => {
              return (
                <li key={i}>
                  <button>
                    <div>
                      <img src={category.img} alt="" />
                      <Link to={category.value}>{category.label}</Link>
                      {category.subCategories?.length && (
                        <MdKeyboardArrowRight />
                      )}
                    </div>

                    {category.subCategories?.length > 0 && (
                      <ul>
                        {category.subCategories.map((subCategorie) => {
                          return (
                            <li>
                              <button>
                                <Link to={subCategorie.value}>
                                  {subCategorie.label}
                                </Link>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="side-nav-background" onClick={removeSideNav} />
      </section>
    );
};

export default Index;