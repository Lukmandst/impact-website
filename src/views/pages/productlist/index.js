import React, { useState } from 'react';

import { AppFooter, AppHeader, AppSidebar } from 'src/components';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import axios from 'axios';
import useSWR from 'swr';

const fetcher2 = (url) => axios.get(url).then((res) => res.data);

const GetProducts = () => {
  const { data, error } = useSWR([`${process.env.REACT_APP_API}/products`], fetcher2, {
    refreshInterval: 1000,
  });
  return {
    All: data?.data,
    AllMeta: data?.meta,
    loadingAll: !error && !data,
    isError: error,
  };
};

const ProductList = () => {
  const [pid, setPid] = useState('');
  const [visible, setVisible] = useState(false);
  const { All, loadingAll } = GetProducts();

  const deletHandler = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `${process.env.REACT_APP_API}/products/${pid}`,
      });
      setVisible(false);
    } catch (error) {
      setVisible(false);
      console.log(error);
    }
  };
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Unit Of Measurement</CTableHeaderCell>
                <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {loadingAll ? (
                <CSpinner color="primary" />
              ) : (
                All?.map((item, i) => (
                  <CTableRow key={item.id}>
                    <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.code}</CTableDataCell>
                    <CTableDataCell>{item.price}</CTableDataCell>
                    <CTableDataCell>{item.description}</CTableDataCell>
                    <CTableDataCell>{item.uom}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        onClick={() => {
                          setVisible(!visible);
                          setPid(item.id);
                        }}
                      >
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))
              )}
            </CTableBody>
          </CTable>
        </div>
        <AppFooter />
      </div>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => {
          setVisible(false);
          setPid('');
        }}
      >
        <CModalHeader>
          <CModalTitle>Delete Product</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure want to delete the product?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={deletHandler}>
            Delete
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              setVisible(false);
              setPid('');
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ProductList;
