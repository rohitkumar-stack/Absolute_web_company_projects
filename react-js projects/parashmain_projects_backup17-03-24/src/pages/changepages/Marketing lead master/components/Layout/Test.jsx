import React, { useState } from 'react'
import MaterialLayout from './MaterialLayout'
import CheckoutPage from '../CheckoutPage'
import { Container } from 'reactstrap';
import Breadcrumb from '../../../../../components/Common/Breadcrumb';

const Test = () => {
  const [breadcrumbItems] = useState([
    { title: 'Market Lead', link: process.env.PUBLIC_URL + '/dashboard' },
    { title: 'Create Market Lead', link: process.env.PUBLIC_URL + '/ADD MARKET LEAD' },
]);
  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumb title="ADD MARKET LEAD" breadcrumbItems={breadcrumbItems} />
        <div>
          <MaterialLayout>
            <CheckoutPage />
          </MaterialLayout>
        </div>
      </Container>
    </div>
  )
}

export default Test
