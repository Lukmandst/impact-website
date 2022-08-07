import React, { useRef, useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilDollar, cilPencil } from '@coreui/icons';
import { AppFooter, AppHeader, AppSidebar } from 'src/components';
import axios from 'axios';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({ name: '', description: '', price: '', uom_id: 3, code: '' });

  const addHandler = async () => {
    try {
      setLoading(true);
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/products`,
        data: body,
      });
      setLoading(false);
      addToast(exampleToast);
      setBody({ name: '', description: '', price: '', uom_id: 3, code: '' });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const [toast, addToast] = useState(0);
  const toaster = useRef();
  const exampleToast = (
    <CToast autohide={true} color="primary">
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <strong className="me-auto">Yeayy</strong>
      </CToastHeader>
      <CToastBody className="text-white">New Product has been added!</CToastBody>
    </CToast>
  );
  return (
    <div>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md={9} lg={7} xl={6}>
                  <CCard className="mx-4">
                    <CCardBody className="p-4">
                      <CForm>
                        <h1>New Product</h1>
                        <p className="text-medium-emphasis">Add new product </p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilPencil} />
                          </CInputGroupText>
                          <CFormInput
                            value={body.name}
                            placeholder="Product Name"
                            onChange={(e) =>
                              setBody({
                                ...body,
                                name: e.target.value,
                              })
                            }
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilPencil} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Product Code"
                            value={body.code}
                            onChange={(e) =>
                              setBody({
                                ...body,
                                code: e.target.value,
                              })
                            }
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilDollar} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Product Price"
                            type="number"
                            value={body.price}
                            onChange={(e) =>
                              setBody({
                                ...body,
                                price: e.target.value,
                              })
                            }
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon icon={cilPencil} />
                          </CInputGroupText>
                          <CFormInput
                            placeholder="Product Description"
                            value={body.description}
                            onChange={(e) =>
                              setBody({
                                ...body,
                                description: e.target.value,
                              })
                            }
                          />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                          <CFormSelect
                            onChange={(e) =>
                              setBody({
                                ...body,
                                uom_id: e.target.value,
                              })
                            }
                            aria-label="Unit of Measurement (UOM)"
                            options={[
                              'Unit of Measurement (UOM)',
                              { label: 'SHEET', value: 1 },
                              { label: 'ROLL', value: 2 },
                              { label: 'PCS', value: 3 },
                            ]}
                          />
                        </CInputGroup>

                        <div className="d-grid">
                          <CButton color="success" disabled={loading} onClick={addHandler}>
                            {loading ? <CSpinner color="secondary" /> : 'Add Product'}
                          </CButton>
                        </div>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AddProduct;
