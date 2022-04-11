import React from 'react';
import Layout from '../components/Layout';
import Home from './home/Home';


const Store = () => {
    return (
        <Layout title="Store" description="This is the Store page" >
            <Home />
        </Layout>
    )
}

export default Store;