import React, { useEffect, useState } from 'react';
import '../../globals.css';
import { FaWeight } from 'react-icons/fa';
import FacultyService from '@/services/CategoryService';

function ArticleDetail({params }) {

  return (
    <div className='container'>
      <div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ligula nibh, blandit a pellentesque et, egestas quis nisi.   </h1>
        <h2>Status: Selected </h2>
        <h2>Closure date: 12/27/2023</h2>
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ligula nibh, blandit a pellentesque et, egestas quis nisi. Praesent sollicitudin porttitor lectus quis suscipit. Ut porta et ante non iaculis. Quisque a orci in sapien placerat porta. Praesent eu placerat ex. In mattis lacus sem, sed faucibus sapien iaculis vel. Donec non pellentesque mi. Sed in molestie dui. Aliquam erat volutpat. Phasellus a libero varius, elementum nisi luctus, tempor augue. Sed sit amet est pretium, dictum lorem ut, cursus erat. Ut congue massa nec elit vulputate, facilisis posuere tortor rutrum. Ut in urna erat.</h2>
      </div>

      <div>
        <h1 style={{ fontSize: '18px', color: 'black', fontWeight: 'bold' }}>Submission List</h1>
        <details>
          <summary className="summary">Submission no.#</summary>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td className="left-column">Status:</td>
                  <td className="right-column">Selected</td>
                </tr>
                <tr>
                  <td className="left-column">Update:</td>
                  <td className="right-column">12/26/2023</td>
                </tr>
                <tr>
                  <td className="left-column">File Submission:</td>
                  <td className="right-column">Lorem ipsum dolor sit amet, consectetur adipiscing elit.pdf</td>
                </tr>
                <tr>
                  <td className="left-column">Comment:</td>
                  <td className="right-column">
                    <textarea placeholder="Enter your comment" rows="5" cols="50"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="comment-button">Comment</button>
          </div>
        </details>
        <details>
          <summary className="summary">Submission no.#</summary>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td className="left-column">Status:</td>
                  <td className="right-column">Selected</td>
                </tr>
                <tr>
                  <td className="left-column">Update:</td>
                  <td className="right-column">12/26/2023</td>
                </tr>
                <tr>
                  <td className="left-column">File Submission:</td>
                  <td className="right-column">Lorem ipsum dolor sit amet, consectetur adipiscing elit.pdf</td>
                </tr>
                <tr>
                  <td className="left-column">Comment:</td>
                  <td className="right-column">
                    <textarea placeholder="Enter your comment" rows="5" cols="50"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="comment-button">Comment</button>
          </div>
        </details>
        <details>
          <summary className="summary">Submission no.#</summary>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td className="left-column">Status:</td>
                  <td className="right-column">Selected</td>
                </tr>
                <tr>
                  <td className="left-column">Update:</td>
                  <td className="right-column">12/26/2023</td>
                </tr>
                <tr>
                  <td className="left-column">File Submission:</td>
                  <td className="right-column">Lorem ipsum dolor sit amet, consectetur adipiscing elit.pdf</td>
                </tr>
                <tr>
                  <td className="left-column">Comment:</td>
                  <td className="right-column">
                    <textarea placeholder="Enter your comment" rows="5" cols="50"></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="comment-button">Comment</button>
          </div>
        </details>
      </div>
    </div>
  );
}

export default ArticleDetail;
